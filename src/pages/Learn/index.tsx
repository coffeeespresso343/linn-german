import { ErrorBlock } from "@/components/shared/PageStatus";
import Reveal from "@/components/shared/Reveal";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAuth } from "@/features/auth/useAuth";
import LevelCard from "@/features/lessons/components/LevelCard";
import { useLevels } from "@/features/lessons/hooks";
import { useUserProgress } from "@/features/progress/hooks";
import { summarizeLevel } from "@/features/progress/utils";
import { Link } from "react-router-dom";

const LearnPage = () => {
  const { user } = useAuth();
  const levels = useLevels();
  const progress = useUserProgress().data ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Learn German</h1>
      <p className="mt-2 max-w-xl text-lg text-muted">
        Pick a level and work through it unit by unit.
      </p>

      {!user && (
        <p className="mt-4 text-sm text-muted">
          <Link to="/login" className="font-medium text-fg underline">
            Login
          </Link>{" "}
          to save your progress.
        </p>
      )}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {levels.isPending &&
          Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-72" />)}

        {levels.data?.map((l, i) => (
          <Reveal key={l.id} delay={i * 0.05} className="h-full">
            <LevelCard level={l} {...summarizeLevel(progress, l.id)} />
          </Reveal>
        ))}
      </div>

      {levels.isError && (
        <ErrorBlock message={levels.error.message} onRetry={() => levels.refetch()} />
      )}
    </div>
  );
};

export default LearnPage;
