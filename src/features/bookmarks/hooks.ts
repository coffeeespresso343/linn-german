import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import {
  addBoomark,
  fetchBookmarkIds,
  removeBookmark,
  type BookmarkType,
} from "./bookmarkService";

export function useBookmarks(type: BookmarkType) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bookmarks", user?.id, type],
    queryFn: () => fetchBookmarkIds(user!.id, type),
    enabled: !!user,
  });
}

export function useToggleBookmark(type: BookmarkType) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const key = ["bookmarks", user?.id, type];

  return useMutation({
    mutationFn: ({ id, saved }: { id: string; saved: boolean }) =>
      saved ? removeBookmark(user!.id, type, id) : addBoomark(user!.id, type, id),

    onMutate: async ({ id, saved }) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previous = queryClient.getQueryData<string[]>(key) ?? [];

      queryClient.setQueryData<string[]>(
        key,
        saved ? previous.filter((x) => x !== id) : [...previous, id],
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context) queryClient.setQueryData(key, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
}
