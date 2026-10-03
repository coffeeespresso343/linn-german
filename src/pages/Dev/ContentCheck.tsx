import { useGrammarTopic } from "@/features/grammar/hooks";
import { useLesson, useLevel, useLevels } from "@/features/lessons/hooks";
import { useVocabularyPage } from "@/features/vocabulary/hooks";
import { useT } from "@/hooks/useT";

const Status = ({ q }: { q: { isPending: boolean; error: Error | null } }) => {
  if (q.isPending) return <p className="text-muted">Loading...</p>;
  if (q.error) return <p className="text-red">{q.error.message}</p>;

  return <p className="text-emerald-500">Status: GOOD</p>;
};

const ContentCheck = () => {
  const t = useT();
  const levels = useLevels();
  const a1 = useLevel("a1");
  const lesson = useLesson("personal-pronouns");
  const vocab = useVocabularyPage({ levelCode: "A1" });
  const topic = useGrammarTopic("sein");

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-6 py-12 divide-y divide-border">
      <h1 className="text-3xl font-semibold">Content Check (dev only)</h1>

      <section>
        <h2 className="font-semibold">Levels</h2>
        <Status q={levels} />

        <ul>
          {levels.data?.map((l) => (
            <li key={l.id}>
              {l.code} - {t(l.name)} - {l.lessonCount} lessons {l.vocabularyCount} words
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">A1 Units</h2>
        <Status q={a1} />

        <ol className="list-decimal pl-6">
          {a1.data?.courses.map((c) => (
            <li key={c.id}>
              {t(c.title)} ({c.lessons.length} lessons)
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-semibold">Lesson</h2>
        <Status q={lesson} />

        {lesson.data && (
          <p>
            {t(lesson.data.title)} : {lesson.data.sections.map((s) => s.type).join(", ")}
          </p>
        )}
      </section>

      <section>
        <h2 className="font-semibold">Vocabulary ({vocab.data?.total}) total </h2>
        <Status q={vocab} />

        <ul className="list-decimal pl-6">
          {vocab.data?.items.map((v) => (
            <li key={v.id}>
              {v.article} {v.german} {v.ipa} - {v.english} -{" "}
              <span lang="my">{v.myanmar}</span> <br /> {v.examples[0]?.german}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Grammar</h2>
        <Status q={topic} />

        {topic.data && (
          <p>
            {t(topic.data.title)} : {t(topic.data.explanation)}
          </p>
        )}
      </section>
    </div>
  );
};

export default ContentCheck;
