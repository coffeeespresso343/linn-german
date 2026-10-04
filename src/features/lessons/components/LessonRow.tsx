import type { LessonStatus } from "@/features/progress/utils";
import { useT } from "@/hooks/useT";
import type { LessonSummary } from "@/types/content";
import { Circle, CircleCheck, CircleDot, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  lesson: LessonSummary;
  status: LessonStatus;
}

const ICON = { completed: CircleCheck, in_progress: CircleDot, not_started: Circle };
const LABEL = {
  completed: "Completed",
  in_progress: "In progress",
  not_started: "Not started",
};

const LessonRow = ({ lesson, status }: Props) => {
  const t = useT();
  const Icon = ICON[status];

  return (
    <li>
      <Link
        to={`/lesson/${lesson.slug}`}
        className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-surface"
      >
        <Icon
          size={20}
          className={status === "completed" ? "text-success" : "text-muted"}
        />
        <span className="flex-1 font-medium">
          {t(lesson.title)}
          <span className="sr-only">({LABEL[status]})</span>
        </span>

        <span className="flex items-center gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {lesson.estimatedMinutes} min
          </span>
          <span>{lesson.xpReward} XP</span>
        </span>
      </Link>
    </li>
  );
};

export default LessonRow;
