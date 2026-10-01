import { Section, SectionHeading } from "@/components/shared/Section";
import { useLang } from "@/features/profile/langStore";
import { cn } from "@/lib/cn";
import { LANG_LABEL, LANGS } from "@/lib/i18n";
import type { MultilingualText } from "@/types/content";

const SAMPLE: MultilingualText = {
  de: "Der bestimmte Artikel",
  en: "The definite article",
  my: "အတိအကျဖော်ပြသော Article",
};

const MultilingualSection = () => {
  const { lang, setLang } = useLang();

  return (
    <Section>
      <div className="grid items-center gap-10 md:grid-cols-2">
        <SectionHeading
          eyebrow="Three languages"
          title="Learn in the language you think in."
          description="Switch explanations between German, English and Myanmar at any time."
        />

        <ul className="space-y-3">
          {LANGS.map((l) => (
            <li key={l}>
              <button
                onClick={() => setLang(l)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-2xl border bg-card p-5 text-left transition-colors",
                  lang === l ? "border-fg" : "border-border hover:border-muted",
                )}
              >
                <span>
                  <span className="block uppercase text-xs tracking-widest text-muted">
                    {LANG_LABEL[l]}
                  </span>
                  <span className="mt-1 block text-lg font-medium">{SAMPLE[l]}</span>
                </span>
                {lang === l && (
                  <span className="text-sm text-red font-medium">Selected</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default MultilingualSection;
