import { useVocabularyByIds } from "@/features/vocabulary/hooks";
import type { SectionContent } from "./schemas";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorBlock } from "@/components/shared/PageStatus";
import VocabularyCard from "@/features/vocabulary/components/VocabularyCard";

const VocabularySection = ({ content }: { content: SectionContent<"vocabulary"> }) => {
  const query = useVocabularyByIds(content.vocabularyIds);

  if (query.isPending) return <Skeleton className="h-48" />;
  if (query.isError)
    return <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />;

  if (query.data.length === 0)
    return <p className="text-muted">No words in this sections yet.</p>;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {query.data.map((w) => (
        <VocabularyCard key={w.id} word={w} />
      ))}
    </div>
  );
};

export default VocabularySection;
