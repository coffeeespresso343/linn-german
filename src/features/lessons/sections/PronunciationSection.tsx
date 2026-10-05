import { useT } from "@/hooks/useT";
import type { SectionContent } from "./schemas";
import { useLang } from "@/features/profile/langStore";
import Card from "@/components/ui/Card";
import PronunciationButton from "@/features/pronunciation/PronunciationButton";
import { langOf } from "@/lib/i18n";

const PronunciationSection = ({
  content,
}: {
  content: SectionContent<"pronunciation">;
}) => {
  const t = useT();
  const lang = useLang((s) => s.lang);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {content.items.map((item) => (
        <Card key={item.text}>
          <p className="text-2xl font-semibold">{item.text}</p>
          {item.ipa && <p className="mt-1 font-mono text-sm text-muted">{item.ipa}</p>}

          {item.tip && (
            <p lang={langOf(item.tip, lang)} className="text-sm mt-3">
              {t(item.tip)}
            </p>
          )}

          <div className="mt-4 flex gap-2">
            <PronunciationButton text={item.text} />
            <PronunciationButton text={item.text} slow />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PronunciationSection;
