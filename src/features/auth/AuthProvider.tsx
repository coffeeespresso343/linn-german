import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { Session } from "@supabase/supabase-js";
import type { Profile, ProfileUpdate } from "./types";
import { supabase } from "@/lib/supabase";

interface ProfileState {
  id: string;
  profile: Profile | null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [profileState, setProfileState] = useState<ProfileState | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setAuthReady(true);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const user = session?.user ?? null;
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!cancelled) setProfileState({ id: userId, profile: data });
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const profile = userId && profileState?.id === userId ? profileState.profile : null;
  const loading = !authReady || (!!userId && profileState?.id !== userId);

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function updateProfile(patch: ProfileUpdate) {
    if (!userId) return false;

    const { data, error } = await supabase
      .from("profiles")
      .update(patch)
      .eq("id", userId)
      .select()
      .single();

    if (error || !data) return false;

    setProfileState({ id: userId, profile: data });

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isAdmin: profile?.role === "admin",
        loading,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
