import { Button } from "@/components/ui/Button";
import { speakOrPlay } from "@/lib/speech";
import { Volume2 } from "lucide-react";

interface Props {
  text: string;
  slow?: boolean;
  audioUrl?: string;
}

const PronunciationButton = ({ text, slow = false, audioUrl }: Props) => {
  return (
    <Button
      variant="secondary"
      onClick={() => speakOrPlay(text, audioUrl, slow)}
      aria-label={`${slow ? "Listen slowly" : "Listen"}: ${text}`}
    >
      <Volume2 size={16} />
      {slow ? "Slow" : "Listen"}
    </Button>
  );
};

export default PronunciationButton;
