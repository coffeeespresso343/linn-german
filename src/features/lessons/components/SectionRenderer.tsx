import type { Lesson, LessonSection } from "@/types/content";
import type { ReactNode } from "react";
import { parseSection } from "../sections/schemas";
import IntroductionSection from "../sections/IntroductionSection";
import ExampleSection from "../sections/ExampleSection";
import VocabularySection from "../sections/VocabularySection";
import GrammarSection from "../sections/GrammarSection";
import PronunciationSection from "../sections/PronunciationSection";
import PracticeSection from "../sections/PracticeSection";
import CompletionSection from "../sections/CompletionSection";
import ExplanationSection from "../sections/ExplanationSection";

function show<T>(data: T | null, render: (data: T) => ReactNode) {
  return data ? (
    render(data)
  ) : (
    <p className="text-muted">This section couldn't be displayed.</p>
  );
}

const SectionRenderer = ({
  section,
  lesson,
}: {
  section: LessonSection;
  lesson: Lesson;
}) => {
  const { type, content } = section;

  switch (type) {
    case "introduction":
      return show(parseSection(type, content), (c) => (
        <IntroductionSection content={c} />
      ));

    case "explanation":
      return show(parseSection(type, content), (c) => <ExplanationSection content={c} />);

    case "examples":
      return show(parseSection(type, content), (c) => <ExampleSection content={c} />);

    case "vocabulary":
      return show(parseSection(type, content), (c) => <VocabularySection content={c} />);

    case "grammar":
      return show(parseSection(type, content), (c) => <GrammarSection content={c} />);

    case "pronunciation":
      return show(parseSection(type, content), (c) => (
        <PronunciationSection content={c} />
      ));

    case "practice":
      return show(parseSection(type, content), (c) => <PracticeSection content={c} />);

    case "completion":
      return show(parseSection(type, content), (c) => (
        <CompletionSection content={c} xp={lesson.xpReward} />
      ));
  }
};

export default SectionRenderer;
