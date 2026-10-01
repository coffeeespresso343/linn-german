-- Levels (all six published; A2-C2 simply have no lessons yet)
insert into public.levels (code, name, description, sort_order, is_published) values
('A1', '{"de":"Anfänger","en":"Beginner","my":""}',
      '{"de":"Baue dein Deutsch-Fundament auf.","en":"Build your German foundation.","my":""}', 1, true),
('A2', '{"de":"Grundlagen","en":"Elementary","my":""}',
      '{"de":"Meistere alltägliche Situationen sicher.","en":"Handle everyday situations with confidence.","my":""}', 2, true),
('B1', '{"de":"Mittelstufe","en":"Intermediate","my":""}',
      '{"de":"Äußere Meinungen und erzähle von Erfahrungen.","en":"Express opinions and tell experiences.","my":""}', 3, true),
('B2', '{"de":"Obere Mittelstufe","en":"Upper Intermediate","my":""}',
      '{"de":"Diskutiere komplexe Themen flüssig.","en":"Discuss complex topics fluently.","my":""}', 4, true),
('C1', '{"de":"Fortgeschritten","en":"Advanced","my":""}',
      '{"de":"Nutze Deutsch flexibel und präzise.","en":"Use German flexibly and precisely.","my":""}', 5, true),
('C2', '{"de":"Meisterschaft","en":"Mastery","my":""}',
      '{"de":"Verstehe praktisch alles.","en":"Understand virtually everything.","my":""}', 6, true);

-- A1 units
insert into public.courses (level_id, slug, title, sort_order, is_published)
select l.id, v.slug, jsonb_build_object('de', v.de, 'en', v.en, 'my', ''), v.ord, true
from public.levels l,
(values
  ('unit-1-greetings',            'Begrüßung und Vorstellung',       'Greetings & Introductions', 1),
  ('unit-2-personal-information', 'Persönliche Angaben',             'Personal Information',      2),
  ('unit-3-numbers-time',         'Zahlen und Uhrzeit',              'Numbers & Time',            3),
  ('unit-4-family',               'Familie',                         'Family',                    4),
  ('unit-5-daily-routine',        'Tagesablauf',                     'Daily Routine',             5),
  ('unit-6-food-drinks',          'Essen und Trinken',               'Food & Drinks',             6),
  ('unit-7-shopping',             'Einkaufen',                       'Shopping',                  7),
  ('unit-8-home',                 'Wohnen',                          'Home',                      8),
  ('unit-9-work-school',          'Arbeit und Schule',               'Work & School',             9),
  ('unit-10-travel-directions',   'Reisen und Wegbeschreibung',      'Travel & Directions',      10)
) as v(slug, de, en, ord)
where l.code = 'A1';

-- Sample vocabulary
insert into public.vocabulary (german, article, plural, english, myanmar, ipa, level_id, category, tags)
select v.g, v.a, v.p, v.e, v.m, v.i, l.id, v.c, v.t
from public.levels l,
(values
  ('Tisch',   'der', 'Tische',   'table',  'စားပွဲ',   '/tɪʃ/',          'home',   array['furniture']),
  ('Familie', 'die', 'Familien', 'family', 'မိသားစု',  '/faˈmiːli̯ə/',   'family', array['people']),
  ('Haus',    'das', 'Häuser',   'house',  'အိမ်',     '/haʊ̯s/',         'home',   array['building']),
  ('Schule',  'die', 'Schulen',  'school', 'ကျောင်း',  '/ˈʃuːlə/',       'school', array['building']),
  ('Wasser',  'das', null,       'water',  'ရေ',       '/ˈvasɐ/',        'food',   array['drink']),
  ('Buch',    'das', 'Bücher',   'book',   'စာအုပ်',   '/buːx/',         'school', array['object'])
) as v(g, a, p, e, m, i, c, t)
where l.code = 'A1';

insert into public.vocabulary_examples (vocabulary_id, german, english, sort_order)
select voc.id, v.g, v.e, 1
from public.vocabulary voc
join (values
  ('Tisch',   'Der Tisch ist groß.',            'The table is big.'),
  ('Familie', 'Die Familie isst zusammen.',     'The family eats together.'),
  ('Haus',    'Das Haus ist neu.',              'The house is new.'),
  ('Schule',  'Die Schule beginnt um acht.',    'School starts at eight.'),
  ('Wasser',  'Das Wasser ist kalt.',           'The water is cold.'),
  ('Buch',    'Das Buch liegt auf dem Tisch.',  'The book is on the table.')
) as v(w, g, e) on v.w = voc.german;

-- Sample lesson: Personal Pronouns (Unit 2)
insert into public.lessons (course_id, level_id, slug, title, sort_order, estimated_minutes, xp_reward, is_published)
select c.id, c.level_id, 'personal-pronouns',
       '{"de":"Personalpronomen","en":"Personal Pronouns","my":""}', 1, 10, 10, true
from public.courses c where c.slug = 'unit-2-personal-information';

insert into public.lesson_sections (lesson_id, type, sort_order, content)
select l.id, v.t, v.o, v.c::jsonb
from public.lessons l,
(values
  ('introduction', 1, $j${"text":{"de":"Mit Pronomen sagst du, wer etwas tut.","en":"Pronouns tell us who is doing something.","my":""}}$j$),
  ('explanation',  2, $j${"rows":[
      {"de":"ich","en":"I","my":"ကျွန်တော်/ကျွန်မ"},
      {"de":"du","en":"you (informal)","my":"မင်း/သင်"},
      {"de":"er","en":"he","my":"သူ"},
      {"de":"sie","en":"she","my":"သူ"},
      {"de":"es","en":"it","my":""},
      {"de":"wir","en":"we","my":"ကျွန်တော်တို့/ကျွန်မတို့"},
      {"de":"ihr","en":"you (plural)","my":"မင်းတို့/သင်တို့"},
      {"de":"sie","en":"they","my":"သူတို့"},
      {"de":"Sie","en":"you (formal)","my":"သင်"}]}$j$),
  ('completion',   3, $j${"text":{"de":"Super! Du kennst jetzt die Pronomen.","en":"Well done! You now know the pronouns.","my":""}}$j$)
) as v(t, o, c)
where l.slug = 'personal-pronouns';

-- Sample grammar topic
insert into public.grammar_topics (level_id, slug, category, title, summary, explanation, rules, examples, sort_order, is_published)
select l.id, 'sein', 'verbs',
  '{"de":"sein","en":"sein (to be)","my":""}',
  '{"de":"Das wichtigste unregelmäßige Verb.","en":"The most important irregular verb.","my":""}',
  '{"de":"sein ist unregelmäßig: Lerne die Formen auswendig.","en":"sein is irregular: learn the forms by heart.","my":""}',
  '[{"pronoun":"ich","form":"bin"},{"pronoun":"du","form":"bist"},{"pronoun":"er/sie/es","form":"ist"},
    {"pronoun":"wir","form":"sind"},{"pronoun":"ihr","form":"seid"},{"pronoun":"sie/Sie","form":"sind"}]',
  '[{"de":"Ich bin Anna.","en":"I am Anna.","my":""}]',
  1, true
from public.levels l where l.code = 'A1';

-- Sample exercise: choose the article
do $$
declare lvl uuid; ex uuid; q uuid;
begin
  select id into lvl from public.levels where code = 'A1';

  insert into public.exercises (level_id, title, type, difficulty, sort_order, is_published)
  values (lvl, '{"de":"Artikel: der, die, das","en":"Articles: der, die, das","my":""}', 'grammar', 1, 1, true)
  returning id into ex;

  insert into public.exercise_questions (exercise_id, type, prompt, explanation, sort_order)
  values (ex, 'multiple-choice',
    '{"de":"Wähle den richtigen Artikel: ___ Tisch ist groß.","en":"Choose the correct article: ___ Tisch ist groß.","my":""}',
    '{"de":"Tisch ist maskulin, also der Tisch.","en":"Tisch is masculine, so it takes der.","my":""}', 1)
  returning id into q;

  insert into public.exercise_options (question_id, label, is_correct, sort_order)
  select q, jsonb_build_object('de', o, 'en', o, 'my', o), o = 'der', ord
  from (values ('der', 1), ('die', 2), ('das', 3)) as t(o, ord);
end $$;