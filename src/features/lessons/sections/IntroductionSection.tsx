import { useT } from "@/hooks/useT";
import type { SectionContent } from "./schemas";
import { useLang } from "@/features/profile/langStore";
import { langOf } from "@/lib/i18n";

const IntroductionSection = ({
  content,
}: {
  content: SectionContent<"introduction">;
}) => {
  const t = useT();
  const lang = useLang((s) => s.lang);

  return (
    <div className="space-y-5">
      <p lang={langOf(content.text, lang)} className="text-xl leading-relaxed">
        {t(content.text)}
      </p>

      {content.why && (
        <div className="rounded-xl bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Why it matters
          </p>
          <p lang={langOf(content.why, lang)} className="mt-1">
            {t(content.why)}
          </p>
        </div>
      )}
    </div>
  );
};

export default IntroductionSection;
