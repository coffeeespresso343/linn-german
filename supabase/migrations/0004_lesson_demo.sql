-- Move "completion" to the end, enrich the introduction
update public.lesson_sections set sort_order = 8
where type = 'completion'
  and lesson_id = (select id from public.lessons where slug = 'personal-pronouns');

update public.lesson_sections
set content = $j${"text":{"de":"Mit Pronomen sagst du, wer etwas tut.","en":"Pronouns tell us who is doing something.","my":""},
                 "why":{"de":"Pronomen brauchst du in fast jedem Satz.","en":"You need pronouns in almost every sentence.","my":""}}$j$::jsonb
where type = 'introduction'
  and lesson_id = (select id from public.lessons where slug = 'personal-pronouns');

-- New sections
insert into public.lesson_sections (lesson_id, type, sort_order, content)
select l.id, v.t, v.o, v.c::jsonb
from public.lessons l,
(values
  ('examples', 3, $j${"items":[
      {"de":"Ich bin Anna.","en":"I am Anna."},
      {"de":"Du bist mein Freund.","en":"You are my friend."},
      {"de":"Wir lernen Deutsch.","en":"We are learning German."},
      {"de":"Sie sind sehr nett.","en":"They are very nice."}]}$j$),
  ('grammar', 5, '{"topicSlug":"sein"}'),
  ('pronunciation', 6, $j${"items":[
      {"text":"ich","ipa":"/ɪç/","tip":{"de":"Der Ich-Laut: Luft durch eine enge Stelle.","en":"The ich-sound: air through a narrow gap, like a soft 'h' in 'huge'.","my":""}},
      {"text":"wir","ipa":"/viːɐ̯/"},
      {"text":"ihr","ipa":"/iːɐ̯/"},
      {"text":"Sie","ipa":"/ziː/"}]}$j$)
) as v(t, o, c)
where l.slug = 'personal-pronouns';

insert into public.lesson_sections (lesson_id, type, sort_order, content)
select l.id, 'vocabulary', 4,
  jsonb_build_object('vocabularyIds',
    (select jsonb_agg(id) from public.vocabulary where german in ('Familie', 'Schule', 'Haus')))
from public.lessons l where l.slug = 'personal-pronouns';

insert into public.lesson_sections (lesson_id, type, sort_order, content)
select l.id, 'practice', 7,
  jsonb_build_object('exerciseId', (select id from public.exercises order by created_at limit 1))
from public.lessons l where l.slug = 'personal-pronouns';