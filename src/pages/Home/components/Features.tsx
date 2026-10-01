import Reveal from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/Section";
import Card from "@/components/ui/Card";
import {
  BookMarked,
  BookOpen,
  ChartColumn,
  Dumbbell,
  Languages,
  Mic,
  type LucideIcon,
} from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: BookOpen,
    title: "Structured lessons",
    text: "Short lessons that move from explanation to example to practice.",
  },
  {
    icon: Languages,
    title: "Grammar made visual",
    text: "Tables. highlighted sentences and common mistakes.",
  },
  {
    icon: BookMarked,
    title: "Vocabulary in context",
    text: "Articles, plurals, IPA and example sentences for every word.",
  },
  {
    icon: Mic,
    title: "Pronunciation first",
    text: "Listen, repeat, and compare, built into every lesson.",
  },
  {
    icon: Dumbbell,
    title: "Focused practice",
    text: "Choose level, topic and difficulty, then drill what you need.",
  },
  {
    icon: ChartColumn,
    title: "Clear progress",
    text: "XP, streaks and skill progress always show your next step.",
  },
];

const Features = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Everything in one place"
        title="A complete way to learn German."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.05}>
            <Card className="h-full">
              <Icon size={22} className="text-red" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default Features;
