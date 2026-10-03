import type { MultilingualText } from "@/types/content";
import type { Json } from "@/types/database";

/**
 * Safely turns database JSON to MultilingualText
 * @param value (Json)
 */
export function toMultilingual(value: Json | undefined): MultilingualText {
  const object =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, Json | undefined>)
      : {};

  const pick = (key: string) =>
    typeof object[key] === "string" ? (object[key] as string) : "";

  return { de: pick("de"), en: pick("en"), my: pick("my") };
}
