import type { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!url || !anonKey) {
  throw new Error("Missing Supabase enviroment variables");
}

export const supabase = createClient<Database>(url, anonKey);
