import { ButtonLink } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { useT } from "@/hooks/useT";
import { plural } from "@/lib/format";
import type { Level } from "@/types/content";
import { Lock } from "lucide-react";

interface Props {
  level: Level;
  completed: number;
  started: boolean;
}

const LevelCard = ({ level, completed, started }: Props) => {
  const t = useT();
  const available = level.lessonCount > 0;
  const pct = available ? Math.round((completed / level.lessonCount) * 100) : 0;
  const cta = pct === 100 ? "Review" : started ? "Continue" : "Start";

  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-baseline justify-between">
        <h2 className="text-4xl font-semibold tracking-tight">{level.code}</h2>
        {!available && (
          <span className="inline-flex items-center gap-1 text-sm text-muted">
            <Lock size={14} />
          </span>
        )}
      </div>

      <p className="mt-1 font-medium">{t(level.name)}</p>
      <p className="mt-2 text-muted">{t(level.description)}</p>

      {available && (
        <div className="mt-auto pt-6">
          <div className="flex items-center gap-3">
            <ProgressBar value={pct} label={`${level.code} progress`} />
            <span className="text-sm tabular-nums text-muted">{pct}%</span>
          </div>

          <p className="mt-3 text-sm text-muted">
            {plural(level.lessonCount, "lesson")} .{" "}
            {plural(level.vocabularyCount, "vocabulary word")}
          </p>

          <ButtonLink to={`/learn/${level.code.toLowerCase()}`} className="mt-5 w-full">
            {cta}
          </ButtonLink>
        </div>
      )}
    </Card>
  );
};

export default LevelCard;
