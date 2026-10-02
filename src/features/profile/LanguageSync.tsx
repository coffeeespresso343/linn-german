import { useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useLang } from "./langStore";
import { LANGS } from "@/lib/i18n";
import type { Lang } from "@/types/content";

const LanguageSync = () => {
  const { profile } = useAuth();
  const setLang = useLang((s) => s.setLang);
  const profileId = profile?.id;
  const profileLang = profile?.preferred_language;

  useEffect(() => {
    if (profileId && LANGS.includes(profileLang as Lang)) setLang(profileLang as Lang);
  }, [profileId, profileLang, setLang]);

  return null;
};

export default LanguageSync;
