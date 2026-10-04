import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { fetchUserProgress } from "./progressService";

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
