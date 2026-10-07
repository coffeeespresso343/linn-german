import { supabase } from "@/lib/supabase";

export type BookmarkType = "vocabulary" | "lesson" | "grammar";

export async function fetchBookmarkIds(
  userId: string,
  type: BookmarkType,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("target_id")
    .eq("user_id", userId)
    .eq("target_type", type);

  if (error) throw error;

  return data.map((r) => r.target_id);
}

export async function addBoomark(userId: string, type: BookmarkType, targetId: string) {
  const { error } = await supabase
    .from("bookmarks")
    .upsert(
      { user_id: userId, target_type: type, target_id: targetId },
      { onConflict: "user_id,target_type,target_id", ignoreDuplicates: true },
    );

  if (error) throw error;
}

export async function removeBookmark(
  userId: string,
  type: BookmarkType,
  targeId: string,
) {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("target_type", type)
    .eq("target_id", targeId);

  if (error) throw error;
}
