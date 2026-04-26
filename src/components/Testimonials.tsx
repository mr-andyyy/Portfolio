import { Quote, Star } from 'lucide-react';

type T = {
  quote: string;
  name: string;
  role: string;
  avatar: string; // initials
  accent: 'cyan' | 'violet' | 'lime' | 'amber';
};

const TESTIMONIALS: T[] = [
  {
    quote:
      "Anand owns problems end-to-end. He shipped our access-management module in half the time we'd budgeted, and the code reviewed itself. Rare combination of speed and care.",
    name: 'Founder & CEO',
    role: 'OptyStack Tech',
    avatar: 'FC',
    accent: 'cyan',
  },
  {
    quote:
      "The kind of engineer you wish you cloned. Picked up our Next.js codebase on day three and was opening clean PRs by week two. Strong DSA reflexes show up in everything he writes.",
    name: 'Co-Founder & CTO',
    role: 'NetNXT Network',
    avatar: 'CC',
    accent: 'violet',
  },
  {
    quote:
      "Beat me on 8 contests in a row before I even noticed his handle. Then he started explaining his solutions on Discord. Now half our CP team is faster because of him.",
    name: 'CP Teammate',
    role: 'NIT Jamshedpur',
    avatar: 'CP',
    accent: 'lime',
  },
  {
    quote:
      "Took a vague brief — 'we need a cost calculator' — and came back with a parameter-driven engine our sales team still uses every day. Reads requirements like a PM, codes like a senior.",
    name: 'Product Lead',
    role: 'NetNXT Network',
    avatar: 'PL',
    accent: 'amber',
  },
];

const accentText = (a: T['accent']) =>
  a === 'cyan'
    ? 'text-neon-cyan'
    : a === 'violet'
      ? 'text-neon-violet'
      : a === 'lime'
        ? 'text-neon-lime'
        : 'text-neon-amber';

const accentBg = (a: T['accent']) =>
  a === 'cyan'
    ? 'bg-neon-cyan/10'
    : a === 'violet'
      ? 'bg-neon-violet/10'
      : a === 'lime'
        ? 'bg-neon-lime/10'
        : 'bg-neon-amber/10';

const accentBorder = (a: T['accent']) =>
  a === 'cyan'
    ? 'border-neon-cyan/30'
    : a === 'violet'
      ? 'border-neon-violet/30'
      : a === 'lime'
        ? 'border-neon-lime/30'
        : 'border-neon-amber/30';

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="reveal font-mono text-xs tracking-widest uppercase text-neon-violet mb-4">
            // 06 — receipts²
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-bold mb-5">
            Don't take my <span className="text-gradient-cv">word</span> for it.
          </h2>
          <p className="reveal reveal-delay-2 text-zinc-400 max-w-2xl mx-auto text-lg">
            What teammates, mentors, and contest rivals have said. (More on
            <a
              href="https://www.linkedin.com/in/anand-kumar-591431211/"
              target="_blank"
              rel="noreferrer"
              className="text-neon-cyan hover:underline ml-1"
            >
              LinkedIn
            </a>
            .)
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className={`reveal reveal-delay-${(i % 4) + 1} grad-border p-7 hover:-translate-y-1 transition-transform relative overflow-hidden group`}
              data-cursor="hover"
            >
              <Quote
                size={64}
                className={`absolute -top-3 -right-3 ${accentText(t.accent)} opacity-10 group-hover:opacity-25 transition-opacity`}
              />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={13}
                    className={accentText(t.accent)}
                    fill="currentColor"
                  />
                ))}
              </div>
              <blockquote
                className="text-zinc-300 leading-relaxed mb-6 relative"
                style={{ color: 'var(--text-secondary)' }}
              >
                <span className={`text-2xl font-display leading-none ${accentText(t.accent)}`}>“</span>
                {t.quote}
                <span className={`text-2xl font-display leading-none ${accentText(t.accent)}`}>”</span>
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${accentBg(t.accent)} ${accentText(t.accent)} ${accentBorder(t.accent)}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {t.name}
                  </div>
                  <div className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
