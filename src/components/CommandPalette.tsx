import {
  ArrowRight,
  AtSign,
  Briefcase,
  Code2,
  Copy,
  Download,
  FileText,
  Github,
  Linkedin,
  Mail,
  Palette,
  Search,
  Sparkles,
  Trophy,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getSoundEnabled, playSound, setSoundEnabled } from '../hooks/useSound';

type Cmd = {
  id: string;
  label: string;
  hint: string;
  icon: typeof Search;
  group: string;
  keywords?: string;
  action: () => void | Promise<void>;
};

const setTheme = (id: string) => {
  document.documentElement.setAttribute('data-theme', id);
  try { localStorage.setItem('theme', id); } catch { /* ignore */ }
  playSound('whoosh');
};

const scrollTo = (sel: string) => {
  document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });
};

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore — older browsers / insecure contexts
  }
};

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [, force] = useState(0);

  const commands: Cmd[] = useMemo(
    () => [
      {
        id: 'nav-about',
        label: 'Jump to About',
        hint: 'section · 01',
        icon: User,
        group: 'Navigation',
        keywords: 'who am i bio profile',
        action: () => scrollTo('#about'),
      },
      {
        id: 'nav-skills',
        label: 'Jump to Skills',
        hint: 'section · 02',
        icon: Code2,
        group: 'Navigation',
        keywords: 'tech stack tools',
        action: () => scrollTo('#skills'),
      },
      {
        id: 'nav-experience',
        label: 'Jump to Experience',
        hint: 'section · 03',
        icon: Briefcase,
        group: 'Navigation',
        keywords: 'work jobs career',
        action: () => scrollTo('#experience'),
      },
      {
        id: 'nav-portfolio',
        label: 'Jump to Work',
        hint: 'section · 04',
        icon: Sparkles,
        group: 'Navigation',
        keywords: 'projects portfolio case studies',
        action: () => scrollTo('#portfolio'),
      },
      {
        id: 'nav-achievements',
        label: 'Jump to Achievements',
        hint: 'section · 05',
        icon: Trophy,
        group: 'Navigation',
        keywords: 'codeforces leetcode codechef',
        action: () => scrollTo('#achievements'),
      },
      {
        id: 'nav-contact',
        label: 'Jump to Contact',
        hint: 'section · 06',
        icon: AtSign,
        group: 'Navigation',
        keywords: 'email message',
        action: () => scrollTo('#contact'),
      },

      {
        id: 'theme-cyber',
        label: 'Theme · Cyber Noir',
        hint: 'dark · default',
        icon: Palette,
        group: 'Themes',
        keywords: 'dark default cyan',
        action: () => setTheme('cyber'),
      },
      {
        id: 'theme-light',
        label: 'Theme · Light Mode',
        hint: 'crisp daylight',
        icon: Palette,
        group: 'Themes',
        keywords: 'light bright',
        action: () => setTheme('light'),
      },
      {
        id: 'theme-synthwave',
        label: 'Theme · Synthwave',
        hint: 'retro neon',
        icon: Palette,
        group: 'Themes',
        keywords: 'pink magenta retro',
        action: () => setTheme('synthwave'),
      },
      {
        id: 'theme-matrix',
        label: 'Theme · Matrix',
        hint: 'green-on-black',
        icon: Palette,
        group: 'Themes',
        keywords: 'green hacker terminal',
        action: () => setTheme('matrix'),
      },
      {
        id: 'theme-solar',
        label: 'Theme · Solar Flare',
        hint: 'warm fire',
        icon: Palette,
        group: 'Themes',
        keywords: 'warm orange gold',
        action: () => setTheme('solar'),
      },

      {
        id: 'copy-email',
        label: 'Copy email address',
        hint: 'anandkumar4549@gmail.com',
        icon: Copy,
        group: 'Quick actions',
        keywords: 'mail contact reach out',
        action: () => copy('anandkumar4549@gmail.com'),
      },
      {
        id: 'send-email',
        label: 'Send me an email',
        hint: 'mailto: opens client',
        icon: Mail,
        group: 'Quick actions',
        action: () => window.open('mailto:anandkumar4549@gmail.com'),
      },
      {
        id: 'open-github',
        label: 'Open GitHub',
        hint: 'github.com/mr-andyyy',
        icon: Github,
        group: 'Quick actions',
        action: () => window.open('https://github.com/mr-andyyy', '_blank'),
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn',
        hint: 'in/anand-kumar-591431211',
        icon: Linkedin,
        group: 'Quick actions',
        action: () => window.open('https://www.linkedin.com/in/anand-kumar-591431211/', '_blank'),
      },
      {
        id: 'download-resume',
        label: 'Download resume',
        hint: 'pdf · 1 page',
        icon: Download,
        group: 'Quick actions',
        keywords: 'cv',
        action: () => window.open('/resume.pdf', '_blank'),
      },
      {
        id: 'view-resume-text',
        label: 'View resume (text)',
        hint: 'opens contact section',
        icon: FileText,
        group: 'Quick actions',
        action: () => scrollTo('#contact'),
      },

      {
        id: 'sound-toggle',
        label: getSoundEnabled() ? 'Mute sounds' : 'Enable sounds',
        hint: 'toggle UI sounds',
        icon: getSoundEnabled() ? VolumeX : Volume2,
        group: 'Settings',
        action: () => {
          setSoundEnabled(!getSoundEnabled());
          if (getSoundEnabled()) playSound('success');
          force((n) => n + 1);
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!q.trim()) return commands;
    const ql = q.toLowerCase();
    return commands
      .map((c) => {
        const hay = `${c.label} ${c.hint} ${c.keywords ?? ''}`.toLowerCase();
        if (!hay.includes(ql)) {
          // fuzzy: match in-order chars
          let i = 0;
          for (const ch of ql) {
            const found = hay.indexOf(ch, i);
            if (found < 0) return null;
            i = found + 1;
          }
        }
        return c;
      })
      .filter(Boolean) as Cmd[];
  }, [q, commands]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const run = (cmd: Cmd) => {
    cmd.action();
    setOpen(false);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    });
    return map;
  }, [filtered]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[180] flex items-start justify-center pt-[12vh] px-4 animate-fade-in">
      <div
        className="absolute inset-0 backdrop-blur-md"
        style={{ background: 'color-mix(in srgb, var(--bg-primary) 60%, transparent)' }}
        onClick={() => setOpen(false)}
      />

      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: 'color-mix(in srgb, var(--bg-secondary) 96%, transparent)',
          border: '1px solid var(--border-primary)',
        }}
      >
        {/* gradient top stripe */}
        <div
          className="h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, rgb(var(--neon-cyan-rgb)), rgb(var(--neon-violet-rgb)), rgb(var(--neon-lime-rgb)))',
          }}
        />

        {/* search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((i) => Math.min(filtered.length - 1, i + 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((i) => Math.max(0, i - 1));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = filtered[active];
                if (cmd) run(cmd);
              }
            }}
            placeholder="Type a command, search anything…"
            className="flex-1 bg-transparent outline-none font-mono text-sm placeholder:opacity-40"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Command palette search"
          />
          <kbd
            className="font-mono text-[10px] px-1.5 py-0.5 rounded border"
            style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}
          >
            esc
          </kbd>
        </div>

        {/* list */}
        <div
          ref={listRef}
          className="max-h-[55vh] overflow-y-auto p-2"
          style={{ scrollbarWidth: 'thin' }}
        >
          {filtered.length === 0 ? (
            <div
              className="px-4 py-12 text-center font-mono text-sm"
              style={{ color: 'var(--text-muted)' }}
            >
              No matches. Try "theme", "github", "email"…
            </div>
          ) : (
            Array.from(grouped.entries()).map(([group, items]) => (
              <div key={group} className="mb-2">
                <div
                  className="px-3 pt-2 pb-1 font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {group}
                </div>
                {items.map((cmd) => {
                  const idx = filtered.indexOf(cmd);
                  const isActive = idx === active;
                  return (
                    <button
                      key={cmd.id}
                      data-idx={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => run(cmd)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors"
                      style={{
                        background: isActive
                          ? 'color-mix(in srgb, var(--text-primary) 6%, transparent)'
                          : 'transparent',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center"
                        style={{
                          background: 'color-mix(in srgb, var(--text-primary) 5%, transparent)',
                          color: isActive ? 'rgb(var(--neon-cyan-rgb))' : 'var(--text-secondary)',
                        }}
                      >
                        <cmd.icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                          {cmd.label}
                        </div>
                        <div className="font-mono text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                          {cmd.hint}
                        </div>
                      </div>
                      {isActive && (
                        <ArrowRight
                          size={14}
                          style={{ color: 'rgb(var(--neon-cyan-rgb))' }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div
          className="flex items-center justify-between px-5 py-2.5 border-t font-mono text-[10px]"
          style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
        >
          <div className="flex items-center gap-3">
            <span>↑↓ navigate</span>
            <span>↵ select</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd
              className="px-1.5 py-0.5 rounded border"
              style={{ borderColor: 'var(--border-primary)' }}
            >
              ⌘
            </kbd>
            <kbd
              className="px-1.5 py-0.5 rounded border"
              style={{ borderColor: 'var(--border-primary)' }}
            >
              K
            </kbd>
            <span className="ml-1">to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
