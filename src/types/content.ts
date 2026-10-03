import type { Json } from "./database";

export type Lang = "de" | "en" | "my";

export interface MultilingualText {
  de: string;
  en: string;
  my: string;
}

export type LevelCode = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Article = "der" | "die" | "das";

export type SectionType =
  | "introduction"
  | "explanation"
  | "examples"
  | "vocabulary"
  | "grammar"
  | "pronunciation"
  | "practice"
  | "completion";

export type GrammarCategory =
  | "articles"
  | "pronouns"
  | "verbs"
  | "tenses"
  | "cases"
  | "word_order"
  | "prepositions"
  | "adjectives"
  | "conjunctions"
  | "modal_verbs"
  | "separable_verbs"
  | "relexive_verbs"
  | "passive"
  | "konjunktiv"
  | "relative_clauses";

export interface Page<T> {
  items: T[];
  total: number;
}

export interface Level {
  id: string;
  code: LevelCode;
  name: MultilingualText;
  description: MultilingualText;
  order: number;
  lessonCount: number;
  vocabularyCount: number;
}

export interface LessonSummary {
  id: string;
  slug: string;
  title: MultilingualText;
  description: MultilingualText;
  order: number;
  estimatedMinutes: number;
  xpReward: number;
}

export interface Course {
  id: string;
  slug: string;
  title: MultilingualText;
  description: MultilingualText;
  order: number;
  lessons: LessonSummary[];
}

export interface LevelWithCourses extends Omit<Level, "lessonCount" | "vocabularyCount"> {
  courses: Course[];
}

export interface LessonSection {
  id: string;
  type: SectionType;
  order: number;
  content: Json;
}

export interface Lesson extends LessonSummary {
  levelId: string;
  courseId: string;
  isPublished: boolean;
  sections: LessonSection[];
}

export interface VocabularyExample {
  id: string;
  german: string;
  english: string;
  myanmar: string;
}

export interface Vocabulary {
  id: string;
  german: string;
  article?: Article;
  plural?: string;
  english: string;
  myanmar: string;
  ipa?: string;
  audioUrl: string;
  levelId: string;
  levelCode: LevelCode;
  category?: string;
  tags: string[];
  examples: VocabularyExample[];
}

export interface GrammarTopic {
  id: string;
  slug: string;
  category: GrammarCategory;
  levelCode: LevelCode;
  title: MultilingualText;
  summary: MultilingualText;
  explanation: MultilingualText;
  rules: Json;
  examples: Json;
  commonMistakes: Json;
  order: number;
}
