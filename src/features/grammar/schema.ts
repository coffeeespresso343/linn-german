import z from "zod";

export const grammarRulesSchema = z.array(
  z.object({ pronoun: z.string(), form: z.string() }),
);

export const grammarExamplesSchema = z.array(
  z.object({ de: z.string(), en: z.string(), my: z.string().optional() }),
);
