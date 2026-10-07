export interface PronunciationItem {
  text: string;
  ipa?: string;
}

export interface PronunciationTopic {
  id: string;
  label: string;
  description: string;
  items: PronunciationItem[];
}

export const PRONUNCIATION_TOPICS: PronunciationTopic[] = [
  {
    id: "alphabet",
    label: "Alphabet",
    description: "The German alphabet has 26 letters, plus Ä, Ö, Ü and ß.",
    items: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((text) => ({ text })),
  },
  {
    id: "umlauts",
    label: "Ä Ö Ü",
    description:
      "Ä is like 'e' in 'bed'. For Ö say 'eh' and for Ü say 'ee', both with rounded lips.",
    items: [
      { text: "Mädchen", ipa: "/ˈmɛːtçən/" },
      { text: "schön", ipa: "/ʃøːn/" },
      { text: "über", ipa: "/ˈyːbɐ/" },
    ],
  },
  {
    id: "eszett",
    label: "ß",
    description: "The ß is always a sharp 'ss' sound.",
    items: [
      { text: "Straße", ipa: "/ˈʃtʁaːsə/" },
      { text: "heiß", ipa: "/haɪ̯s/" },
      { text: "groß", ipa: "/ɡʁoːs/" },
    ],
  },
  {
    id: "ch",
    label: "CH",
    description:
      "Two sounds: a soft 'ich' sound after front vowels, a rougher 'ach' sound after a, o, u.",
    items: [
      { text: "ich", ipa: "/ɪç/" },
      { text: "Buch", ipa: "/buːx/" },
      { text: "Küche", ipa: "/ˈkʏçə/" },
    ],
  },
  {
    id: "sch",
    label: "SCH",
    description: "SCH is always 'sh', as in 'ship'.",
    items: [
      { text: "Schule", ipa: "/ˈʃuːlə/" },
      { text: "schnell", ipa: "/ʃnɛl/" },
      { text: "Fisch", ipa: "/fɪʃ/" },
    ],
  },
  {
    id: "sp-st",
    label: "SP / ST",
    description: "At the start of a word, sp- and st- sound like 'shp' and 'sht'.",
    items: [
      { text: "sprechen", ipa: "/ˈʃpʁɛçn̩/" },
      { text: "Stein", ipa: "/ʃtaɪ̯n/" },
      { text: "Spiel", ipa: "/ʃpiːl/" },
    ],
  },
  {
    id: "r",
    label: "R",
    description:
      "Most speakers use a soft sound from the throat, and a vowel-like sound at the end of a syllable.",
    items: [
      { text: "rot", ipa: "/ʁoːt/" },
      { text: "Reise", ipa: "/ˈʁaɪ̯zə/" },
      { text: "Bruder", ipa: "/ˈbʁuːdɐ/" },
    ],
  },
  {
    id: "z",
    label: "Z",
    description: "Z is always 'ts', as in 'cats'.",
    items: [
      { text: "Zeit", ipa: "/tsaɪ̯t/" },
      { text: "Zimmer", ipa: "/ˈtsɪmɐ/" },
      { text: "Katze", ipa: "/ˈkatsə/" },
    ],
  },
  {
    id: "w",
    label: "W",
    description: "W sounds like the English 'v'.",
    items: [
      { text: "Wasser", ipa: "/ˈvasɐ/" },
      { text: "wir", ipa: "/viːɐ̯/" },
      { text: "Wetter", ipa: "/ˈvɛtɐ/" },
    ],
  },
  {
    id: "v",
    label: "V",
    description: "In German words, V usually sounds like the English 'f'.",
    items: [
      { text: "Vater", ipa: "/ˈfaːtɐ/" },
      { text: "viel", ipa: "/fiːl/" },
      { text: "Vogel", ipa: "/ˈfoːɡl̩/" },
    ],
  },
  {
    id: "long-vowels",
    label: "Long vowels",
    description: "Long vowels are held longer, often before a single consonant.",
    items: [
      { text: "Staat", ipa: "/ʃtaːt/" },
      { text: "Boden", ipa: "/ˈboːdn̩/" },
      { text: "Hut", ipa: "/huːt/" },
    ],
  },
  {
    id: "short-vowels",
    label: "Short vowels",
    description: "Short vowels are quick, often before double consonants.",
    items: [
      { text: "Bett", ipa: "/bɛt/" },
      { text: "Mutter", ipa: "/ˈmʊtɐ/" },
      { text: "Kind", ipa: "/kɪnt/" },
    ],
  },
  {
    id: "word-stress",
    label: "Word stress",
    description:
      "Stress usually falls on the first syllable. Prefixes like be-, ge- and ver- are unstressed.",
    items: [
      { text: "Familie", ipa: "/faˈmiːli̯ə/" },
      { text: "verstehen", ipa: "/fɛɐ̯ˈʃteːən/" },
      { text: "Computer", ipa: "/kɔmˈpjuːtɐ/" },
    ],
  },
  {
    id: "rhythm",
    label: "Sentence rhythm",
    description:
      "Stressed syllables carry the beat. Say each sentence in smooth chunks, not word by word.",
    items: [
      { text: "Ich lerne heute Deutsch." },
      { text: "Wie geht es dir?" },
      { text: "Das ist mein Bruder." },
    ],
  },
];
