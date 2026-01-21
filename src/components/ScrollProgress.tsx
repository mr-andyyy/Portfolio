interface ScrollProgressProps {
  progress: number;
}

const ScrollProgress = ({ progress }: ScrollProgressProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
      <div
        className="h-full bg-yellow-400 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
