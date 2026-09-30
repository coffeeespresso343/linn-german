import { useLang } from "@/features/profile/langStore";
import { cn } from "@/lib/cn";
import { LANGS } from "@/lib/i18n";
import type { Lang } from "@/types/content";

const SHORT: Record<Lang, string> = {
  de: "DE",
  en: "EN",
  my: "မြန်",
};

const LanguageSwitcher = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="flex rounded-full border border-border p-0.5 text-xs font-medium">
      {LANGS.map((l) => (
        <button
          key={l}
          lang={l}
          onClick={() => setLang(l)}
          className={cn(
            "rounded-full px-2.5 py-1.5 transition-colors",
            lang === l ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
        >
          {SHORT[l]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
