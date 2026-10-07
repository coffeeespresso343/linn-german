import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchVocabularyByIds,
  fetchVocabularyBySlug,
  fetchVocabularyCategories,
  fetchVocabularyPage,
  type VocabularyFilters,
} from "./vocabularyService";

export const useVocabularyPage = (filters: VocabularyFilters = {}) =>
  useQuery({
    queryKey: ["vocabulary", "page", filters],
    queryFn: () => fetchVocabularyPage(filters),
    placeholderData: keepPreviousData, // no flicker when paging
  });

export const useVocabularyWord = (slug: string) =>
  useQuery({
    queryKey: ["vocabulary", "word", slug],
    queryFn: () => fetchVocabularyBySlug(slug),
  });

export const useVocabularyCategories = () =>
  useQuery({ queryKey: ["vocabulary", "category"], queryFn: fetchVocabularyCategories });

export const useVocabularyByIds = (ids: string[]) =>
  useQuery({
    queryKey: ["vocabulary", "ids", ids],
    queryFn: () => fetchVocabularyByIds(ids),
  });
