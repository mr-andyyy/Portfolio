import { useEffect, useState } from 'react';

const Loader = () => {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in');

  useEffect(() => {
    if (sessionStorage.getItem('loader-shown') === '1') {
      setPhase('gone');
      return;
    }
    sessionStorage.setItem('loader-shown', '1');
    document.body.style.overflow = 'hidden';
    const t1 = window.setTimeout(() => setPhase('out'), 1700);
    const t2 = window.setTimeout(() => {
      setPhase('gone');
      document.body.style.overflow = '';
    }, 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[300] flex items-center justify-center transition-all duration-700 ${
        phase === 'out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="absolute inset-0 bg-dev-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative flex flex-col items-center gap-6">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-700 ${
            phase === 'out' ? 'scale-150 rotate-12' : 'scale-100'
          }`}
        >
          <defs>
            <linearGradient id="ldr" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(var(--neon-cyan-rgb))" />
              <stop offset="50%" stopColor="rgb(var(--neon-violet-rgb))" />
              <stop offset="100%" stopColor="rgb(var(--neon-lime-rgb))" />
            </linearGradient>
          </defs>
          <rect
            x="6"
            y="6"
            width="108"
            height="108"
            rx="20"
            stroke="url(#ldr)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="432"
            strokeDashoffset="432"
            style={{
              animation: 'drawBox 1.5s cubic-bezier(0.7,0,0.3,1) forwards',
            }}
          />
          <text
            x="60"
            y="78"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
            fontSize="42"
            fontWeight="700"
            fill="url(#ldr)"
            style={{
              opacity: 0,
              animation: 'fadeIn 0.6s ease-out 1s forwards',
            }}
          >
            AK
          </text>
        </svg>

        <div className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: 'var(--text-muted)' }}>
          <span style={{ animation: 'fadeIn 0.5s ease-out 1.3s both' }}>
            initializing &middot; anand.dev
          </span>
        </div>

        <div className="w-32 h-px overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
          <div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, rgb(var(--neon-cyan-rgb)), rgb(var(--neon-violet-rgb)))',
              animation: 'loaderBar 1.6s ease-out forwards',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes drawBox {
          to { stroke-dashoffset: 0; }
        }
        @keyframes loaderBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
