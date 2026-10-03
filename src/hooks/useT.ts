import { useLang } from "@/features/profile/langStore";
import { t } from "@/lib/i18n";
import type { MultilingualText } from "@/types/content";

/**
 * Use this in components to show the lener's chosen language
 * @returns
 */
export function useT() {
  const lang = useLang((s) => s.lang);

  return (text: MultilingualText) => t(text, lang);
}
