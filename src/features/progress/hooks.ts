import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { completeLesson, fetchUserProgress, startLesson } from "./progressService";

/**
 * Empty when logged out; callers can use `data ?? []`
 * @returns
 */
export function useUserProgress() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchUserProgress(user!.id),
    enabled: !!user,
  });
}

export function useLessonProgressActions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const refresh = () =>
    queryClient.invalidateQueries({ queryKey: ["progress", user?.id] });

  const start = useMutation({
    mutationFn: (lessonId: string) => startLesson(user!.id, lessonId),
    onSuccess: refresh,
  });

  const complete = useMutation({
    mutationFn: (v: { lessonId: string; xp: number }) =>
      completeLesson(user!.id, v.lessonId, v.xp),
    onSuccess: refresh,
  });

  return { start, complete };
}
