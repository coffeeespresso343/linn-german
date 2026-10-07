import { Button } from "@/components/ui/Button";
import type { RecorderStatus } from "./useAudioRecorder";
import { Mic, Square } from "lucide-react";

interface Props {
  status: RecorderStatus;
  onStart: () => void;
  onStop: () => void;
}

const AudioRecorder = ({ status, onStart, onStop }: Props) => {
  if (status === "unsupported") {
    return <p className="text-red text-sm">Recording isn't supported in this browser.</p>;
  }

  return (
    <div>
      {status === "recording" ? (
        <Button onClick={onStop}>
          <Square size={16} /> Stop
        </Button>
      ) : (
        <Button variant="secondary" onClick={onStart}>
          <Mic size={16} /> {status === "recorded" ? "Record again" : "Record yourself"}
        </Button>
      )}

      <p className="mt-2 min-h-5 text-sm text-muted">
        {status === "recording" && "Recording... speak now (15 seconds max)."}
        {status === "denied" &&
          "Microphone access is denied. Allow it in your browser settings, then try again."}
        {status === "error" &&
          "Couldn't start recording. Check your microphone and try again."}
      </p>
    </div>
  );
};

export default AudioRecorder;
