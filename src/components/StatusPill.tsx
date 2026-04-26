import { useEffect, useState } from 'react';
import { Coffee, Code2, GitCommit, Music } from 'lucide-react';

const LAST_COMMIT_AT = new Date('2026-04-26T08:30:00Z').getTime();

type State = {
  icon: typeof Code2;
  label: string;
  value?: string;
  valueFn?: () => string;
};

const STATES: State[] = [
  {
    icon: Code2,
    label: 'currently building',
    value: 'multi-tenant SaaS @ OptyStack',
  },
  {
    icon: GitCommit,
    label: 'last commit',
    valueFn: () => relTime(LAST_COMMIT_AT),
  },
  {
    icon: Music,
    label: 'on loop',
    value: 'Lo-fi · midnight beats',
  },
  {
    icon: Coffee,
    label: 'fuelled by',
    value: '☕️ × 3',
  },
];

const relTime = (ts: number) => {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m || 1}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

const StatusPill = () => {
  const [idx, setIdx] = useState(0);
  const [, force] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % STATES.length), 3500);
    const t2 = window.setInterval(() => force((n) => n + 1), 60000);
    return () => {
      window.clearInterval(t);
      window.clearInterval(t2);
    };
  }, []);

  const state = STATES[idx];
  const Icon = state.icon;
  const value = state.valueFn ? state.valueFn() : state.value ?? '';

  return (
    <div className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border bg-white/[0.02] backdrop-blur-sm overflow-hidden"
      style={{
        borderColor: 'var(--border-primary)',
      }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
          style={{ background: 'rgb(var(--neon-lime-rgb))' }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ background: 'rgb(var(--neon-lime-rgb))' }}
        />
      </span>
      <Icon size={12} style={{ color: 'rgb(var(--neon-cyan-rgb))' }} />
      <span style={{ color: 'var(--text-muted)' }}>{state.label}</span>
      <span className="text-zinc-300" key={idx + value} style={{ animation: 'fadeIn 0.4s ease-out both', color: 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
};

export default StatusPill;
