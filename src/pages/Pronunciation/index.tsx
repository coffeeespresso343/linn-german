import Card from "@/components/ui/Card";
import { PRONUNCIATION_TOPICS } from "@/constants/pronunciation";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PronunciationPractice from "./PronunciationPractice";
import { Button } from "@/components/ui/Button";
import { Dumbbell, X } from "lucide-react";
import { cn } from "@/lib/cn";

const PronunciationPage = () => {
  const [params, setParams] = useSearchParams();
  const topic =
    PRONUNCIATION_TOPICS.find((t) => t.id === params.get("topic")) ??
    PRONUNCIATION_TOPICS[0];

  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Pronunciation</h1>
      <p className="mt-2 max-w-xl text-lg text-muted">
        Listen, record yourself and compare. Pick a topic to practice.
      </p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {PRONUNCIATION_TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setParams({ topic: t.id }, { replace: true })}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all duration-200",
              t.id === topic.id
                ? "border-fg bg-fg font-medium text-bg"
                : "border-border text-muted hover:text-fg active:scale-95",
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">{topic.label}</h2>
        <p className="mt-2 max-w-xl text-muted">{topic.description}</p>

        <ul className="mt-6 grid gap-3">
          {topic.items.map((item) => {
            const key = `${topic.id}/${item.text}`;
            const open = openKey === key;

            return (
              <li key={key}>
                <Card>
                  {open ? (
                    <div>
                      <PronunciationPractice text={item.text} ipa={item.ipa} />
                      <Button
                        variant="secondary"
                        className="mt-4 w-full bg-red/5 border-red/10 text-red"
                        onClick={() => setOpenKey(null)}
                      >
                        <X size={14} strokeWidth={2.5} />
                        Close
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xl font-semibold">{item.text}</p>
                        {item.ipa && (
                          <p className="font-mono text-sm text-muted">{item.ipa}</p>
                        )}
                      </div>
                      <Button variant="secondary" onClick={() => setOpenKey(key)}>
                        <Dumbbell size={14} strokeWidth={2} />
                        Practice
                      </Button>
                    </div>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default PronunciationPage;
