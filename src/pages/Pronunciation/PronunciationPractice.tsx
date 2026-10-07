import AudioRecorder from "@/features/pronunciation/AudioRecorder";
import type {
  PronunciationAnalyzer,
  PronunciationRating,
  PronunciationScore,
} from "@/features/pronunciation/types";
import { useAudioRecorder } from "@/features/pronunciation/useAudioRecorder";
import { useEffect, useState } from "react";
import PronunciationPlayer from "./PronunciationPlayer";
import PronunciationResult from "./PronunciationResult";

interface Props {
  text: string;
  ipa?: string;
  audioUrl?: string;
  analyze?: PronunciationAnalyzer; // AI Feat later
}

const PronunciationPractice = ({ text, ipa, audioUrl, analyze }: Props) => {
  const recorder = useAudioRecorder();
  //   console.log("RECORDER_URL: ", recorder.url);
  const { blob } = recorder;

  const [rated, setRated] = useState<{ blob: Blob; rating: PronunciationRating } | null>(
    null,
  );

  const [scored, setScored] = useState<{ blob: Blob; score: PronunciationScore } | null>(
    null,
  );
  const rating = rated && rated.blob === blob ? rated.rating : null;
  const score = scored && scored.blob === blob ? scored.score : null;

  useEffect(() => {
    if (!blob || !analyze) return;

    let cancelled = false;
    analyze(blob, text)
      .then((s) => !cancelled && setScored({ blob, score: s }))
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [blob, analyze, text]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-2xl font-semibold">{text}</p>
        {ipa && <p className="mt-1 font-mono text-sm text-muted">{ipa}</p>}
      </div>

      <PronunciationPlayer
        text={text}
        referenceAudioUrl={audioUrl}
        recordingUrl={recorder.url ?? undefined}
      />
      <AudioRecorder
        status={recorder.status}
        onStart={recorder.start}
        onStop={recorder.stop}
      />

      {recorder.status === "recorded" && blob && (
        <PronunciationResult
          rating={rating}
          onRate={(r) => setRated({ blob, rating: r })}
          score={score}
        />
      )}

      <p className="text-xs text-muted">
        Recordings stay on your device and are never uploaded.
      </p>
    </div>
  );
};

export default PronunciationPractice;
