/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050507',
          900: '#0a0a0f',
          800: '#11121a',
          700: '#1a1c26',
          600: '#262833',
        },
        neon: {
          cyan: 'rgb(var(--neon-cyan-rgb) / <alpha-value>)',
          violet: 'rgb(var(--neon-violet-rgb) / <alpha-value>)',
          lime: 'rgb(var(--neon-lime-rgb) / <alpha-value>)',
          amber: 'rgb(var(--neon-amber-rgb) / <alpha-value>)',
          pink: 'rgb(var(--neon-violet-rgb) / <alpha-value>)',
        },
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(var(--neon-cyan-rgb) / 0.5)',
        'glow-violet': '0 0 60px -10px rgb(var(--neon-violet-rgb) / 0.55)',
        'glow-lime': '0 0 60px -10px rgb(var(--neon-lime-rgb) / 0.45)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent, #050507 80%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 64px)',
        noise:
          'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
      },
      animation: {
        'slide-up': 'slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        marquee: 'marquee 35s linear infinite',
        'marquee-rev': 'marqueeRev 35s linear infinite',
        blob: 'blob 18s ease-in-out infinite',
        'blob-2': 'blob 22s ease-in-out infinite reverse',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'gradient-x': 'gradientX 8s ease infinite',
        glitch: 'glitch 4.2s steps(2, end) infinite',
        'glitch-2': 'glitch 5.7s steps(2, end) infinite reverse',
        blink: 'blink 1.05s steps(2, start) infinite',
        scanline: 'scanline 6s linear infinite',
        ticker: 'marquee 60s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,40px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        glitch: {
          '0%, 92%, 100%': { transform: 'translate(0)' },
          '93%': { transform: 'translate(-2px, 1px)' },
          '94%': { transform: 'translate(2px, -1px)' },
          '95%': { transform: 'translate(-1px, -2px)' },
          '96%': { transform: 'translate(1px, 2px)' },
          '97%': { transform: 'translate(-2px, 0)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
