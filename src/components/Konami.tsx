import { useEffect, useRef, useState } from 'react';
import { playSound } from '../hooks/useSound';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const KATAKANA = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789';

const MatrixRain = ({ onClose }: { onClose: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 16;
    let cols = Math.floor(canvas.width / fontSize);
    let drops = Array.from({ length: cols }, () => Math.random() * -50);

    const onResize = () => {
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const grad = Math.random() > 0.97 ? '#fff' : '#00ff41';
        ctx.fillStyle = grad;
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[250] bg-black animate-fade-in">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="font-mono text-xs tracking-[0.4em] uppercase text-green-400/80 mb-3">
          {'> easter egg unlocked'}
        </div>
        <div className="font-display text-3xl md:text-5xl font-bold text-green-300">
          Welcome to the Matrix
        </div>
        <div className="font-mono text-xs text-green-500/60 mt-6">
          esc to exit
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 font-mono text-xs px-3 py-1.5 rounded-full border border-green-500/40 text-green-300 hover:bg-green-500/10 transition-colors pointer-events-auto"
      >
        ESC
      </button>
    </div>
  );
};

const Konami = () => {
  const [active, setActive] = useState(false);
  const buf = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buf.current = [...buf.current, key].slice(-SEQUENCE.length);
      if (
        buf.current.length === SEQUENCE.length &&
        buf.current.every((k, i) => k === SEQUENCE[i])
      ) {
        setActive(true);
        playSound('success');
        document.documentElement.setAttribute('data-theme', 'matrix');
        try {
          localStorage.setItem('theme', 'matrix');
        } catch {
          // ignore quota / storage errors
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!active) return null;
  return <MatrixRain onClose={() => setActive(false)} />;
};

export default Konami;
