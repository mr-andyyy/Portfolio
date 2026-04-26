import { Check, Palette } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type ThemeId = 'cyber' | 'light' | 'synthwave' | 'matrix' | 'solar';

type ThemeMeta = {
  id: ThemeId;
  name: string;
  tagline: string;
  swatches: [string, string, string];
  surface: string;
  textOn: 'light' | 'dark';
};

const THEMES: ThemeMeta[] = [
  {
    id: 'cyber',
    name: 'Cyber Noir',
    tagline: 'developer dark — cyan · violet · lime',
    swatches: ['#22d3ee', '#a855f7', '#a3e635'],
    surface: '#050507',
    textOn: 'light',
  },
  {
    id: 'light',
    name: 'Light Mode',
    tagline: 'crisp daylight — clean editorial feel',
    swatches: ['#0891b2', '#7c3aed', '#65a30d'],
    surface: '#f8f9fc',
    textOn: 'dark',
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    tagline: 'retro neon — magenta drips on indigo',
    swatches: ['#00f5ff', '#ff38dc', '#ffdc50'],
    surface: '#0c0420',
    textOn: 'light',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    tagline: 'pure terminal — green-on-black',
    swatches: ['#57ffa5', '#00ff41', '#c8ff58'],
    surface: '#000000',
    textOn: 'light',
  },
  {
    id: 'solar',
    name: 'Solar Flare',
    tagline: 'warm fire — gold · ember · crimson',
    swatches: ['#ffd23f', '#ff5e3a', '#ffa000'],
    surface: '#14080a',
    textOn: 'light',
  },
];

const isThemeId = (v: string | null): v is ThemeId =>
  !!v && THEMES.some((t) => t.id === v);

const migrate = (v: string | null): ThemeId => {
  if (isThemeId(v)) return v;
  if (v === 'quartz') return 'light';
  if (v === 'dark') return 'cyber';
  return 'cyber';
};

const ThemePicker = () => {
  const [theme, setTheme] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return 'cyber';
    return migrate(localStorage.getItem('theme'));
  });
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor="hover"
        aria-label="Choose theme"
        aria-expanded={open}
        className="group relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden surface-hover border"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        {/* live swatch ring */}
        <span
          className="absolute inset-0 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
          style={{
            background: `conic-gradient(${current.swatches[0]}, ${current.swatches[1]}, ${current.swatches[2]}, ${current.swatches[0]})`,
            mask: 'radial-gradient(circle at center, transparent 55%, black 56%)',
            WebkitMask: 'radial-gradient(circle at center, transparent 55%, black 56%)',
          }}
        />
        <Palette
          size={14}
          className="relative z-10"
          style={{ color: 'var(--text-primary)' }}
        />
      </button>

      {/* Popover — fixed-to-viewport on mobile (avoids clipping), absolute on md+ */}
      <div
        className={`fixed right-3 top-[72px] w-[min(340px,calc(100vw-1.5rem))] md:absolute md:right-0 md:top-auto md:mt-3 md:w-[360px] origin-top-right transition-all duration-300 z-50 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: 'color-mix(in srgb, var(--bg-secondary) 96%, transparent)',
            border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* animated header bar */}
          <div className="relative h-[3px] overflow-hidden">
            <div
              className="absolute inset-0 animate-gradient-x"
              style={{
                background: `linear-gradient(90deg, ${current.swatches[0]}, ${current.swatches[1]}, ${current.swatches[2]}, ${current.swatches[0]})`,
                backgroundSize: '300% 100%',
              }}
            />
          </div>

          <div className="px-4 pt-4 pb-2">
            <div
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              choose your reality
            </div>
            <div
              className="font-display text-base font-bold mt-0.5"
              style={{ color: 'var(--text-primary)' }}
            >
              Themes
            </div>
          </div>

          <div className="p-2 space-y-1">
            {THEMES.map((t) => {
              const active = t.id === theme;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setOpen(false);
                  }}
                  data-cursor="hover"
                  className="w-full group relative flex items-center gap-3 p-3 rounded-xl text-left transition-all surface-hover"
                  style={{
                    background: active ? 'color-mix(in srgb, var(--text-primary) 5%, transparent)' : 'transparent',
                    border: `1px solid ${active ? 'var(--border-primary)' : 'transparent'}`,
                  }}
                >
                  {/* mini preview tile */}
                  <div
                    className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border"
                    style={{
                      background: t.surface,
                      borderColor: 'var(--border-subtle)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-end justify-center gap-0.5 p-1.5">
                      <span
                        className="flex-1 h-1.5 rounded-full"
                        style={{ background: t.swatches[0] }}
                      />
                      <span
                        className="flex-1 h-1.5 rounded-full"
                        style={{ background: t.swatches[1] }}
                      />
                      <span
                        className="flex-1 h-1.5 rounded-full"
                        style={{ background: t.swatches[2] }}
                      />
                    </div>
                    <div
                      className="absolute top-1.5 left-1.5 right-1.5 h-1 rounded-full opacity-60"
                      style={{
                        background: t.textOn === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.5)',
                      }}
                    />
                    <div
                      className="absolute top-3 left-1.5 w-3 h-1 rounded-full opacity-30"
                      style={{
                        background: t.textOn === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)',
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="font-display text-sm font-bold flex items-center gap-2"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {t.name}
                      {active && (
                        <span
                          className="inline-flex items-center gap-1 font-mono text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                          style={{
                            background: `${t.swatches[0]}22`,
                            color: t.swatches[0],
                            border: `1px solid ${t.swatches[0]}55`,
                          }}
                        >
                          <Check size={9} />
                          active
                        </span>
                      )}
                    </div>
                    <div
                      className="text-[11px] font-mono mt-0.5 truncate"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {t.tagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            className="px-4 py-2.5 border-t font-mono text-[10px] flex items-center justify-between"
            style={{
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            <span>{`> theme: ${current.name.toLowerCase()}`}</span>
            <span className="opacity-60">esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePicker;
