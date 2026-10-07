import { ErrorBlock, NotFoundBlock } from "@/components/shared/PageStatus";
import Card from "@/components/ui/Card";
import { useLang } from "@/features/profile/langStore";
import { useVocabularyWord } from "@/features/vocabulary/hooks";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PronunciationPractice from "../Pronunciation/PronunciationPractice";
import BookmarkButton from "@/features/bookmarks/BookmarkButton";
import { pickTranslation } from "@/lib/i18n";
import ListenIconButton from "@/features/pronunciation/ListenIconButton";
import { Skeleton } from "@/components/ui/Skeleton";

const VocabularyDetailPage = () => {
  const { wordId = "" } = useParams(); // word's slug
  const lang = useLang((s) => s.lang);
  const query = useVocabularyWord(wordId);

  if (query.isPending) {
    return (
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-10 sm:px-6">
        <Skeleton className="h-28" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />
      </div>
    );
  }

  const w = query.data;
  if (!w) {
    return (
      <NotFoundBlock
        title="Word not found"
        backTo="/vocabulary"
        backLabel="Back to vocabulary"
      />
    );
  }

  const spoken = [w.article, w.german].filter(Boolean).join(" ");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/vocabulary"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ChevronLeft size={16} /> Vocabulary
      </Link>

      <header className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-red">
            {w.levelCode} {w.category && <span>. {w.category}</span>}
          </p>
          <h1 className="mt-2 text-5xl font-semibold text-right">
            {w.article && <span>{w.article} </span>}
            {w.german}
          </h1>
          {w.ipa && <p className="mt-2 font-mono text-muted">{w.ipa}</p>}
        </div>
        <BookmarkButton type="vocabulary" id={w.id} label={spoken} />
      </header>

      <Card className="mt-8 space-y-2">
        <p className="text-xl">{w.english}</p>
        {w.myanmar && (
          <p lang="my" className="text-xl text-muted">
            {w.myanmar}
          </p>
        )}
        {w.plural && <p className="pt-2 text-sm to-muted">Plural: {w.plural}</p>}
      </Card>

      {w.examples.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Examples</h2>
          <ul className="mt-3 space-y-3">
            {w.examples.map((e) => {
              const tr = pickTranslation({ en: e.english, my: e.myanmar }, lang);

              return (
                <li key={e.id} className="flex items-start gap-2">
                  <ListenIconButton text={e.german} />
                  <div>
                    <p className="font-medium">{e.german}</p>
                    <p lang={tr.lang} className="text-muted">
                      {tr.text}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <Card className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Practice speaking</h2>
        <PronunciationPractice text={spoken} ipa={w.ipa} audioUrl={w.audioUrl} />
      </Card>

      {w.tags.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">
          {w.tags.map((t) => (
            <li key={t} className="rounded-full border border-border px-3 py-1 text-xs">
              {t}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VocabularyDetailPage;
