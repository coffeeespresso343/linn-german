import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { Check, X } from "lucide-react";
import { useState } from "react";

const OPTIONS = ["der", "die", "das"];
const ANSWER = "der";

const ExercisePreview = () => {
  const [picked, setPicked] = useState<string | null>(null);
  const correct = picked === ANSWER;

  return (
    <Card className="mx-auto max-w-sm">
      <p className="text-sm text-muted">Choose the correct article</p>
      <p className="mt-2 text-2xl font-semibold">--- Tisch ist groß.</p>

      <div className="mt-5 flex gap-2">
        {OPTIONS.map((o) => (
          <Button
            key={o}
            variant="secondary"
            disabled={picked !== null}
            onClick={() => setPicked(o)}
            className={cn(picked === o && "border-fg")}
          >
            {o}
          </Button>
        ))}
      </div>

      <div className="min-h-16 mt-5 text-sm">
        {picked && (
          <p
            className={cn(
              "flex gap-2",
              correct ? "text-success" : "text-red-dark dark:text-red",
            )}
          >
            {correct ? <Check size={18} /> : <X size={18} />}
            <span>
              {correct ? "Correct! " : "Not quite. "}
              <span className="text-fg">Tisch is masculine, so it takes "der"</span>
            </span>
          </p>
        )}
      </div>

      {picked && (
        <Button variant="ghost" onClick={() => setPicked(null)}>
          Try again
        </Button>
      )}
    </Card>
  );
};

export default ExercisePreview;
