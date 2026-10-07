import type {
  PronunciationRating,
  PronunciationScore,
} from "@/features/pronunciation/types";
import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

const RATINGS: { id: PronunciationRating; label: string }[] = [
  { id: "needs-work", label: "Needs work" },
  { id: "close", label: "Close" },
  { id: "nailed", label: "Nailed it" },
];

const FEEDBACK: Record<PronunciationRating, string> = {
  "needs-work": "Listen again. then try the Slow version and record once more.",
  close: "Nice. Once more try, then compare again.",
  nailed: "Great work!",
};

interface Props {
  rating: PronunciationRating | null;
  onRate: (rating: PronunciationRating) => void;
  score?: PronunciationScore | null; // set when AI analyzer is connected
}
const PronunciationResult = ({ rating, onRate, score }: Props) => {
  if (score)
    return (
      <p className="rounded-xl bg-surface p-4 text-sm">
        Score: <strong>{score.overall}/100</strong>
        {score.notes && <span> . {score.notes}</span>}
      </p>
    );

  return (
    <fieldset>
      <legend className="text-sm text-muted">
        Compare your recording with the model. How did it sound?
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {RATINGS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onRate(r.id)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-sm duration-200 transition-colors ",
              rating === r.id
                ? "border-fg bg-fg text-bg"
                : "border-border hover:bg-surface active:scale-95",
            )}
          >
            {rating === r.id && <Check size={14} />}
            {r.label}
          </button>
        ))}
      </div>
      {rating && (
        <p role="status" className="mt-2 text-sm text-muted">
          {FEEDBACK[rating]}
        </p>
      )}
    </fieldset>
  );
};

export default PronunciationResult;
