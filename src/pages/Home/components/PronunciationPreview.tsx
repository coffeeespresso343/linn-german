import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PronunciationButton from "@/features/pronunciation/PronunciationButton";
import { Mic } from "lucide-react";

const TOPICS = ["Ä Ö Ü", "ß", "CH", "SCH", "SP / ST", "R", "Word stress"];

const PronunciationPreview = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <p className="text-3xl font-semibold">sprechen</p>
      <p className="mt-1 font-mono text-sm text-muted">/ˈʃprɛçn̩/</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <PronunciationButton text="sprechen" />
        <PronunciationButton text="sprechen" slow />
        <Button variant="ghost" title="Recording is coming soon">
          <Mic size={16} /> Record yourself
        </Button>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {TOPICS.map((t) => (
          <li key={t} className="rounded-full border border-border px-3 py-1 text-xs">
            {t}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default PronunciationPreview;
