import { supabase } from "./supabase";

export function audioPublicUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;

  return supabase.storage.from("audio").getPublicUrl(path).data.publicUrl;
}
