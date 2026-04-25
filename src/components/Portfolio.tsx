import { useRef } from 'react';
import {
  ArrowUpRight,
  Calculator,
  Github,
  LayoutDashboard,
  LineChart,
  Newspaper,
  PenSquare,
  Server,
  Smartphone,
} from 'lucide-react';

type Project = {
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Newspaper;
  tags: string[];
  highlights: string[];
  liveUrl?: string;
  codeUrl?: string;
  accent: 'cyan' | 'violet' | 'lime' | 'amber' | 'rose';
  badge?: string;
};

const PROJECTS: Project[] = [
  {
    title: 'SaaS Management Dashboard',
    subtitle: 'OptyStack · Production',
    description:
      'Multi-tenant access-management platform with 20+ enterprise app integrations, custom RBAC, alert workflows and AWS-native backend services.',
    icon: Server,
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS', 'CI/CD'],
    highlights: [
      'Multi-tenant data model on Prisma',
      'Lambda + EventBridge schedulers',
      'GitHub Actions deploy pipeline',
    ],
    accent: 'cyan',
    badge: 'live · in production',
  },
  {
    title: 'Milk & Muse PoS',
    subtitle: 'Multi-tenant Point of Sale ecosystem',
    description:
      'Full-stack PoS system: a Flutter Android app for in-store ops (orders, thermal printing, coupons) synced in real-time with a React management dashboard via PowerSync\'s offline-first architecture.',
    icon: Smartphone,
    tags: ['Flutter', 'Riverpod', 'PowerSync', 'React', 'Fastify', 'Drizzle ORM', 'PostgreSQL'],
    highlights: [
      'Offline-first sync via PowerSync',
      'Bluetooth / USB thermal printing',
      'Multi-store tenant-scoped data',
    ],
    accent: 'rose',
    badge: 'live · multi-platform',
  },
  {
    title: 'CryptoNewz',
    subtitle: 'Real-time crypto portfolio tracker',
    description:
      'Track 100+ coins with live prices, charts and curated crypto news. Built with React, Redux Toolkit, ChartJS and the RapidAPI ecosystem.',
    icon: LineChart,
    tags: ['React', 'Redux Toolkit', 'ChartJS', 'Ant Design', 'RapidAPI'],
    highlights: [
      'Global state with Redux Toolkit',
      'Interactive ChartJS visualizations',
      'Responsive Ant Design UI',
    ],
    liveUrl: 'https://anand-cryptonewz.netlify.app/',
    codeUrl: 'https://github.com/mr-andyyy/CryptoNewz',
    accent: 'violet',
  },
  {
    title: 'Travel Blog',
    subtitle: 'Full-stack blogging platform',
    description:
      'Auth-protected CRUD blog with image uploads, user-specific posts and a clean Material UI surface — Next.js front, Express + Postgres back.',
    icon: PenSquare,
    tags: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Material UI'],
    highlights: [
      'JWT auth & role-aware routes',
      'Image-supported CRUD posts',
      'PostgreSQL-backed persistence',
    ],
    liveUrl: 'https://anand-travel-blog.netlify.app/',
    codeUrl: 'https://github.com/mr-andyyy/travel-blog',
    accent: 'lime',
  },
  {
    title: 'Cost Calculator Engine',
    subtitle: 'NetNXT · Internal tool',
    description:
      'A multi-service pricing calculator with parameter-driven tiers, used by sales for instant client quotes — eliminated manual spreadsheet math.',
    icon: Calculator,
    tags: ['Next.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Parameter-based pricing engine',
      'Service-tier configuration UI',
      'Reusable rate-card schema',
    ],
    accent: 'amber',
  },
];

const accentText = (a: Project['accent']) =>
  a === 'cyan'
    ? 'text-neon-cyan'
    : a === 'violet'
    ? 'text-neon-violet'
    : a === 'lime'
    ? 'text-neon-lime'
    : a === 'rose'
    ? 'text-rose-400'
    : 'text-amber-300';

const accentBlob = (a: Project['accent']) =>
  a === 'cyan'
    ? 'bg-neon-cyan'
    : a === 'violet'
    ? 'bg-neon-violet'
    : a === 'lime'
    ? 'bg-neon-lime'
    : a === 'rose'
    ? 'bg-rose-400'
    : 'bg-amber-400';

const accentBorder = (a: Project['accent']) =>
  a === 'cyan'
    ? 'border-neon-cyan/30'
    : a === 'violet'
    ? 'border-neon-violet/30'
    : a === 'lime'
    ? 'border-neon-lime/30'
    : a === 'rose'
    ? 'border-rose-400/30'
    : 'border-amber-400/30';

const TiltCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${(-y * 8).toFixed(
      2
    )}deg) rotateY(${(x * 10).toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1100px) rotateX(0) rotateY(0) translateY(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`reveal reveal-delay-${(index % 4) + 1} tilt grad-border relative overflow-hidden group`}
      style={{
        background:
          'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.06), transparent 40%), var(--bg-card)',
      }}
    >
      <div
        className={`absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity ${accentBlob(
          project.accent
        )}`}
      />
      <div className="relative p-7">
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border ${accentBorder(
              project.accent
            )} ${accentText(project.accent)}`}
          >
            <project.icon size={22} />
          </div>
          {project.badge && (
            <span
              className={`font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${accentBorder(
                project.accent
              )} ${accentText(project.accent)} bg-white/5`}
            >
              {project.badge}
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl font-bold mb-1">{project.title}</h3>
        <p className={`text-sm font-mono mb-4 ${accentText(project.accent)}`}>
          {project.subtitle}
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <ul className="space-y-1.5 mb-6">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-center gap-2 text-[13px] text-zinc-400"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${accentBlob(project.accent)}`}
              />
              <span className="font-mono">{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[11px] px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentText(
                project.accent
              )} hover:opacity-80 transition-opacity`}
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <section
      id="portfolio"
      className="relative py-32 px-6 lg:px-12 border-y border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-neon-lime mb-4">
            // 04 — selected work
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            Things I've <span className="text-gradient-lv">built</span>.
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            Production SaaS, side-project obsessions and internal tools. Hover any card.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <TiltCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
