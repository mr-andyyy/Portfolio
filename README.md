# Anand Kumar — Portfolio

A modern, interactive developer portfolio built with React, TypeScript, and Tailwind CSS. Features a multi-theme system, AI-powered chatbot, smooth animations, and responsive design.

## Features

| Feature | Description |
|---|---|
| **5 Custom Themes** | Cyber Noir, Light Mode, Synthwave, Matrix, Solar Flare — all reactive across every component |
| **AI Chatbot** | Powered by Groq (GPT-OSS 20B) — answers questions about my work, projects, and skills |
| **Smooth Scroll** | Lenis-powered momentum scrolling for a premium feel |
| **Command Palette** | `⌘K` to fuzzy-search sections, toggle themes, and quick actions |
| **Particle Network** | Interactive hero background with cursor-reactive connected dots |
| **Intro Loader** | Animated logo reveal on first page load |
| **Konami Easter Egg** | `↑↑↓↓←→←→BA` unlocks Matrix theme + falling katakana rain |
| **Sound Design** | Optional Web Audio synthesis — zero asset weight |
| **Testimonials** | Quote cards with star ratings and accent rotation |
| **Responsive** | Fully responsive — works on mobile, tablet, and desktop |

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS (JIT) + CSS Custom Properties
- **Build:** Vite
- **Animations:** CSS transitions, Web Animations API, Lenis smooth scroll
- **AI:** Groq API (openai/gpt-oss-20b)
- **Fonts:** Space Grotesk, JetBrains Mono

## Quick Start

```bash
# Clone
git clone https://github.com/mr-andyyy/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your Groq + Resend keys to .env

# Run dev server (also serves api/* functions locally)
npm run dev

# Build for production
npm run build
```

## Project Structure

```
api/
├── chat.ts                # Chatbot proxy to Groq (holds the API key + system prompt)
└── send-email.ts          # Contact form via Resend
src/
├── components/
│   ├── Hero.tsx           # Landing section with glitch text + terminal
│   ├── About.tsx          # Bio + highlight cards
│   ├── Skills.tsx         # Tech stack categories
│   ├── Experience.tsx     # Work history timeline
│   ├── Portfolio.tsx      # Project cards with tilt effect
│   ├── Achievements.tsx   # CP platform stats + profile links
│   ├── Testimonials.tsx   # Quote cards
│   ├── Contact.tsx        # Contact form + social links
│   ├── Chatbot.tsx        # AI assistant UI (calls /api/chat)
│   ├── Navigation.tsx     # Fixed nav + mobile menu
│   ├── ThemeToggle.tsx    # 5-theme picker
│   ├── CommandPalette.tsx # ⌘K fuzzy search
│   ├── Konami.tsx         # Easter egg
│   └── ...
├── hooks/
│   ├── useLenis.ts        # Smooth scroll
│   ├── useReveal.ts       # Scroll-triggered animations
│   └── useSound.ts        # Web Audio synthesis
├── index.css              # Theme system + global styles
└── App.tsx                # Root layout
```

## Themes

All 5 themes are defined as CSS custom properties in `index.css` and toggled via `data-theme` attribute on `<html>`. Every component — including the chatbot, cards, nav, and particles — automatically adapts.

## Chatbot Setup

The AI chatbot requires a [Groq API key](https://console.groq.com/) (free tier available). The browser calls `/api/chat`, a Vercel serverless function, so the key never ships to the client.

```env
GROQ_API_KEY=your_groq_api_key_here
```

Locally it goes in `.env`. In production, set it under Vercel → Project → Settings → Environment Variables. Do not prefix it with `VITE_`, or Vite will bundle it into the public JavaScript.

## Contact

- **Email:** anandkumar4549@gmail.com
- **LinkedIn:** [anand-kumar-591431211](https://www.linkedin.com/in/anand-kumar-591431211/)
- **GitHub:** [mr-andyyy](https://github.com/mr-andyyy)

---

Built with ☕ and code by **Anand Kumar**
