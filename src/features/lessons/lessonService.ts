import { toMultilingual } from "@/lib/multilingual";
import { supabase } from "@/lib/supabase";
import type {
  Course,
  Lesson,
  LessonSection,
  LessonSummary,
  Level,
  LevelCode,
  LevelWithCourses,
  SectionType,
} from "@/types/content";
import type { Tables } from "@/types/database";

const toSummary = (
  r: Pick<
    Tables<"lessons">,
    | "id"
    | "slug"
    | "title"
    | "description"
    | "sort_order"
    | "estimated_minutes"
    | "xp_reward"
  >,
): LessonSummary => ({
  id: r.id,
  slug: r.slug,
  title: toMultilingual(r.title),
  description: toMultilingual(r.description),
  order: r.sort_order,
  estimatedMinutes: r.estimated_minutes,
  xpReward: r.xp_reward,
});

/**
 * All levels with lesson and word counts
 * @returns
 */
export async function fetchLevels(): Promise<Level[]> {
  const { data, error } = await supabase
    .from("levels")
    .select("*, lessons(count), vocabulary(count)")
    .order("sort_order");

  if (error) throw error;

  return data.map((r) => ({
    id: r.id,
    code: r.code as LevelCode,
    name: toMultilingual(r.name),
    description: toMultilingual(r.description),
    order: r.sort_order,
    lessonCount: r.lessons[0]?.count ?? 0,
    vocabularyCount: r.vocabulary[0]?.count ?? 0,
  }));
}

/**
 * One level with its units and their lessons
 * @param code
 * @returns
 */
export async function fetchLevelWithCourses(
  code: string,
): Promise<LevelWithCourses | null> {
  const { data, error } = await supabase
    .from("levels")
    .select(
      "*, courses(*, lessons(id, slug, title, description, sort_order, estimated_minutes, xp_reward))",
    )
    .eq("code", code.toUpperCase())
    .order("sort_order", { referencedTable: "courses" })
    .order("sort_order", { referencedTable: "courses.lessons" })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const courses: Course[] = data.courses.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: toMultilingual(c.title),
    description: toMultilingual(c.description),
    order: c.sort_order,
    lessons: c.lessons.map(toSummary),
  }));

  return {
    id: data.id,
    code: data.code as LevelCode,
    name: toMultilingual(data.name),
    description: toMultilingual(data.description),
    order: data.sort_order,
    courses,
  };
}

export async function fetchLessons(slug: string): Promise<Lesson | null> {
  const { data, error } = await supabase
    .from("lessons")
    .select("*, lesson_sections(*)")
    .eq("slug", slug)
    .order("sort_order", { referencedTable: "lesson_sections" })
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const sections: LessonSection[] = data.lesson_sections.map((s) => ({
    id: s.id,
    type: s.type as SectionType,
    order: s.sort_order,
    content: s.content,
  }));

  return {
    ...toSummary(data),
    levelId: data.level_id,
    courseId: data.course_id,
    isPublished: data.is_published,
    sections,
  };
}
