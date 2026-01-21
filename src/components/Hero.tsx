import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-6 pt-24">
      <div className="max-w-7xl mx-auto text-center">
        <div className="overflow-hidden">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 animate-slide-up">
            Oindrila Mondal
          </h1>
        </div>
        <div className="overflow-hidden">
          <p className="text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-semibold mb-8 animate-slide-up animation-delay-200">
            Product Manager
          </p>
        </div>
        <div className="overflow-hidden">
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-slide-up animation-delay-400">
            Transforming user insights into impactful products through data-driven decisions
            and cross-functional collaboration
          </p>
        </div>

        <button
          onClick={scrollToAbout}
          className="inline-flex items-center space-x-2 text-white border-2 border-yellow-400 px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 font-semibold animate-slide-up animation-delay-600"
        >
          <span>Explore My Work</span>
          <ArrowDown size={20} />
        </button>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
