interface ScrollProgressProps {
  progress: number;
}

const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[60] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-lime relative"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-neon-lime shadow-[0_0_12px_2px] shadow-neon-lime/70" />
      </div>
    </div>
  );
};

export default ScrollProgress;
