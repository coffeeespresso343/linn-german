import { supabase } from "@/lib/supabase";

export interface LessonProgress {
  lessonId: string;
  levelId: string;
  status: "in_progress" | "completed";
}

export async function fetchUserProgress(userId: string): Promise<LessonProgress[]> {
  const { data, error } = await supabase
    .from("user_progress")
    .select("lesson_id, status, lessons!inner(level_id)")
    .eq("user_id", userId);

  if (error) throw error;

  return data.map((r) => ({
    lessonId: r.lesson_id,
    levelId: r.lessons.level_id,
    status: r.status as LessonProgress["status"],
  }));
}
