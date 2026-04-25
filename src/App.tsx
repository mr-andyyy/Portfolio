import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ScrollProgress from './components/ScrollProgress';
import Cursor from './components/Cursor';
import { useReveal } from './hooks/useReveal';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  useReveal();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-ink-950 text-white min-h-screen relative noise overflow-x-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[44rem] h-[44rem] rounded-full bg-neon-cyan/10 blur-[120px] animate-blob" />
        <div className="absolute top-1/3 -right-32 w-[40rem] h-[40rem] rounded-full bg-neon-violet/10 blur-[120px] animate-blob-2" />
        <div className="absolute bottom-0 left-1/3 w-[36rem] h-[36rem] rounded-full bg-neon-lime/10 blur-[120px] animate-blob" />
      </div>

      <Cursor />
      <ScrollProgress progress={scrollProgress} />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Portfolio />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;
