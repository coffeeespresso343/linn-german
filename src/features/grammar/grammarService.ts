import { toMultilingual } from "@/lib/multilingual";
import { supabase } from "@/lib/supabase";
import type { GrammarCategory, GrammarTopic, LevelCode } from "@/types/content";
import type { Tables } from "@/types/database";

type Row = Tables<"grammar_topics"> & {
  levels: { code: string };
};

const toTopic = (row: Row): GrammarTopic => ({
  id: row.id,
  slug: row.slug,
  category: row.category as GrammarCategory,
  levelCode: row.levels.code as LevelCode,
  title: toMultilingual(row.title),
  summary: toMultilingual(row.summary),
  explanation: toMultilingual(row.explanation),
  rules: row.rules,
  examples: row.examples,
  commonMistakes: row.common_mistakes,
  order: row.sort_order,
});

export interface GrammarFilters {
  levelCode?: LevelCode;
  category?: GrammarCategory;
}

export async function fetchGrammarTopics(
  filters: GrammarFilters = {},
): Promise<GrammarTopic[]> {
  let query = supabase.from("grammar_topics").select("*, levels!inner(code)");

  if (filters.levelCode) query = query.eq("levels.code", filters.levelCode);

  if (filters.category) query = query.eq("category", filters.category);

  const { data, error } = await query.order("sort_order");

  if (error) throw error;

  return data.map(toTopic);
}

export async function fetchGrammarTopic(slug: string): Promise<GrammarTopic | null> {
  const { data, error } = await supabase
    .from("grammar_topics")
    .select("*, levels!inner(code)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? toTopic(data) : null;
}
