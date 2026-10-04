import Card from "@/components/ui/Card";
import { useT } from "@/hooks/useT";
import type { Course } from "@/types/content";
import LessonRow from "./LessonRow";
import type { LessonStatus } from "@/features/progress/utils";

interface Props {
  course: Course;
  statuses: Map<string, "in_progress" | "completed">;
}

const UnitCard = ({ course, statuses }: Props) => {
  const t = useT();
  const done = course.lessons.filter((l) => statuses.get(l.id) === "completed").length;

  return (
    <Card>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">
          <span className="mr-2 font-mono text-sm text-red">
            {String(course.order).padStart(2, "0")}
          </span>
          {t(course.title)}
        </h3>

        {course.lessons.length > 0 && (
          <span className="text-sm tabular-nums text-muted">
            {done}/{course.lessons.length}
          </span>
        )}
      </div>

      {course.lessons.length > 0 ? (
        <ul className="mt-3">
          {course.lessons.map((l) => (
            <LessonRow
              key={l.id}
              lesson={l}
              status={(statuses.get(l.id) ?? "not_started") as LessonStatus}
            />
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm text-muted">Lessons coming soon.</p>
      )}
    </Card>
  );
};

export default UnitCard;
