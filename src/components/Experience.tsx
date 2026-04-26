import { Briefcase, Calendar, GraduationCap, MapPin, Sparkles } from 'lucide-react';

type Exp = {
  title: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
  accent: 'cyan' | 'violet' | 'lime';
};

const EXPERIENCES: Exp[] = [
  {
    title: 'Software Developer',
    company: 'OptyStack Tech Pvt Ltd',
    location: 'Gurugram, Haryana',
    period: 'Aug 2025 — Present',
    current: true,
    bullets: [
      'Building a multi-tenant SaaS Management Dashboard on Next.js App Router with Prisma + PostgreSQL.',
      'Integrated 50+ enterprise apps for unified user/access management with alerts and reporting.',
      'Architected AWS backend services across EC2, Lambda, EventBridge, and Parameter Store.',
      'Owned a custom GitHub Actions CI/CD pipeline for repeatable, automated deploys.',
    ],
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS', 'GitHub Actions'],
    accent: 'cyan',
  },
  {
    title: 'Software Development Engineer',
    company: 'NetNXT Network',
    location: 'Gurugram, Haryana',
    period: 'Mar 2025 — Jul 2025',
    bullets: [
      'Shipped frontend features and REST integrations on the company website using Next.js + Express + MongoDB.',
      'Built a parameter-based cost calculator tool supporting multiple service tiers.',
      'Crafted dynamic, interactive UI components with smooth data fetching and state.',
    ],
    stack: ['Next.js', 'Express.js', 'MongoDB', 'REST APIs'],
    accent: 'violet',
  },
];

const dotColor = (a: Exp['accent']) =>
  a === 'cyan' ? 'bg-neon-cyan' : a === 'violet' ? 'bg-neon-violet' : 'bg-neon-lime';
const ringColor = (a: Exp['accent']) =>
  a === 'cyan' ? 'ring-glow-cyan' : a === 'violet' ? 'ring-glow-violet' : 'ring-glow-lime';
const tagBg = (a: Exp['accent']) =>
  a === 'cyan'
    ? 'border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5'
    : a === 'violet'
      ? 'border-neon-violet/30 text-neon-violet bg-neon-violet/5'
      : 'border-neon-lime/30 text-neon-lime bg-neon-lime/5';

const Experience = () => {
  return (
    <section id="experience" className="relative py-32 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-neon-violet mb-4">
            // 03 — trajectory
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            Where I've <span className="text-gradient-cv">shipped code</span>
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            From building production SaaS to crafting calculators users actually want to
            use — every role left a footprint in the codebase.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/40 via-neon-violet/40 to-neon-lime/40 md:-translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={exp.company}
                  className={`reveal reveal-delay-${(i % 4) + 1} relative md:grid md:grid-cols-2 md:gap-12 ${left ? '' : 'md:[&>div:first-child]:order-2'
                    }`}
                >
                  {/* node */}
                  <div
                    className={`absolute left-3 md:left-1/2 top-7 -translate-x-1/2 w-4 h-4 rounded-full ${dotColor(
                      exp.accent
                    )} ${ringColor(exp.accent)}`}
                  >
                    {exp.current && (
                      <span
                        className={`absolute inset-0 rounded-full ${dotColor(
                          exp.accent
                        )} animate-ping opacity-75`}
                      />
                    )}
                  </div>

                  {/* card */}
                  <div className={`pl-10 md:pl-0 ${left ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div
                      className="grad-border p-7 hover:-translate-y-1 transition-transform group"
                      data-cursor="hover"
                    >
                      <div className="flex items-center gap-2 mb-3 font-mono text-xs">
                        <Calendar size={13} className="text-zinc-500" />
                        <span className="text-zinc-400">{exp.period}</span>
                        {exp.current && (
                          <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                            now
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-gradient transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mb-5">
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={13} className="text-neon-cyan" />
                          <span className="font-medium text-white">{exp.company}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-zinc-500" />
                          {exp.location}
                        </span>
                      </div>

                      <ul className="space-y-2.5 mb-5">
                        {exp.bullets.map((b, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-zinc-300 leading-relaxed"
                          >
                            <Sparkles
                              size={13}
                              className={`mt-1 flex-shrink-0 ${exp.accent === 'cyan'
                                  ? 'text-neon-cyan'
                                  : exp.accent === 'violet'
                                    ? 'text-neon-violet'
                                    : 'text-neon-lime'
                                }`}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            className={`font-mono text-[11px] px-2.5 py-1 rounded-full border ${tagBg(
                              exp.accent
                            )}`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* spacer for alternation */}
                  <div className="hidden md:block" />
                </div>
              );
            })}

            {/* Education node */}
            <div className="reveal relative md:grid md:grid-cols-2 md:gap-12">
              <div className="absolute left-3 md:left-1/2 top-7 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-lime ring-glow-lime" />
              <div className="pl-10 md:pl-0 md:pr-12">
                <div className="grad-border p-7" data-cursor="hover">
                  <div className="flex items-center gap-2 mb-3 font-mono text-xs">
                    <Calendar size={13} className="text-zinc-500" />
                    <span className="text-zinc-400">2020 — May 2024</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-1">
                    B.Tech, Electronics &amp; Communication
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mb-4">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-neon-lime" />
                      <span className="font-medium text-white">
                        National Institute of Technology, Jamshedpur
                      </span>
                    </span>
                  </div>
                  <ul className="text-sm text-zinc-300 space-y-1 mt-1">
                    <li>CGPA <span className="font-mono text-neon-lime">8.0</span></li>
                    <li>Member of the Competitive Programming Team at SECE</li>
                    <li>NSS Event Management Lead</li>
                  </ul>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
