import { Section, SectionHeading } from "@/components/shared/Section";
import { useState } from "react";
import VocabularyPreview from "./VocabularyPreview";
import { cn } from "@/lib/cn";
import PronunciationPreview from "./PronunciationPreview";
import GrammarPreview from "./GrammarPreview";
import ExercisePreview from "./ExercisePreview";

const TABS = [
  {
    id: "vocabulary",
    label: "Vocabulary",
    Panel: VocabularyPreview,
    text: "Every word comes with its article, IPA, meaning and an example.",
  },
  {
    id: "pronunciation",
    label: "Pronunciation",
    Panel: PronunciationPreview,
    text: "Listen at normal or slow speed, then practice the sounds that matter.",
  },
  {
    id: "grammar",
    label: "Grammar",
    Panel: GrammarPreview,
    text: "Clear tables and short explanations in the language you choose.",
  },
  {
    id: "exercises",
    label: "Exercises",
    Panel: ExercisePreview,
    text: "Instant feedback that explains the answer, not just marks it.",
  },
] as const;

const Showcase = () => {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("vocabulary");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <Section className="">
      <SectionHeading
        eyebrow="See it in action"
        title="Explain. Listen. Practice."
        description="Try a small sample of what every lesson feels like."
      />

      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${tab.id}`}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              active === t.id
                ? "border-fg bg-fg font-medium text-bg"
                : "border-border text-muted hover:text-fg active:scale-95",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="showcase-panel" role="tab-panel" className="mt-8">
        <p className="mb-6 max-w-xl text-muted">{tab.text}</p>
        <tab.Panel />
      </div>
    </Section>
  );
};

export default Showcase;
