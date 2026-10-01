import Card from "@/components/ui/Card";
import { SAMPLE_WORDS } from "@/constants/sampleWords";
import { cn } from "@/lib/cn";
import { AnimatePresence, useReducedMotion, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WordRotator = () => {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((n) => (n + 1) % SAMPLE_WORDS.length);
    }, 4000);

    return () => clearInterval(id);
  }, [reduceMotion]);

  const w = SAMPLE_WORDS[index];

  return (
    <Card className="p-8 sm:p-10">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Wort des Moments
      </p>
      <div className="mt-6 min-h-44">
        <AnimatePresence mode="wait">
          <motion.div
            key={w.noun}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-red">{w.article}</span> {w.noun}
            </p>
            <p className="mt-2 font-mono text-sm text-muted">{w.ipa}</p>
            <p className="mt-4 text-xl">{w.en}</p>
            <p lang="my" className="mt-1 text-xl text-muted">
              {w.my}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 flex justify-center gap-1.5">
        {SAMPLE_WORDS.map((s, i) => (
          <span
            key={s.noun}
            className={cn(
              "h-1.5 rounded-full  transition-all",
              i === index ? "w-6 bg-red" : "w-1.5 bg-surface",
            )}
          />
        ))}
      </div>
    </Card>
  );
};

export default WordRotator;
