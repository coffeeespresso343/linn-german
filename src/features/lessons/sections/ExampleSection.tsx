import { useLang } from "@/features/profile/langStore";
import type { SectionContent } from "./schemas";
import { pickTranslation } from "@/lib/i18n";
import Card from "@/components/ui/Card";
import ListenIconButton from "@/features/pronunciation/ListenIconButton";

const ExampleSection = ({ content }: { content: SectionContent<"examples"> }) => {
  const lang = useLang((s) => s.lang);

  return (
    <ul className="space-y-3">
      {content.items.map((item) => {
        const tr = pickTranslation(item, lang);

        return (
          <li key={item.de}>
            <Card className="flex items-start gap-3 p-4!">
              <ListenIconButton text={item.de} />
              <div>
                <p className="text-lg font-medium">{item.de}</p>
                <p lang={tr.lang} className="text-muted">
                  {tr.text}
                </p>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

export default ExampleSection;
