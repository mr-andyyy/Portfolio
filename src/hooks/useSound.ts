import { useEffect, useRef } from 'react';

type SoundKey = 'click' | 'hover' | 'whoosh' | 'success';

let audioCtx: AudioContext | null = null;
let enabled = false;

const ensureCtx = () => {
  if (!audioCtx && typeof window !== 'undefined') {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AC();
  }
  return audioCtx;
};

const synth = (
  type: OscillatorType,
  freq: number,
  duration: number,
  gain = 0.04,
  freq2?: number
) => {
  const ctx = ensureCtx();
  if (!ctx || !enabled) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  if (freq2 !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(
      Math.max(freq2, 1),
      ctx.currentTime + duration
    );
  }
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
};

export const playSound = (key: SoundKey) => {
  switch (key) {
    case 'click':
      synth('square', 880, 0.05, 0.03);
      break;
    case 'hover':
      synth('sine', 1320, 0.04, 0.015);
      break;
    case 'whoosh':
      synth('sawtooth', 220, 0.18, 0.04, 80);
      break;
    case 'success':
      synth('triangle', 660, 0.08, 0.05);
      setTimeout(() => synth('triangle', 990, 0.1, 0.05), 70);
      break;
  }
};

export const setSoundEnabled = (v: boolean) => {
  enabled = v;
  if (typeof window !== 'undefined') {
    localStorage.setItem('sound', v ? '1' : '0');
  }
};

export const getSoundEnabled = () => enabled;

export const useSoundInit = () => {
  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    enabled = typeof window !== 'undefined' && localStorage.getItem('sound') === '1';

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('button, a, [data-cursor="hover"]')) playSound('click');
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
};
