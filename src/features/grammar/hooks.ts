import { useQuery } from "@tanstack/react-query";
import {
  fetchGrammarTopic,
  fetchGrammarTopics,
  type GrammarFilters,
} from "./grammarService";

export const useGrammarTopics = (filters: GrammarFilters = {}) =>
  useQuery({
    queryKey: ["grammar", "list", filters],
    queryFn: () => fetchGrammarTopics(filters),
  });

export const useGrammarTopic = (slug: string) =>
  useQuery({
    queryKey: ["grammar", slug],
    queryFn: () => fetchGrammarTopic(slug),
  });
