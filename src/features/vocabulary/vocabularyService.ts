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
  slug: row.slug,
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

export async function fetchVocabularyPage(
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

export async function fetchVocabularyWord(slug: string): Promise<Vocabulary | null> {
  const { data, error } = await supabase
    .from("vocabulary")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;

  return data ? toVocabulary(data) : null;
}

export async function fetchVocabularyByIds(ids: string[]): Promise<Vocabulary[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase.from("vocabulary").select(SELECT).in("id", ids);

  if (error) throw error;

  const byId = new Map(data.map((r) => [r.id, toVocabulary(r)]));

  return ids.flatMap((id) => byId.get(id) ?? []); // keep lesson's order
}

export async function fetchVocabularyBySlug(slug: string): Promise<Vocabulary | null> {
  const { data, error } = await supabase
    .from("vocabulary")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? toVocabulary(data) : null;
}

export async function fetchVocabularyCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from("vocabulary")
    .select("category")
    .not("category", "is", null);

  if (error) throw error;

  return [...new Set(data.map((r) => r.category as string))].sort();
}
