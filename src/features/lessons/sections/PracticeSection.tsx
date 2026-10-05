import Card from "@/components/ui/Card";
import { Dumbbell } from "lucide-react";
import type { SectionContent } from "./schemas";

const PracticeSection = ({ content }: { content: SectionContent<"practice"> }) => {
  return (
    <Card className="flex flex-col items-center gap-4">
      {content.exerciseId}
      <Dumbbell size={24} className="text-red" />
      <p className="text-muted">
        Interactive practice for this lesson is coming soon. Continue to finish this
        lesson.
      </p>
    </Card>
  );
};

export default PracticeSection;
