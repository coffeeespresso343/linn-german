export function speak(text: string, lang = "de-DE", rate = 1) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

let current: HTMLAudioElement | null = null;

export function playAudio(url: string, rate = 1) {
  current?.pause();
  current = new Audio(url);
  current.playbackRate = rate;
  current.play().catch(() => {});
}

export function speakOrPlay(text: string, audioUrl?: string, slow = false) {
  if (audioUrl) playAudio(audioUrl, slow ? 0.7 : 1);
  else speak(text, "de-DE", slow ? 0.6 : 1);
}
