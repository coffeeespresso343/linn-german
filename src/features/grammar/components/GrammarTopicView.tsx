import { useLang } from "@/features/profile/langStore";
import { useT } from "@/hooks/useT";
import type { GrammarTopic } from "@/types/content";
import { grammarExamplesSchema, grammarRulesSchema } from "../schema";
import { pickTranslation } from "@/lib/i18n";
import ListenIconButton from "@/features/pronunciation/ListenIconButton";

const GrammarTopicView = ({ topic }: { topic: GrammarTopic }) => {
  const t = useT();
  const lang = useLang((s) => s.lang);
  const rules = grammarRulesSchema.safeParse(topic.rules);
  const examples = grammarExamplesSchema.safeParse(topic.examples);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">{t(topic.title)}</h3>
      <p className="text-lg leading-relaxed">{t(topic.explanation)}</p>

      {rules.success && rules.data.length > 0 && (
        <table className="w-full max-w-sm text-left">
          <caption className="sr-only">{t(topic.title)} forms</caption>
          <tbody className="divide-y divide-border">
            {rules.data.map((r) => (
              <tr key={r.pronoun}>
                <th scope="row" className="py-2 pr-4 font-normal to-muted">
                  {r.pronoun}
                </th>
                <td className="py-2 font-semibold text-red">{r.form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {examples.success && examples.data.length > 0 && (
        <ul className="space-y-3">
          {examples.data.map((e) => {
            const tr = pickTranslation({ en: e.en, my: e.my }, lang);

            return (
              <li key={e.de} className="flex items-start gap-2">
                <ListenIconButton text={e.de} />
                <div>
                  <p className="font-medium">{e.de}</p>
                  <p lang={tr.lang} className="text-muted">
                    {tr.text}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GrammarTopicView;
