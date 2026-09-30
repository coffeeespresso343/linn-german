import type { Lang, MultilingualText } from "@/types/content";

export const LANGS: Lang[] = ["de", "en", "my"];

export const LANG_LABEL: Record<Lang, string> = {
  de: "Deutsch",
  en: "English",
  my: "မြန်မာ",
};

export function t(text: MultilingualText, lang: Lang): string {
  return text[lang] || text.en || text.de;
}
