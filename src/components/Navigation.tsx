import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { name: 'About', href: '#about', n: '01' },
  { name: 'Skills', href: '#skills', n: '02' },
  { name: 'Experience', href: '#experience', n: '03' },
  { name: 'Work', href: '#portfolio', n: '04' },
  { name: 'Achievements', href: '#achievements', n: '05' },
  { name: 'Contact', href: '#contact', n: '06' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 lg:px-12 transition-[background-color,border-color,margin] duration-500 ${
          open
            ? 'nav-surface-solid rounded-2xl mt-2'
            : scrolled
              ? 'nav-surface rounded-full mt-2'
              : ''
        }`}
      >
        <div className={`flex items-center justify-between ${scrolled ? 'py-2' : ''}`}>
          <a
            href="#hero"
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 font-display text-xl font-bold"
          >
            <span className="relative inline-flex w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan via-neon-violet to-neon-lime items-center justify-center shadow-glow group-hover:shadow-glow-violet transition-shadow">
              <span className="absolute inset-[2px] rounded-md bg-ink-950 flex items-center justify-center font-mono text-sm">
                AK
              </span>
            </span>
            <span className="hidden sm:inline tracking-tight">
              anand<span className="text-neon-cyan">.dev</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  data-cursor="hover"
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.href);
                  }}
                  className={`relative px-3.5 py-2 rounded-full font-mono text-[12px] tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-white/5 border border-white/10" />
                  )}
                  <span className="relative">
                    <span className="text-zinc-600 mr-1">{link.n}.</span>
                    {link.name}
                  </span>
                </a>
              );
            })}
          </div>

          <ThemeToggle />

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go('#contact');
            }}
            data-cursor="hover"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-neon-cyan/50 hover:text-neon-cyan font-mono text-[12px] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            Hire me
          </a>

          <button
            data-cursor="hover"
            className="md:hidden text-white hover:text-neon-cyan transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-5 pb-4 space-y-1 animate-fade-in">
            {NAV.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg surface-hover transition-colors"
              >
                <span className="font-mono text-xs text-theme-muted">{link.n}.</span>
                <span className="font-medium text-theme">{link.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
