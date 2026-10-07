import { ErrorBlock } from "@/components/shared/PageStatus";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import Select from "@/components/ui/Select";
import { Skeleton } from "@/components/ui/Skeleton";
import { LEVELS } from "@/constants/lavels";
import VocabularyCard from "@/features/vocabulary/components/VocabularyCard";
import { useVocabularyCategories, useVocabularyPage } from "@/features/vocabulary/hooks";
import { plural } from "@/lib/format";
import type { LevelCode } from "@/types/content";
import { X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 12;

const Vocabulary = () => {
  const [params, setParams] = useSearchParams();

  const levelParam = params.get("level") ?? "";
  const levelCode = LEVELS.find((l) => l.code === levelParam)?.code as
    LevelCode | undefined;
  const category = params.get("category") ?? "";
  const page = Math.max(1, parseInt(params.get("page") ?? "1", 10) || 1);

  const categories = useVocabularyCategories();
  const query = useVocabularyPage({
    levelCode,
    category: category || undefined,
    page: page - 1,
    pageSize: PAGE_SIZE,
  });

  function update(changes: Record<string, string>) {
    const next = new URLSearchParams(params);

    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }

    setParams(next, { replace: true });
  }

  const total = query.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Vocabulary</h1>
      <p className="mt-2 max-w-xl text-lg text-muted">
        Every word with its article, plural, IPA, meanings and an example sentence.
      </p>

      <div className="mt-8 grid gap-4 sm:max-w-xl sm:grid-cols-2">
        <Select
          id="level"
          label="Level"
          value={levelCode ?? ""}
          onChange={(e) => update({ level: e.target.value, page: "" })}
        >
          <option value="">All levels</option>
          {LEVELS.map((l) => (
            <option key={l.code} value={l.code}>
              {l.code}
            </option>
          ))}
        </Select>

        <Select
          id="category"
          label="Category"
          value={category}
          onChange={(e) => update({ category: e.target.value, page: "" })}
        >
          <option value="">All categories</option>
          {categories.data?.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </Select>
      </div>

      {query.data && <p className="text-sm text-muted mt-6">{plural(total, "total")}</p>}

      <div
        className={`mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${query.isPlaceholderData ? "opacity-60" : ""}`}
      >
        {query.isPending &&
          Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-64" />)}

        {query.data?.items.map((w) => (
          <VocabularyCard key={w.id} word={w} />
        ))}
      </div>

      {query.data && query.data.items.length === 0 && (
        <div className="mt-8 text-center rounded-2xl border border-border bg-card p-6">
          <p>No words match these filters.</p>
          <Button
            variant="secondary"
            onClick={() => setParams({}, { replace: true })}
            className="mt-4"
          >
            <X size={16} />
            Clear filters
          </Button>
        </div>
      )}

      {query.isError && (
        <ErrorBlock message={query.error.message} onRetry={() => query.refetch()} />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => update({ page: page === 1 ? "" : String(p) })}
      />
    </div>
  );
};

export default Vocabulary;
