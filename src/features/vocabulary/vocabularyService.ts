import { audioPublicUrl } from "@/lib/storage";
import { supabase } from "@/lib/supabase";
import type { Article, LevelCode, Page, Vocabulary } from "@/types/content";
import type { Tables } from "@/types/database";

const SELECT =
  "*, levels!inner(code), audio:audio_files(storage_path), vocabulary_examples(*)";

type Row = Tables<"vocabulary"> & {
  levels: { code: string };
  audio: { storage_path: string } | null;
  vocabulary_examples: Tables<"vocabulary_examples">[];
};

const toVocabulary = (row: Row): Vocabulary => ({
  id: row.id,
  german: row.german,
  article: (row.article as Article | null) ?? undefined,
  plural: row.plural ?? undefined,
  english: row.english,
  myanmar: row.myanmar,
  ipa: row.ipa ?? undefined,
  audioUrl: audioPublicUrl(row.audio?.storage_path) ?? "",
  levelId: row.level_id,
  levelCode: row.levels.code as LevelCode,
  category: row.category ?? undefined,
  tags: row.tags,
  examples: [...row.vocabulary_examples]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((e) => ({ id: e.id, german: e.german, english: e.english, myanmar: e.myanmar })),
});

export interface VocabularyFilters {
  levelCode?: LevelCode;
  category?: string;
  page?: number; // zero-based
  pageSize?: number;
}

export async function fetchVacabularyPage(
  filters: VocabularyFilters = {},
): Promise<Page<Vocabulary>> {
  const { levelCode, category, page = 0, pageSize = 24 } = filters;

  let query = supabase.from("vocabulary").select(SELECT, { count: "exact" });
  if (levelCode) query = query.eq("levels.code", levelCode);
  if (category) query = query.eq("category", category);

  const from = page * pageSize;

  const { data, error, count } = await query
    .order("german")
    .order("id")
    .range(from, from + pageSize - 1);

  if (error) throw error;

  return {
    items: data.map(toVocabulary),
    total: count ?? 0,
  };
}

export async function fetchVocabularyWord(id: string): Promise<Vocabulary | null> {
  const { data, error } = await supabase
    .from("vocabulary")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data ? toVocabulary(data) : null;
}
