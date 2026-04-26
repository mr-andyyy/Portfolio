import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const ROLES = [
  'Software Developer',
  'Full-Stack Engineer',
  'Competitive Programmer',
  'Next.js · AWS · PostgreSQL',
];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState<'typing' | 'pause' | 'deleting'>('typing');

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout: number;
    if (phase === 'typing') {
      if (typed.length < target.length) {
        timeout = window.setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 55);
      } else {
        timeout = window.setTimeout(() => setPhase('pause'), 1400);
      }
    } else if (phase === 'pause') {
      timeout = window.setTimeout(() => setPhase('deleting'), 200);
    } else {
      if (typed.length > 0) {
        timeout = window.setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 30);
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length);
        setPhase('typing');
      }
    }
    return () => window.clearTimeout(timeout);
  }, [typed, phase, roleIdx]);

  const scrollTo = (sel: string) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 pb-24 lg:pb-16 overflow-hidden"
    >
      {/* grid backdrop */}
      <div className="absolute inset-0 bg-dev-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-radial-fade" />

      {/* floating orbs */}
      <div className="absolute top-24 left-12 hidden lg:block animate-float">
        <div className="font-mono text-xs px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan">
          {'<engineer/>'}
        </div>
      </div>
      <div className="absolute bottom-44 right-16 hidden lg:block animate-float-slow">
        <div className="font-mono text-xs px-3 py-1 rounded-full border border-neon-violet/30 bg-neon-violet/5 text-neon-violet">
          $ rating: 2203
        </div>
      </div>
      <div className="absolute top-44 right-24 hidden lg:block animate-float">
        <div className="font-mono text-xs px-3 py-1 rounded-full border border-neon-lime/30 bg-neon-lime/5 text-neon-lime">
          // build, ship, repeat
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        {/* LEFT: name + role */}
        <div>
          <div className="overflow-hidden mb-5">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-neon-cyan border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1.5 rounded-full animate-slide-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
              </span>
              available for opportunities
            </div>
          </div>

          <div className="overflow-hidden">
            <h1
              data-text="Anand Kumar"
              className="glitch font-display text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tight leading-[0.9] mb-3 animate-slide-up"
            >
              Anand Kumar
            </h1>
          </div>

          <div className="overflow-hidden">
            <div className="font-mono text-lg md:text-2xl mb-7 animate-slide-up animation-delay-200">
              <span className="text-neon-cyan">$</span>{' '}
              <span className="text-zinc-400">whoami</span>{' '}
              <span className="text-zinc-600">→</span>{' '}
              <span className="text-gradient font-semibold">{typed}</span>
              <span className="inline-block w-[10px] h-6 ml-1 align-middle bg-neon-cyan animate-blink" />
            </div>
          </div>

          <p className="text-zinc-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed animate-slide-up animation-delay-400">
            Building production-grade SaaS — multi-tenant dashboards, AWS pipelines, and
            relentless CP problem-solving on the side. NIT Jamshedpur '24, currently shipping
            at <span className="text-white font-semibold">OptyStack</span>.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 animate-slide-up animation-delay-600">
            <button
              onClick={() => scrollTo('#portfolio')}
              data-cursor="hover"
              className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold overflow-hidden bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-lime bg-[length:200%_200%] animate-gradient-x text-black shadow-glow hover:shadow-glow-violet transition-shadow"
            >
              <Sparkles size={18} />
              <span>See my work</span>
              <ArrowDown
                size={18}
                className="group-hover:translate-y-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-neon-cyan/60 backdrop-blur-sm transition-all"
            >
              <Mail size={18} className="text-neon-cyan" />
              <span>Let's talk</span>
            </button>
          </div>

          <div className="flex items-center gap-5 animate-slide-up animation-delay-800">
            <a
              href="https://github.com/mr-andyyy"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-neon-cyan/60 hover:text-neon-cyan hover:-translate-y-0.5 transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/anand-kumar-591431211/"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-neon-violet/60 hover:text-neon-violet hover:-translate-y-0.5 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:anandkumar4549@gmail.com"
              data-cursor="hover"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-neon-lime/60 hover:text-neon-lime hover:-translate-y-0.5 transition-all"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
            <span className="font-mono text-xs text-zinc-500">+91 8210014035</span>
          </div>
        </div>

        {/* RIGHT: terminal */}
        <div className="relative animate-slide-up animation-delay-400">
          <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/20 via-neon-violet/20 to-neon-lime/20 rounded-3xl blur-2xl" />
          <div className="relative grad-border p-0 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-xs text-zinc-500">
                anand@dev:~/portfolio
              </span>
            </div>
            <div className="p-5 font-mono text-[13px] leading-relaxed">
              <Line>
                <span className="text-neon-cyan">const</span>{' '}
                <span className="text-neon-lime">anand</span>{' '}
                <span className="text-zinc-500">=</span>{' '}
                <span className="text-zinc-400">{'{'}</span>
              </Line>
              <Line indent>
                <span className="text-neon-violet">role</span>
                <span className="text-zinc-500">: </span>
                <span className="text-amber-300">'Software Developer'</span>
                <span className="text-zinc-500">,</span>
              </Line>
              <Line indent>
                <span className="text-neon-violet">company</span>
                <span className="text-zinc-500">: </span>
                <span className="text-amber-300">'OptyStack'</span>
                <span className="text-zinc-500">,</span>
              </Line>
              <Line indent>
                <span className="text-neon-violet">stack</span>
                <span className="text-zinc-500">: [</span>
                <span className="text-amber-300">'Next.js'</span>
                <span className="text-zinc-500">, </span>
                <span className="text-amber-300">'Prisma'</span>
                <span className="text-zinc-500">, </span>
                <span className="text-amber-300">'AWS'</span>
                <span className="text-zinc-500">, </span>
                <span className="text-amber-300">'PostgreSQL'</span>
                <span className="text-zinc-500">],</span>
              </Line>
              <Line indent>
                <span className="text-neon-violet">cf</span>
                <span className="text-zinc-500">: </span>
                <span className="text-cyan-300">1620</span>
                <span className="text-zinc-500">, </span>
                <span className="text-neon-violet">cc</span>
                <span className="text-zinc-500">: </span>
                <span className="text-cyan-300">2203</span>
                <span className="text-zinc-500">, </span>
                <span className="text-neon-violet">lc</span>
                <span className="text-zinc-500">: </span>
                <span className="text-cyan-300">2123</span>
                <span className="text-zinc-500">,</span>
              </Line>
              <Line indent>
                <span className="text-neon-violet">superpower</span>
                <span className="text-zinc-500">: </span>
                <span className="text-amber-300">'shipping fast, debugging faster'</span>
                <span className="text-zinc-500">,</span>
              </Line>
              <Line>
                <span className="text-zinc-400">{'}'}</span>
                <span className="text-zinc-500">;</span>
              </Line>
              <Line>&nbsp;</Line>
              <Line>
                <span className="text-neon-cyan">$</span>{' '}
                <span className="text-zinc-300">npm run </span>
                <span className="text-neon-lime">awesome</span>
                <span className="ml-1 inline-block w-2 h-4 align-middle bg-neon-lime animate-blink" />
              </Line>
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue — desktop only (collides with terminal on mobile) */}
      <div
        onClick={() => scrollTo('#about')}
        data-cursor="hover"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="font-mono text-[10px] tracking-widest text-zinc-500 group-hover:text-neon-cyan transition-colors">
          SCROLL
        </span>
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center pt-2 group-hover:border-neon-cyan transition-colors">
          <div className="w-1.5 h-2 bg-neon-cyan rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

const Line = ({
  children,
  indent,
}: {
  children: React.ReactNode;
  indent?: boolean;
}) => (
  <div className={indent ? 'pl-5' : ''}>
    <span>{children}</span>
  </div>
);

export default Hero;
