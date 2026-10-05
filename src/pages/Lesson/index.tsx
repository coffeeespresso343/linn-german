import { ErrorBlock, NotFoundBlock } from "@/components/shared/PageStatus";
import { Skeleton } from "@/components/ui/Skeleton";
import LessonPlayer from "@/features/lessons/components/LessonPlayer";
import { useLesson } from "@/features/lessons/hooks";
import { useParams } from "react-router-dom";

const LessonPage = () => {
  const { lessonId = "" } = useParams(); // lesson slug
  const query = useLesson(lessonId);

  if (query.isPending) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        <Skeleton className="h-16" />
        <Skeleton className="h-80" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />
      </div>
    );
  }

  if (!query.data) {
    return (
      <NotFoundBlock title="Lesson not found" backTo="/learn" backLabel="Browse levels" />
    );
  }

  return <LessonPlayer key={query.data.id} lesson={query.data} />;
};

export default LessonPage;
