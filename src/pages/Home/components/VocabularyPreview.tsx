import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { SAMPLE_WORDS } from "@/constants/sampleWords";
import PronunciationButton from "@/features/pronunciation/PronunciationButton";
import { BookMarked } from "lucide-react";
import { useState } from "react";

const VocabularyPreview = () => {
  const [saved, setSaved] = useState(false);
  const w = SAMPLE_WORDS[0];

  return (
    <Card className="mx-auto max-w-sm">
      <p className="text-3xl font-semibold">
        <span>{w.article}</span> {w.noun}
      </p>
      <p className="mt-1 font-mono text-sm text-muted">{w.ipa}</p>
      <div className="mt-5 space-y-1">
        <p>{w.en}</p>
        <p lang="my" className="text-muted">
          {w.my}
        </p>
      </div>
      <p className="mt-5 rounded-xl bg-surface p-3 text-sm">{w.example}</p>

      <div className="mt-5 flex gap-2">
        <PronunciationButton text={w.example} />
        <Button onClick={() => setSaved(!saved)}>
          <BookMarked size={16} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </Card>
  );
};

export default VocabularyPreview;
