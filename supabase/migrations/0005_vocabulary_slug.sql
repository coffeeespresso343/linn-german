alter table public.vocabulary add column slug text;

update public.vocabulary
set slug = trim(both '-' from regexp_replace(
      replace(replace(replace(replace(lower(german), 'ä', 'ae'), 'ö', 'oe'), 'ü', 'ue'), 'ß', 'ss'),
      '[^a-z0-9]+', '-', 'g'));

alter table public.vocabulary alter column slug set not null;
create unique index vocabulary_slug_key on public.vocabulary (slug);