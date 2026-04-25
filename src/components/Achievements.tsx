import { ArrowUpRight, Award, Code2, Crown, Medal, Star, Trophy } from 'lucide-react';

type Platform = {
  name: string;
  rank: string;
  rating: string;
  highlight: string;
  detail: string;
  badge: string;
  badgeIcon: typeof Trophy;
  accent: 'cyan' | 'violet' | 'lime' | 'amber';
  url?: string;
};

const PLATFORMS: Platform[] = [
  {
    name: 'CodeChef',
    rank: '6★',
    rating: '2203',
    highlight: 'Global Rank 19',
    detail: 'Starters 160 (Div 1)',
    badge: '6-Star Coder',
    badgeIcon: Crown,
    accent: 'amber',
    url: 'https://www.codechef.com/users/dedh00ma',
  },
  {
    name: 'LeetCode',
    rank: 'Guardian',
    rating: '2123',
    highlight: 'Global #228',
    detail: 'India Rank 23 · Weekly 354',
    badge: 'Guardian',
    badgeIcon: Trophy,
    accent: 'lime',
    url: 'https://leetcode.com/u/dedhooma/',
  },
  {
    name: 'Codeforces',
    rank: 'Expert',
    rating: '1620',
    highlight: 'Global Rank 69',
    detail: 'Round 981 (Div 3)',
    badge: 'Expert',
    badgeIcon: Star,
    accent: 'cyan',
    url: 'https://codeforces.com/profile/dedhooma.xd',
  },
  {
    name: 'GeeksforGeeks',
    rank: 'Inst. Rank 30',
    rating: '2833',
    highlight: 'Global Rank #7',
    detail: 'Weekly Contest 113 · Gold Medal',
    badge: 'Gold Medal',
    badgeIcon: Medal,
    accent: 'violet',
    url: 'https://www.geeksforgeeks.org/profile/anandkumar4549',
  },
];

const accentText = (a: Platform['accent']) =>
  a === 'cyan'
    ? 'text-neon-cyan'
    : a === 'violet'
    ? 'text-neon-violet'
    : a === 'lime'
    ? 'text-neon-lime'
    : 'text-amber-300';

const accentBorder = (a: Platform['accent']) =>
  a === 'cyan'
    ? 'border-neon-cyan/30'
    : a === 'violet'
    ? 'border-neon-violet/30'
    : a === 'lime'
    ? 'border-neon-lime/30'
    : 'border-amber-400/30';

const accentBlob = (a: Platform['accent']) =>
  a === 'cyan'
    ? 'bg-neon-cyan'
    : a === 'violet'
    ? 'bg-neon-violet'
    : a === 'lime'
    ? 'bg-neon-lime'
    : 'bg-amber-400';

const RIBBON = [
  'CodeChef 6★',
  'LeetCode Guardian',
  'Codeforces Expert',
  'GfG Global #7',
  'NIT Jamshedpur',
  'NSS Event Lead',
  'TEDx Volunteer',
  'CP Team @ SECE',
];

const Achievements = () => {
  return (
    <section id="achievements" className="relative py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-amber-300 mb-4">
            // 05 — receipts
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            Algorithms are my <span className="text-gradient">cardio</span>.
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            Years of late-night contests sharpened the reflexes I now use to debug
            production at speed. Here's the receipt.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {PLATFORMS.map((p, i) => (
            <a
              key={p.name}
              href={p.url || '#'}
              target={p.url ? '_blank' : undefined}
              rel="noreferrer"
              className={`reveal reveal-delay-${(i % 4) + 1} grad-border relative overflow-hidden group hover:-translate-y-2 transition-all block`}
              data-cursor="hover"
            >
              <div
                className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity ${accentBlob(p.accent)}`}
              />
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    {p.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {p.url && (
                      <ArrowUpRight
                        size={14}
                        className="text-zinc-600 group-hover:text-white transition-colors"
                      />
                    )}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center border ${accentBorder(p.accent)} ${accentText(p.accent)} bg-white/5`}
                    >
                      <p.badgeIcon size={16} />
                    </div>
                  </div>
                </div>

                <div className={`font-display text-5xl font-bold mb-1 ${accentText(p.accent)}`}>
                  {p.rating}
                </div>
                <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider mb-5">
                  rating · {p.rank}
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className={`text-sm font-semibold mb-1 ${accentText(p.accent)}`}>
                    {p.highlight}
                  </div>
                  <div className="text-xs text-zinc-500">{p.detail}</div>
                </div>

                <div className={`mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border ${accentBorder(p.accent)} ${accentText(p.accent)}`}>
                  <Award size={11} />
                  {p.badge}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Achievement ribbon */}
        <div className="reveal reveal-delay-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mb-16">
          <div className="marquee-track">
            {[...RIBBON, ...RIBBON].map((r, i) => (
              <span
                key={`${r}-${i}`}
                className="flex items-center gap-3 font-mono text-base md:text-lg text-zinc-300 whitespace-nowrap"
              >
                <Code2 size={16} className="text-neon-cyan" />
                <span>{r}</span>
                <span className="text-zinc-700">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Beyond code */}
        <div className="reveal grad-border p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-neon-violet blur-3xl opacity-15" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-neon-cyan blur-3xl opacity-15" />
          <div className="relative grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-2">Beyond the editor</h3>
              <p className="text-sm text-zinc-400">
                Engineering is a team sport — here's how I show up for mine.
              </p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
              <Pill icon={Trophy} title="NSS — Event Lead" sub="Blood drives, mega health camp" accent="cyan" />
              <Pill icon={Star} title="TEDx Bistupur" sub="Volunteer crew" accent="violet" />
              <Pill icon={Medal} title="CP Team · SECE" sub="NIT Jamshedpur" accent="lime" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pill = ({
  icon: Icon,
  title,
  sub,
  accent,
}: {
  icon: typeof Trophy;
  title: string;
  sub: string;
  accent: 'cyan' | 'violet' | 'lime';
}) => (
  <div className="rounded-xl bg-white/5 border border-white/10 p-4 hover:border-white/20 transition-colors">
    <Icon size={18} className={accentText(accent)} />
    <div className="font-display text-sm font-semibold mt-3">{title}</div>
    <div className="font-mono text-[11px] text-zinc-500 mt-0.5">{sub}</div>
  </div>
);

export default Achievements;
