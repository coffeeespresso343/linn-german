// The contract for what section's content JSON must look like (S-13)

import type { SectionType } from "@/types/content";
import { z } from "zod";

const ml = z.object({ de: z.string(), en: z.string(), my: z.string() });
const example = z.object({ de: z.string(), en: z.string(), my: z.string().optional() });

export const sectionSchemas = {
  introduction: z.object({ text: ml, why: ml.optional() }),
  explanation: z.object({ text: ml.optional(), rows: z.array(ml).optional() }),
  examples: z.object({ items: z.array(example) }),
  vocabulary: z.object({ vocabularyIds: z.array(z.string()) }),
  grammar: z.object({ topicSlug: z.string() }),
  pronunciation: z.object({
    items: z.array(
      z.object({ text: z.string(), ipa: z.string().optional(), tip: ml.optional() }),
    ),
  }),

  practice: z.object({ exerciseId: z.string().optional() }),
  completion: z.object({ text: ml.optional() }),
} satisfies Record<SectionType, z.ZodType>;

export type SectionContent<T extends SectionType> = z.infer<(typeof sectionSchemas)[T]>;

export function parseSection<T extends SectionType>(
  type: T,
  content: unknown,
): SectionContent<T> | null {
  const result = (sectionSchemas[type] as z.ZodType).safeParse(content);

  return result.success ? (result.data as SectionContent<T>) : null;
}
