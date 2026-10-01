// Smaple data - replaced by database later

import type { Article } from "@/types/content";

export interface SampleWord {
  article: Article;
  noun: string;
  ipa: string;
  en: string;
  my: string;
  example: string;
}

export const SAMPLE_WORDS: SampleWord[] = [
  {
    article: "der",
    noun: "Tisch",
    ipa: "/tɪʃ/",
    en: "the table",
    my: "စားပွဲ",
    example: "Der Tisch ist groß.",
  },
  {
    article: "die",
    noun: "Familie",
    ipa: "/faˈmiːli̯ə/",
    en: "the family",
    my: "မိသားစု",
    example: "Die Familie isst zusammen.",
  },
  {
    article: "das",
    noun: "Haus",
    ipa: "/haʊ̯s/",
    en: "the house",
    my: "အိမ်",
    example: "Das Haus ist neu.",
  },
  {
    article: "die",
    noun: "Schule",
    ipa: "/ˈʃuːlə/",
    en: "the school",
    my: "ကျောင်း",
    example: "Die Schule beginnt um acht.",
  },
  {
    article: "das",
    noun: "Wasser",
    ipa: "/ˈvasɐ/",
    en: "the water",
    my: "ရေ",
    example: "Das Wasser ist kalt.",
  },
  {
    article: "das",
    noun: "Buch",
    ipa: "/buːx/",
    en: "the book",
    my: "စာအုပ်",
    example: "Das Buch liegt auf dem Tisch.",
  },
];
