import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  fetchVacabularyPage,
  fetchVocabularyWord,
  type VocabularyFilters,
} from "./vocabularyService";

export const useVocabularyPage = (filters: VocabularyFilters = {}) =>
  useQuery({
    queryKey: ["vocabulary", "page", filters],
    queryFn: () => fetchVacabularyPage(filters),
    placeholderData: keepPreviousData, // no flicker when paging
  });

export const useVocabularyWord = (id: string) =>
  useQuery({
    queryKey: ["vocabulary", id],
    queryFn: () => fetchVocabularyWord(id),
  });
