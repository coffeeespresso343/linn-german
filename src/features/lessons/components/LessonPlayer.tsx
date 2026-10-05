import { useAuth } from "@/features/auth/useAuth";
import { useT } from "@/hooks/useT";
import type { Lesson } from "@/types/content";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import StepIndicator from "./StepIndicator";
import { useEffect, useRef } from "react";
import Card from "@/components/ui/Card";
import { SECTION_LABEL } from "@/constants/lesson";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useLessonProgressActions, useUserProgress } from "@/features/progress/hooks";
import { statusByLesson } from "@/features/progress/utils";
import SectionRenderer from "./SectionRenderer";
import { useLevel } from "../hooks";

const LessonPlayer = ({ lesson }: { lesson: Lesson }) => {
  const t = useT();
  const { user } = useAuth();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const progress = useUserProgress();
  const { start, complete } = useLessonProgressActions();
  const statuses = statusByLesson(progress.data ?? []);
  const tracked = statuses.has(lesson.id);
  const completed = statuses.get(lesson.id) === "completed";

  useEffect(() => {
    if (user && progress.isSuccess && !tracked) start.mutate(lesson.id);
  }, [user, progress.isSuccess, tracked, lesson.id, start.mutate]);

  // Next level in the level (level data is usually cached from /learn)
  const level = useLevel(lesson.levelCode).data;
  const flat = level?.courses.flatMap((c) => c.lessons) ?? [];
  const index = flat.findIndex((l) => l.id === lesson.id);
  const nextLesson = index >= 0 ? flat[index + 1] : undefined;

  const total = lesson.sections.length;
  if (total === 0) {
    return <p className="p-8 text-muted">This lesson has not content yet.</p>;
  }

  const step = Math.min(
    Math.max(parseInt(params.get("step") ?? "0", 10) || 0, 0),
    total - 1,
  );
  const section = lesson.sections[step];
  const isLast = step === total - 1;
  const levelPath = `/learn/${lesson.levelCode.toLowerCase()}`;

  function go(next: number) {
    setParams({ step: String(next) }, { replace: true });
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
      <Link
        to={levelPath}
        className="inline-flex items-center gap-1 text-sm to-muted hover:text-fg"
      >
        <ChevronLeft size={16} /> {lesson.levelCode}
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight">{t(lesson.title)}</h1>
        <p className="mt-1 text-sm text-muted">
          {lesson.estimatedMinutes} min . {lesson.xpReward} XP
        </p>
      </header>

      {!user && (
        <p className="mt-4 rounded-xl bg-surface p-3 text-sm">
          <Link
            to="/login"
            state={{ from: location.pathname }}
            className="underline font-medium"
          >
            Login
          </Link>{" "}
          to save your progress and earn XP.
        </p>
      )}

      <div className="mt-6">
        <StepIndicator sections={lesson.sections} current={step} onSelect={go} />
      </div>

      <Card className="mt-4 min-h-72">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Step {step + 1} of {total}
        </p>

        <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-semibold">
          {t(SECTION_LABEL[section.type])}
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={section.id}
            className="mt-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SectionRenderer section={section} lesson={lesson} />
          </motion.div>
        </AnimatePresence>
      </Card>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => go(step - 1)} disabled={step === 0}>
          <ChevronLeft size={16} />
          Back
        </Button>

        {!isLast && (
          <Button onClick={() => go(step + 1)}>
            Next <ChevronRight size={16} />
          </Button>
        )}

        {isLast && !user && (
          <ButtonLink to={levelPath}>
            <ChevronLeft size={16} />
            Back to {lesson.levelCode}
          </ButtonLink>
        )}

        {isLast && user && !completed && (
          <Button
            onClick={() =>
              complete.mutate({
                lessonId: lesson.id,
                xp: lesson.xpReward,
              })
            }

            disabled={complete.isPending}
          >
            {complete.isPending ? (
              <>
                <Loader size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              "Finish lesson"
            )}
          </Button>
        )}

        {isLast && user && completed && (
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink variant="secondary" to={levelPath}>
              <ArrowLeft size={16} />
              Back to {lesson.levelCode}
            </ButtonLink>

            {nextLesson && (
              <ButtonLink to={`/lesson/${nextLesson.slug}`}>
                Next lesson
                <ArrowRight size={16} />
              </ButtonLink>
            )}
          </div>
        )}
      </div>

      {isLast && user && completed && (
        <p className="mt-4 text-sm font-medium text-center text-success">
          Lesson completed. +{lesson.xpReward} XP
        </p>
      )}

      {complete.isError && (
        <p className="text-sm text-center text-red-dark dark:text-red mt-4">
          Couldn't save your progress: {complete.error.message}
        </p>
      )}
    </div>
  );
};

export default LessonPlayer;
