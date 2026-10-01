export function speak(text: string, lang = "de-DE", rate = 1) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  window.speechSynthesis.speak(u);
}
