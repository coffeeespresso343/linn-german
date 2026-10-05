import { cn } from "@/lib/cn";
import type { LessonSection } from "@/types/content";

interface Props {
  sections: LessonSection[];
  current: number;
  onSelect: (index: number) => void;
}

const StepIndicator = ({ sections, current, onSelect }: Props) => {
  return (
    <ol className="flex gap-1.5">
      {sections.map((s, i) => (
        <li key={s.id} className="flex-1">
          <button
            type="button"
            onClick={() => onSelect(i)}

            className="group block w-full py-2"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full transition-colors",
                i < current
                  ? "bg-fg"
                  : i === current
                    ? "bg-red"
                    : "bg-surface group-hover:bg-border",
              )}
            />
          </button>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;
