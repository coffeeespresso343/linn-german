import type { Session, User } from "@supabase/supabase-js";
import type { Profile, ProfileUpdate } from "./types";
import { createContext } from "react";

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  updateProfile: (path: ProfileUpdate) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
