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

/**
 *
 * @param text
 * @param lang
 * @returns which language t() actually returned
 */
export function langOf(text: MultilingualText, lang: Lang): Lang {
  return text[lang] ? lang : text.en ? "en" : "de";
}

export function pickTranslation(entry: { en: string; my?: string }, lang: Lang) {
  return lang === "my" && entry.my
    ? { text: entry.my, lang: "my" as const }
    : { text: entry.en, lang: "en" as const };
}
