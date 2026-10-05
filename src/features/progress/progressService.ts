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

// --- Saving progress

/**
 * Insert only if no row exists yet, so a completed lesson is never downgraded
 * @param userId
 * @param lessonId
 */
export async function startLesson(userId: string, lessonId: string) {
  const { error } = await supabase
    .from("user_progress")
    .upsert(
      { user_id: userId, lesson_id: lessonId, status: "in_progress" },
      { onConflict: "user_id,lesson_id", ignoreDuplicates: true },
    );

  if (error) throw error;
}

export async function completeLesson(userId: string, lessonId: string, xp: number) {
  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: userId,
      lesson_id: lessonId,
      status: "completed",
      xp_earned: xp,
      completed_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,lesson_id",
    },
  );

  if (error) throw error;
}
