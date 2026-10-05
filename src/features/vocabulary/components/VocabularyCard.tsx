import Card from "@/components/ui/Card";
import PronunciationButton from "@/features/pronunciation/PronunciationButton";
import type { Vocabulary } from "@/types/content";

const VocabularyCard = ({ word }: { word: Vocabulary }) => {
  const spoken = [word.article, word.german].filter(Boolean).join(" ");
  return (
    <Card className="flex flex-col">
      <p className="text-2xl font-semibold">
        {word.article && <span className="text-red">{word.article}</span>} {word.german}
      </p>
      {word.ipa && <p className="font-mono text-sm text-muted mt-1">{word.ipa}</p>}
      <p className="mt-4">{word.english}</p>
      {word.myanmar && (
        <p lang="my" className="text-muted">
          {word.myanmar}
        </p>
      )}
      {word.plural && <p className="mt-2 text-sm text-muted">Plural: {word.plural}</p>}
      {word.examples[0] && (
        <p className="mt-4 rounded-xl bg-surface p-3 text-sm">
          {word.examples[0].german}
        </p>
      )}

      <div className="mt-auto pt-4">
        <PronunciationButton text={spoken} />
      </div>
    </Card>
  );
};

export default VocabularyCard;
