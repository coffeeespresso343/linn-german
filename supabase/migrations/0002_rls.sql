do $$
declare t text;
begin
  -- Content tables: RLS on + admins can manage everything
  foreach t in array array[
    'levels','courses','lessons','lesson_sections','grammar_topics','vocabulary',
    'vocabulary_examples','exercises','exercise_questions','exercise_options',
    'audio_files','achievements'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "admin manage" on public.%I for all to authenticated
                    using (public.is_admin()) with check (public.is_admin())', t);
  end loop;

  -- Everyone can read published content
  foreach t in array array['levels','courses','lessons','grammar_topics','vocabulary','exercises'] loop
    execute format('create policy "read published" on public.%I for select
                    to anon, authenticated using (is_published)', t);
  end loop;

  -- Open catalog tables
  foreach t in array array['audio_files','achievements'] loop
    execute format('create policy "read all" on public.%I for select
                    to anon, authenticated using (true)', t);
  end loop;

  -- Learner data: each user sees and changes only their own rows
  foreach t in array array['user_progress','user_vocabulary','exercise_attempts',
                           'test_results','bookmarks','streaks','daily_goals'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "own rows" on public.%I for all to authenticated
                    using (user_id = (select auth.uid()))
                    with check (user_id = (select auth.uid()))', t);
    execute format('create policy "admin read" on public.%I for select to authenticated
                    using (public.is_admin())', t);
  end loop;
end $$;

-- Child content: readable when the parent is published
create policy "read published" on public.lesson_sections for select to anon, authenticated
  using (exists (select 1 from public.lessons l
                 where l.id = lesson_sections.lesson_id and l.is_published));

create policy "read published" on public.vocabulary_examples for select to anon, authenticated
  using (exists (select 1 from public.vocabulary v
                 where v.id = vocabulary_examples.vocabulary_id and v.is_published));

create policy "read published" on public.exercise_questions for select to anon, authenticated
  using (exists (select 1 from public.exercises e
                 where e.id = exercise_questions.exercise_id and e.is_published));

create policy "read published" on public.exercise_options for select to anon, authenticated
  using (exists (select 1 from public.exercise_questions q
                 join public.exercises e on e.id = q.exercise_id
                 where q.id = exercise_options.question_id and e.is_published));

-- Profiles: read own (admins read all), update own harmless columns only
alter table public.profiles enable row level security;

create policy "read own profile" on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());

create policy "update own profile" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

revoke update on public.profiles from authenticated;
grant update (first_name, last_name, avatar_url, current_level_id,
              preferred_language, daily_goal, timezone)
  on public.profiles to authenticated;

-- Earned achievements: read-only for users (awarded by server-side logic later)
alter table public.user_achievements enable row level security;
create policy "read own achievements" on public.user_achievements for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

-- Audio storage bucket: public playback, admin-only upload
insert into storage.buckets (id, name, public) values ('audio', 'audio', true)
on conflict (id) do nothing;

create policy "audio admin manage" on storage.objects for all to authenticated
  using (bucket_id = 'audio' and public.is_admin())
  with check (bucket_id = 'audio' and public.is_admin());