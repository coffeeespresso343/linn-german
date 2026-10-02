import type { Tables } from "@/types/database";

export type Profile = Tables<"profiles">;

export type ProfileUpdate = Partial<
  Pick<
    Profile,
    | "first_name"
    | "last_name"
    | "avatar_url"
    | "current_level_id"
    | "preferred_language"
    | "daily_goal"
    | "timezone"
  >
>;
