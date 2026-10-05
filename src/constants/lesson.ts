import type { MultilingualText, SectionType } from "@/types/content";

export const SECTION_LABEL: Record<SectionType, MultilingualText> = {
  introduction: { de: "Einführung", en: "Introduction", my: "နိဒါန်း" },
  explanation: { de: "Erklärung", en: "Explanation", my: "ရှင်းလင်းချက်" },
  examples: { de: "Beispiele", en: "Examples", my: "ဥပမာများ" },
  vocabulary: { de: "Wortschatz", en: "Vocabulary", my: "ဝေါဟာရ" },
  grammar: { de: "Grammatik", en: "Grammar", my: "သဒ္ဒါ" },
  pronunciation: { de: "Aussprache", en: "Pronunciation", my: "အသံထွက်" },
  practice: { de: "Übung", en: "Practice", my: "လေ့ကျင့်ခန်း" },
  completion: { de: "Abschluss", en: "Complete", my: "ပြီးဆုံးခြင်း" },
};
