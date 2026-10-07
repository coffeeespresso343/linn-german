export type PronunciationRating = "needs-work" | "close" | "nailed";

/**
 * Plug an AI service in here later: the UI already export it
 */
export interface PronunciationScore {
  overall: number; //0 - 100
  notes?: string;
}

export type PronunciationAnalyzer = (
  audio: Blob,
  targetText: string,
) => Promise<PronunciationScore>;
