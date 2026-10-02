import { supabase } from "@/lib/supabase";
import type { RegisterValues } from "./schemas";

const redirectTo = () => `${window.location.origin}/dashboard`;

export const signInWithPassword = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export const signUp = (v: RegisterValues) =>
  supabase.auth.signUp({
    email: v.email,
    password: v.password,
    options: {
      data: { first_name: v.firstName, last_name: v.lastName ?? "" },
      emailRedirectTo: redirectTo(),
    },
  });

export const sendMagicLink = (email: string) =>
  supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo() } });

export const signInWithGoogle = () =>
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: redirectTo() },
  });
