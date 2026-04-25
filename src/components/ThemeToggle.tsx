import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      data-cursor="hover"
      className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:border-neon-cyan/50 hover:text-neon-cyan transition-all relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'dark'
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
        }`}
      >
        <Moon size={16} />
      </div>
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          theme === 'light'
            ? 'rotate-0 scale-100 opacity-100'
            : 'rotate-90 scale-0 opacity-0'
        }`}
      >
        <Sun size={16} />
      </div>
    </button>
  );
};

export default ThemeToggle;
