import type { LessonProgress } from "./progressService";

export type LessonStatus = "not_started" | "in_progress" | "completed";

export function summarizeLevel(progress: LessonProgress[], levelId: string) {
  const rows = progress.filter((p) => p.levelId === levelId);

  return {
    completed: rows.filter((p) => p.status === "completed").length,
    started: rows.length > 0,
  };
}

export function statusByLesson(progress: LessonProgress[]) {
  return new Map(progress.map((p) => [p.lessonId, p.status] as const));
}
