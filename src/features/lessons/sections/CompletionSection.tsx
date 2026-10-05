import { useT } from "@/hooks/useT";
import type { SectionContent } from "./schemas";
import { useLang } from "@/features/profile/langStore";
import { Trophy } from "lucide-react";
import { langOf } from "@/lib/i18n";

const CompletionSection = ({
  content,
  xp,
}: {
  content: SectionContent<"completion">;
  xp: number;
}) => {
  const t = useT();
  const lang = useLang((s) => s.lang);

  return (
    <div className="flex flex-col items-center gap-4 py-6 text-center">
      <Trophy size={40} className="text-success" />
      <p lang={content.text ? langOf(content.text, lang) : "en"} className="text-xl">
        {content.text ? t(content.text) : "Well done! You finished this lesson."}
      </p>
      <p className="font-mono text-sm text-muted">+{xp} XP</p>
    </div>
  );
};

export default CompletionSection;
