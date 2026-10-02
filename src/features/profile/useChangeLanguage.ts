import type { Lang } from "@/types/content";
import { useAuth } from "../auth/useAuth";
import { useLang } from "./langStore";

export function useChangeLanguage() {
  const setLang = useLang((s) => s.setLang);
  const { user, updateProfile } = useAuth();

  return (lang: Lang) => {
    setLang(lang);
    if (user) void updateProfile({ preferred_language: lang });
  };
}
