let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (
  type: OscillatorType,
  startFreq: number,
  endFreq: number,
  duration: number,
  vol: number
) => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

    // Extremely soft envelope for soothing sound
    gain.gain.setValueAtTime(0, ctx.currentTime);
    
    // Gentle fade in (smooth attack)
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + Math.min(0.02, duration * 0.2));
    
    // Very smooth, long fade out (soothing release)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore errors (e.g. if AudioContext is blocked by browser auto-play policy before first interaction)
  }
};

// Premium, very soft and soothing ambient hum for hover
export const playHoverSound = () => {
  // Pure sine wave, constant warm frequency (500Hz), very quiet, slightly longer smooth release
  playTone('sine', 500, 500, 0.12, 0.005);
};

// Deeper, gentle confirmation tone for click
export const playClickSound = () => {
  // Pure sine wave, subtle drop (400 -> 350Hz) for physical feel, but soft and deep
  playTone('sine', 400, 350, 0.18, 0.01);
};
