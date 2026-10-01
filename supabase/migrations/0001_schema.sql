-- Helpers -------------------------------------------------------------
create or replace function public.is_multilingual(j jsonb)
returns boolean language sql immutable set search_path = ''
as $$ select jsonb_typeof(j) = 'object' and j ? 'de' and j ? 'en' and j ? 'my' $$;

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end $$;

-- Levels & profiles ---------------------------------------------------
create table public.levels (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code in ('A1','A2','B1','B2','C1','C2')),
  name jsonb not null check (public.is_multilingual(name)),
  description jsonb not null check (public.is_multilingual(description)),
  sort_order smallint not null,
  is_published boolean not null default false
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  avatar_url text,
  role text not null default 'learner' check (role in ('learner','admin')),
  current_level_id uuid references public.levels (id) on delete set null,
  preferred_language text not null default 'en' check (preferred_language in ('de','en','my')),
  daily_goal smallint not null default 10 check (daily_goal between 1 and 500),
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audio_files (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  duration_seconds numeric(6,2),
  transcript text,
  created_by uuid default auth.uid() references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Learning content ------------------------------------------------------
create table public.courses ( -- a "unit" inside a level
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels (id) on delete cascade,
  slug text not null unique,
  title jsonb not null check (public.is_multilingual(title)),
  description jsonb not null default '{"de":"","en":"","my":""}' check (public.is_multilingual(description)),
  sort_order smallint not null default 0,
  is_published boolean not null default false
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  level_id uuid not null references public.levels (id) on delete cascade,
  slug text not null unique,
  title jsonb not null check (public.is_multilingual(title)),
  description jsonb not null default '{"de":"","en":"","my":""}' check (public.is_multilingual(description)),
  sort_order smallint not null default 0,
  estimated_minutes smallint not null default 10,
  xp_reward smallint not null default 10,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lesson_sections (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  type text not null check (type in ('introduction','explanation','examples','vocabulary',
                                     'grammar','pronunciation','practice','completion')),
  sort_order smallint not null default 0,
  content jsonb not null default '{}'
);

create table public.grammar_topics (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels (id) on delete cascade,
  slug text not null unique,
  category text not null check (category in ('articles','pronouns','verbs','tenses','cases',
    'word_order','prepositions','adjectives','conjunctions','modal_verbs','separable_verbs',
    'reflexive_verbs','passive','konjunktiv','relative_clauses')),
  title jsonb not null check (public.is_multilingual(title)),
  summary jsonb not null default '{"de":"","en":"","my":""}' check (public.is_multilingual(summary)),
  explanation jsonb not null default '{"de":"","en":"","my":""}' check (public.is_multilingual(explanation)),
  rules jsonb not null default '[]',
  examples jsonb not null default '[]',
  common_mistakes jsonb not null default '[]',
  sort_order smallint not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vocabulary (
  id uuid primary key default gen_random_uuid(),
  german text not null,
  article text check (article in ('der','die','das')),
  plural text,
  english text not null,
  myanmar text not null default '',
  ipa text,
  audio_file_id uuid references public.audio_files (id) on delete set null,
  level_id uuid not null references public.levels (id),
  category text,
  tags text[] not null default '{}',
  related_ids uuid[] not null default '{}',
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vocabulary_examples (
  id uuid primary key default gen_random_uuid(),
  vocabulary_id uuid not null references public.vocabulary (id) on delete cascade,
  german text not null,
  english text not null,
  myanmar text not null default '',
  sort_order smallint not null default 0
);

-- Exercises ---------------------------------------------------------------
create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.lessons (id) on delete set null,
  grammar_topic_id uuid references public.grammar_topics (id) on delete set null,
  level_id uuid not null references public.levels (id) on delete cascade,
  title jsonb not null check (public.is_multilingual(title)),
  type text not null check (type in ('grammar','vocabulary','pronunciation','listening','reading','mixed')),
  difficulty smallint not null default 1 check (difficulty between 1 and 3),
  sort_order smallint not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.exercise_questions (
  id uuid primary key default gen_random_uuid(),
  exercise_id uuid not null references public.exercises (id) on delete cascade,
  type text not null check (type in ('multiple-choice','fill-blank','translation',
                                     'true-false','matching','ordering','listening')),
  prompt jsonb not null check (public.is_multilingual(prompt)),
  explanation jsonb not null default '{"de":"","en":"","my":""}' check (public.is_multilingual(explanation)),
  payload jsonb not null default '{}', -- answers for fill-blank / ordering / matching / translation
  audio_file_id uuid references public.audio_files (id) on delete set null,
  points smallint not null default 1,
  sort_order smallint not null default 0
);

create table public.exercise_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.exercise_questions (id) on delete cascade,
  label jsonb not null check (public.is_multilingual(label)),
  is_correct boolean not null default false,
  sort_order smallint not null default 0
);

-- Learner data ------------------------------------------------------------
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  status text not null default 'in_progress' check (status in ('in_progress','completed')),
  score smallint check (score between 0 and 100),
  xp_earned smallint not null default 0,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table public.user_vocabulary ( -- spaced-repetition state
  user_id uuid not null references public.profiles (id) on delete cascade,
  vocabulary_id uuid not null references public.vocabulary (id) on delete cascade,
  correct_count integer not null default 0,
  wrong_count integer not null default 0,
  last_reviewed timestamptz,
  next_review timestamptz,
  mastery smallint not null default 0 check (mastery between 0 and 5),
  primary key (user_id, vocabulary_id)
);

create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete cascade,
  question_id uuid not null references public.exercise_questions (id) on delete cascade,
  is_correct boolean not null,
  answer jsonb,
  created_at timestamptz not null default now()
);

create table public.test_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  exercise_id uuid references public.exercises (id) on delete set null,
  level_id uuid references public.levels (id) on delete set null,
  score smallint not null,
  max_score smallint not null,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  target_type text not null check (target_type in ('vocabulary','lesson','grammar')),
  target_id uuid not null,
  created_at timestamptz not null default now(),
  unique (user_id, target_type, target_id)
);

create table public.streaks (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_activity_date date
);

create table public.daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  goal_date date not null,
  target_xp smallint not null,
  earned_xp smallint not null default 0,
  unique (user_id, goal_date)
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title jsonb not null check (public.is_multilingual(title)),
  description jsonb not null check (public.is_multilingual(description)),
  icon text,
  xp_reward smallint not null default 0
);

create table public.user_achievements (
  user_id uuid not null references public.profiles (id) on delete cascade,
  achievement_id uuid not null references public.achievements (id) on delete cascade,
  earned_at timestamptz not null default now(),
  primary key (user_id, achievement_id)
);

-- Indexes on foreign keys and common lookups ---------------------------------
create index on public.courses (level_id, sort_order);
create index on public.lessons (course_id, sort_order);
create index on public.lessons (level_id);
create index on public.lesson_sections (lesson_id, sort_order);
create index on public.grammar_topics (level_id, category);
create index on public.vocabulary (level_id);
create index on public.vocabulary (category);
create index on public.vocabulary_examples (vocabulary_id);
create index on public.exercises (level_id, type);
create index on public.exercises (lesson_id);
create index on public.exercise_questions (exercise_id, sort_order);
create index on public.exercise_options (question_id);
create index on public.user_progress (user_id);
create index on public.user_progress (lesson_id);
create index on public.user_vocabulary (user_id, next_review);
create index on public.exercise_attempts (user_id, created_at desc);
create index on public.test_results (user_id, created_at desc);
create index on public.bookmarks (user_id);
create index on public.profiles (current_level_id);

-- updated_at triggers ------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['profiles','lessons','grammar_topics','vocabulary','exercises','user_progress'] loop
    execute format('create trigger set_updated_at before update on public.%I
                    for each row execute function public.set_updated_at()', t);
  end loop;
end $$;

-- Auth helpers ---------------------------------------------------------------
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.profiles
                     where id = (select auth.uid()) and role = 'admin') $$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create or replace function public.set_user_role(target uuid, new_role text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if new_role not in ('learner','admin') then
    raise exception 'invalid role';
  end if;
  update public.profiles set role = new_role where id = target;
end $$;
revoke execute on function public.set_user_role(uuid, text) from public, anon;
grant execute on function public.set_user_role(uuid, text) to authenticated;

-- Create profile + streak row when someone signs up -----------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  full_name text := coalesce(meta ->> 'full_name', meta ->> 'name', '');
  first text := split_part(full_name, ' ', 1);
begin
  insert into public.profiles (id, first_name, last_name, avatar_url)
  values (
    new.id,
    nullif(coalesce(meta ->> 'first_name', first), ''),
    nullif(coalesce(meta ->> 'last_name', substr(full_name, length(first) + 2)), ''),
    coalesce(meta ->> 'avatar_url', meta ->> 'picture')
  );
  insert into public.streaks (user_id) values (new.id);
  return new;
end $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();