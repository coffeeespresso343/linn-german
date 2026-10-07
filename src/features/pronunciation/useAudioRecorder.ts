import { useEffect, useRef, useState } from "react";

export type RecorderStatus =
  "idle" | "recording" | "recorded" | "denied" | "unsupported" | "error";

const MAX_MS = 15_000;

function pickMimeType() {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
  return types.find((t) => MediaRecorder.isTypeSupported(t));
}

export function useAudioRecorder() {
  const supported =
    typeof window !== "undefined" &&
    typeof MediaRecorder !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia;

  const [status, setStatus] = useState<RecorderStatus>(
    supported ? "idle" : "unsupported",
  );

  const [url, setUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const urlRef = useRef<string | null>(null);

  function clear() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setUrl(null);
    setBlob(null);
  }

  // Release the microphone and memory when the component goes away
  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
      recorderRef.current?.stream.getTracks().forEach((t) => t.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  async function start() {
    if (!supported) return;

    clear();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        window.clearTimeout(timerRef.current);
        recorderRef.current = null;

        const result = new Blob(chunks, { type: recorder.mimeType });
        const objectUrl = URL.createObjectURL(result);

        urlRef.current = objectUrl;
        setBlob(result);
        setUrl(objectUrl);
        setStatus("recorded");
      };

      recorder.start();

      recorderRef.current = recorder;
      setStatus("recording");
      timerRef.current = window.setTimeout(() => {
        if (recorder.state === "recording") recorder.stop();
      }, MAX_MS);
    } catch (err) {
      const blocked =
        err instanceof DOMException &&
        ["NotAllowedError", "SecurityError"].includes(err.name);
      setStatus(blocked ? "denied" : "error");
    }
  }

  function stop() {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }

  function reset() {
    window.clearTimeout(timerRef.current);

    if (recorderRef.current?.state === "recording") {
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    clear();
    setStatus("idle");
  }

  return { status, url, blob, start, stop, reset };
}
