import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/types/content";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

// Step 5/6 will sync this with the user's saved profile preference.
export const useLang = create<LangState>()(
  persist((set) => ({ lang: "en", setLang: (lang) => set({ lang }) }), {
    name: "lg-lang",
  }),
);
