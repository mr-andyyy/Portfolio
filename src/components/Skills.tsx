import {
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Server,
  Smartphone,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';

const STACK_TOP = [
  'TypeScript', 'Next.js', 'React', 'Node.js', 'Express',
  'Prisma', 'PostgreSQL', 'MongoDB', 'Tailwind', 'Redux',
  'Python', 'C++', 'Docker', 'GitHub Actions', 'Flutter',
];
const STACK_BOTTOM = [
  'AWS EC2', 'AWS Lambda', 'EventBridge', 'Parameter Store',
  'REST APIs', 'JWT', 'Material UI', 'Ant Design', 'Bootstrap',
  'Vite', 'Git', 'Linux', 'Fastify', 'Drizzle ORM', 'PowerSync',
];

const CATEGORIES = [
  {
    icon: Code,
    title: 'Languages',
    accent: 'cyan',
    items: ['C++', 'TypeScript', 'JavaScript', 'Python', 'Dart', 'HTML/CSS', 'SQL'],
  },
  {
    icon: Layers,
    title: 'Frontend',
    accent: 'violet',
    items: ['Next.js (App Router)', 'React.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI', 'Ant Design'],
  },
  {
    icon: Server,
    title: 'Backend',
    accent: 'lime',
    items: ['Node.js', 'Express.js', 'Fastify', 'Prisma ORM', 'Drizzle ORM', 'REST APIs'],
  },
  {
    icon: Database,
    title: 'Databases',
    accent: 'amber',
    items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Schema Design', 'Migrations', 'PowerSync'],
  },
  {
    icon: Cloud,
    title: 'Cloud / DevOps',
    accent: 'cyan',
    items: ['AWS EC2', 'AWS Lambda', 'EventBridge', 'Parameter Store', 'Docker', 'GitHub Actions CI/CD'],
  },
  {
    icon: Cpu,
    title: 'CS Fundamentals',
    accent: 'violet',
    items: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'System Design'],
  },
  {
    icon: Sparkles,
    title: 'ML / AI',
    accent: 'lime',
    items: ['PyTorch', 'TensorFlow', 'NumPy/Pandas', 'Model Prototyping'],
  },
  {
    icon: Wrench,
    title: 'Tooling',
    accent: 'amber',
    items: ['Git / GitHub', 'VS Code', 'Postman', 'Vite', 'Vercel'],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    accent: 'cyan',
    items: ['Flutter', 'Dart', 'Riverpod', 'PowerSync', 'ESC/POS Printing'],
  },
];

const accentText = (a: string) =>
  a === 'cyan'
    ? 'text-neon-cyan'
    : a === 'violet'
    ? 'text-neon-violet'
    : a === 'lime'
    ? 'text-neon-lime'
    : 'text-neon-amber';

const accentBg = (a: string) =>
  a === 'cyan'
    ? 'bg-neon-cyan/10'
    : a === 'violet'
    ? 'bg-neon-violet/10'
    : a === 'lime'
    ? 'bg-neon-lime/10'
    : 'bg-neon-amber/10';

const accentBlob = (a: string) =>
  a === 'cyan'
    ? 'bg-neon-cyan'
    : a === 'violet'
    ? 'bg-neon-violet'
    : a === 'lime'
    ? 'bg-neon-lime'
    : 'bg-neon-amber';

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative py-32 px-6 lg:px-12 overflow-hidden border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-neon-cyan mb-4">
            // 02 — toolkit
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            The <span className="text-gradient">stack</span> I run on
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            From low-level DSA to cloud-native deploys — a full-spectrum toolkit honed
            through internships, contests, and 3 a.m. debugging sessions.
          </p>
        </div>

        {/* Marquee tech ribbons */}
        <div className="reveal reveal-delay-3 mb-20 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee items={STACK_TOP} reverse={false} accent="cyan" />
          <Marquee items={STACK_BOTTOM} reverse accent="violet" />
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.title}
              className={`reveal reveal-delay-${(i % 4) + 1} grad-border p-6 group hover:-translate-y-1 transition-all relative overflow-hidden`}
              data-cursor="hover"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-15 group-hover:opacity-40 transition-opacity ${accentBlob(cat.accent)}`}
              />
              <div className="relative">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${accentBg(cat.accent)} ${accentText(cat.accent)}`}
                >
                  <cat.icon size={22} />
                </div>
                <h3 className="font-display text-base font-bold mb-3 flex items-center gap-2">
                  <Terminal size={14} className="text-zinc-600" />
                  <span>{cat.title}</span>
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-sm text-zinc-400 group/li hover:text-white transition-colors"
                    >
                      <GitBranch
                        size={11}
                        className={`mr-2 ${accentText(cat.accent)} opacity-60 group-hover/li:opacity-100 transition-opacity`}
                      />
                      <span className="font-mono text-[13px]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Marquee = ({
  items,
  reverse,
  accent,
}: {
  items: string[];
  reverse: boolean;
  accent: 'cyan' | 'violet';
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={reverse ? 'marquee-track-rev' : 'marquee-track'}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex items-center gap-2 font-mono text-base md:text-xl whitespace-nowrap ${
              accent === 'cyan' ? 'text-neon-cyan' : 'text-neon-violet'
            }`}
          >
            <span className="text-zinc-700">●</span>
            <span className="text-zinc-300">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
