import { useT } from "@/hooks/useT";
import type { SectionContent } from "./schemas";
import { useLang } from "@/features/profile/langStore";
import { langOf } from "@/lib/i18n";
import ListenIconButton from "@/features/pronunciation/ListenIconButton";

const ExplanationSection = ({ content }: { content: SectionContent<"explanation"> }) => {
  const t = useT();
  const lang = useLang((s) => s.lang);

  return (
    <div className="space-y-6">
      {content.text && (
        <p lang={langOf(content.text, lang)} className="text-lg leading-relaxed">
          {t(content.text)}
        </p>
      )}

      {content.rows && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-96 text-left">
            <thead>
              <tr className="border-b border-border text-sm text-muted">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Deutsch
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  English
                </th>
                <th scope="col" className="py-2 font-medium">
                  မြန်မာ
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border">
              {content.rows.map((r, i) => (
                <tr key={`${r.de}-${i}`}>
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center gap-1 font-semibold">
                      {r.de}
                      <ListenIconButton text={r.de} />
                    </span>
                  </td>
                  <td className="py-2 pr-4">{r.en}</td>
                  <td lang="my" className="py-2 text-muted">
                    {r.my || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExplanationSection;
