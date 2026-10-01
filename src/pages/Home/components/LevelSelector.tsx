import Reveal from "@/components/shared/Reveal";
import { Section, SectionHeading } from "@/components/shared/Section";
import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { LEVELS } from "@/constants/lavels";
import { Lock } from "lucide-react";

const LevelSelector = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Levels"
        title="Start where you are."
        description="Six levels aligned conceptually with the CEFR. A1 opens first; the rest unlock as we publish them."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((l, i) => (
          <Reveal key={l.code} delay={i * 0.05}>
            <Card className="flex h-full flex-col">
              <div className="flex items-baseline justify-between">
                <p className="text-4xl font-semibold tracking-tight">{l.code}</p>
                {!l.available && (
                  <span className="inline-flex items-center gap-1 text-sm text-muted">
                    <Lock size={14} />
                  </span>
                )}
              </div>

              <p className="mt-1 font-medium">{l.name}</p>
              <p className="mt-2 flex-1 text-muted">{l.description}</p>

              {l.available && (
                <ButtonLink
                  to={`/learn/${l.code.toLowerCase()}`}
                  className="mt-6 self-start"
                >
                  Start {l.code}
                </ButtonLink>
              )}
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default LevelSelector;
