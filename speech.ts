export function speakSpanish(text: string): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  
  // Clean text from markdown asterisks or arrows
  const clean = text
    .replace(/[*_#→]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.lang = 'es-ES';
  utterance.rate = 0.9; // Slightly slower for language learners in 7th grade / 1º ESO
  
  const voices = window.speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es-ES')) || voices.find(v => v.lang.startsWith('es'));
  if (esVoice) utterance.voice = esVoice;
  
  window.speechSynthesis.speak(utterance);
}
