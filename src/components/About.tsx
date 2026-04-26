import { useEffect, useRef, useState } from 'react';
import { Code2, Cpu, Rocket, Trophy } from 'lucide-react';

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  accent: 'cyan' | 'violet' | 'lime' | 'amber';
};

const STATS: Stat[] = [
  { value: 2203, label: 'Max CodeChef Rating', accent: 'amber' },
  { value: 2123, label: 'Peak LeetCode Rating', accent: 'lime' },
  { value: 20, suffix: '+', label: 'Enterprise Apps Integrated', accent: 'violet' },
  { value: 8, label: 'CGPA · NIT Jamshedpur', accent: 'cyan' },
];

const ACCENT: Record<Stat['accent'], string> = {
  cyan: 'text-neon-cyan',
  violet: 'text-neon-violet',
  lime: 'text-neon-lime',
  amber: 'text-amber-300',
};

const Counter = ({ value, suffix }: { value: number; suffix?: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix ?? ''}
    </span>
  );
};

const About = () => {
  const highlights = [
    {
      icon: Rocket,
      title: 'Production SaaS',
      desc: 'Multi-tenant Next.js dashboards with Prisma, PostgreSQL, and 50+ integrations.',
      accent: 'cyan',
    },
    {
      icon: Cpu,
      title: 'AWS Native',
      desc: 'EC2, Lambda, EventBridge, Parameter Store — built and shipped.',
      accent: 'violet',
    },
    {
      icon: Code2,
      title: 'CI/CD Owner',
      desc: 'Custom GitHub Actions pipelines for automated, repeatable deploys.',
      accent: 'lime',
    },
    {
      icon: Trophy,
      title: 'Top 1% CP',
      accent: 'amber',
      desc: 'Codeforces Expert · CodeChef 6★ · LeetCode Guardian. Algorithms in my blood.',
    },
  ] as const;

  return (
    <section
      id="about"
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          {/* LEFT */}
          <div>
            <div className="reveal mb-6">
              <span className="font-mono text-xs tracking-widest uppercase text-neon-cyan">
                // 01 — about
              </span>
            </div>
            <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-8">
              Engineer who <span className="text-gradient">ships</span>,
              <br />
              not just <span className="text-zinc-500 line-through decoration-neon-violet">talks</span>.
            </h2>

            <div className="reveal reveal-delay-2 space-y-5 text-zinc-400 text-lg leading-relaxed">
              <p>
                I build the boring-yet-critical layers no one sees — the API contracts,
                CI pipelines, and access-control logic that quietly hold a SaaS together.
                Right now I'm at <span className="text-white font-semibold">OptyStack</span>{' '}
                shipping a multi-tenant management dashboard with{' '}
                <span className="text-neon-cyan">Next.js App Router</span>,{' '}
                <span className="text-neon-violet">Prisma</span>, and{' '}
                <span className="text-neon-lime">PostgreSQL</span>.
              </p>
              <p>
                Before that, <span className="text-white font-semibold">NetNXT</span>:
                Next.js + Express + MongoDB, where I built a parameter-priced cost calculator
                from scratch. <span className="text-white font-semibold">NIT Jamshedpur</span>{' '}
                gave me the fundamentals; competitive programming gave me the reflexes.
              </p>
              <p className="font-mono text-sm text-zinc-500">
                <span className="text-neon-cyan">{'>'}</span> If it can be automated,
                I'll automate it. If it can be shipped today, why ship it tomorrow?
              </p>
            </div>

            <div className="reveal reveal-delay-3 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="grad-border p-5 hover:-translate-y-1 transition-transform"
                  data-cursor="hover"
                >
                  <div className={`font-display text-3xl md:text-4xl font-bold ${ACCENT[s.accent]}`}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="font-mono text-[10px] tracking-wider uppercase text-zinc-500 mt-2">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className={`reveal reveal-delay-${i + 1} grad-border p-6 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden`}
                data-cursor="hover"
              >
                <div
                  className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity ${h.accent === 'cyan'
                      ? 'bg-neon-cyan'
                      : h.accent === 'violet'
                        ? 'bg-neon-violet'
                        : h.accent === 'lime'
                          ? 'bg-neon-lime'
                          : 'bg-amber-400'
                    }`}
                />
                <div className="relative">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${h.accent === 'cyan'
                        ? 'bg-neon-cyan/10 text-neon-cyan'
                        : h.accent === 'violet'
                          ? 'bg-neon-violet/10 text-neon-violet'
                          : h.accent === 'lime'
                            ? 'bg-neon-lime/10 text-neon-lime'
                            : 'bg-amber-400/10 text-amber-300'
                      }`}
                  >
                    <h.icon size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{h.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
