import { useQuery } from "@tanstack/react-query";
import { fetchLessons, fetchLevels, fetchLevelWithCourses } from "./lessonService";

export const useLevels = () => useQuery({ queryKey: ["levels"], queryFn: fetchLevels });

export const useLevel = (code: string) =>
  useQuery({
    queryKey: ["levels", code.toUpperCase()],
    queryFn: () => fetchLevelWithCourses(code),
  });

export const useLesson = (slug: string) =>
  useQuery({ queryKey: ["lessons", slug], queryFn: () => fetchLessons(slug) });
