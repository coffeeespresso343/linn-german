import Card from "@/components/ui/Card";
import { useLang } from "@/features/profile/langStore";
import { t } from "@/lib/i18n";

const FORMS: [string, string][] = [
  ["ich", "bin"],
  ["du", "bist"],
  ["er / sie /es", "ist"],
  ["wir", "sind"],
  ["ihr", "seid"],
  ["sie / Sie", "sind"],
];

const GrammarPreview = () => {
  const lang = useLang((s) => s.lang);

  return (
    <Card className="mx-auto max-w-md">
      <h3 className="text-xl font-semibold">sein</h3>

      <table className="mt-4 w-full text-left">
        <caption className="sr-only">Present tense of sein</caption>
        <tbody className="divide-y divide-border">
          {FORMS.map(([pronoun, verb]) => (
            <tr key={pronoun}>
              <th scope="row" className="py-2 pr-4 font-normal text-muted">
                {pronoun}
              </th>
              <th className="py-2 font-semibold text-red">{verb}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 rounded-xl bg-surface p-3 text-sm">
        {t(
          {
            de: "sein ist unregelmäßig: Lerne die Formen auswendig.",
            en: "sein is irregular: learn the forms by heart.",
            my: "sein သည် ပုံမမှန်သော ကြိယာဖြစ်သည်။ ပုံစံများကို ကျက်မှတ်ပါ။",
          },
          lang,
        )}
      </p>
    </Card>
  );
};

export default GrammarPreview;
