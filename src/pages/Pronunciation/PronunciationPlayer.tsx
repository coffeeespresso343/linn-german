import { Button } from "@/components/ui/Button";
import PronunciationButton from "@/features/pronunciation/PronunciationButton";
import { Play } from "lucide-react";
import { useRef } from "react";

interface Props {
  text: string;
  referenceAudioUrl?: string;
  recordingUrl?: string;
}

const PronunciationPlayer = ({ text, referenceAudioUrl, recordingUrl }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  function playRecording() {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
  }
  return (
    <div className="flex flex-wrap gap-2">
      <PronunciationButton text={text} audioUrl={referenceAudioUrl} />
      <PronunciationButton text={text} audioUrl={referenceAudioUrl} slow />

      {recordingUrl && (
        <>
          <Button variant="secondary" onClick={playRecording}>
            <Play size={16} /> Play yours
          </Button>
          <audio ref={audioRef} src={recordingUrl} preload="auto" />
        </>
      )}
    </div>
  );
};

export default PronunciationPlayer;
