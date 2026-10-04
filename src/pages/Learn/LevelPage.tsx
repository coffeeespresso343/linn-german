import { ErrorBlock, NotFoundBlock } from "@/components/shared/PageStatus";
import { ButtonLink } from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { Skeleton } from "@/components/ui/Skeleton";
import UnitCard from "@/features/lessons/components/UnitCard";
import { useLevel } from "@/features/lessons/hooks";
import { useUserProgress } from "@/features/progress/hooks";
import { statusByLesson } from "@/features/progress/utils";
import { useT } from "@/hooks/useT";
import { plural } from "@/lib/format";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const LevelPage = () => {
  const { level: code = "" } = useParams();
  const t = useT();
  const query = useLevel(code);
  const progress = useUserProgress().data ?? [];

  if (query.isPending) {
    return (
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-12 sm:px-6">
        <Skeleton className="h-40" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />
      </div>
    );
  }

  const level = query.data;
  if (!level) {
    return (
      <NotFoundBlock
        title="Level not found"
        backTo="/learn"
        backLabel="Back to all levels"
      />
    );
  }

  const lessons = level.courses.flatMap((c) => c.lessons);
  const statuses = statusByLesson(progress);
  const completed = lessons.filter((l) => statuses.get(l.id) === "completed").length;
  const started = lessons.some((l) => statuses.has(l.id));
  const pct = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
  const next = lessons.find((l) => statuses.get(l.id) !== "completed");

  return (
    <div className="mx-auto max-w-4xl px-4 py-2 sm:px-6">
      <Link
        to="/learn"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ChevronLeft size={16} />
        All levels
      </Link>

      <header className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-red">
          {t(level.name)}
        </p>
        <h1 className="mt-2 text-5xl font-semibold tracking-tight">{level.code}</h1>
        <p className="mt-3 max-w-xl text-lg text-muted">{t(level.description)}</p>

        {lessons.length > 0 ? (
          <div className="mt-8 max-w-md">
            <div className="flex items-center gap-3">
              <ProgressBar value={pct} label={`${level.code} progress`} />
              <span className="text-sm tabular-nums text-muted">{pct}%</span>
            </div>

            <p className="mt-2 text-sm text-muted">
              {completed} of {plural(lessons.length, "lesson")} completed
            </p>

            {next ? (
              <ButtonLink to={`/lesson/${next.slug}`} size="lg" className="mt-5">
                {started ? "Continue" : "Start Learning"}
              </ButtonLink>
            ) : (
              <p className="mt-5 font-medium">
                You've completed every lesson at this level.
              </p>
            )}
          </div>
        ) : (
          <p className="mt-8 rounded-xl bg-surface p-4 text-sm">
            Lessons for this level are coming soon.
          </p>
        )}
      </header>

      {level.courses.length > 0 && (
        <section className="mt-12 space-y-4">
          {level.courses.map((c) => (
            <UnitCard key={c.id} course={c} statuses={statuses} />
          ))}
        </section>
      )}
    </div>
  );
};

export default LevelPage;
