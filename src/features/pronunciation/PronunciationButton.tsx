import { Button } from "@/components/ui/Button";
import { speak } from "@/lib/speech";
import { Volume2 } from "lucide-react";

const PronunciationButton = ({
  text,
  slow = false,
}: {
  text: string;
  slow?: boolean;
}) => {
  return (
    <Button variant="secondary" onClick={() => speak(text, "de-DE", slow ? 0.6 : 1)}>
      <Volume2 size={16} />
      {slow ? "Slow" : "Listen"}
    </Button>
  );
};

export default PronunciationButton;
