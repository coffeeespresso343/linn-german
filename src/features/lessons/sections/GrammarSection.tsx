import GrammarTopicView from "@/features/grammar/components/GrammarTopicView";
import type { SectionContent } from "./schemas";
import { useGrammarTopic } from "@/features/grammar/hooks";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorBlock } from "@/components/shared/PageStatus";

const GrammarSection = ({ content }: { content: SectionContent<"grammar"> }) => {
  const query = useGrammarTopic(content.topicSlug);

  if (query.isPending) return <Skeleton className="h-48" />;
  if (query.isError)
    return <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />;
  if (!query.data)
    return <p className="text-muted">This grammar topic isn't available.</p>;

  return <GrammarTopicView topic={query.data} />;
};

export default GrammarSection;
