import { Target, Users, TrendingUp, Award } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Target,
      title: 'Product Strategy',
      description: 'End-to-end product development from discovery to launch',
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Deep user research and behavioral analytics expertise',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'Proven track record in improving activation and retention',
    },
    {
      icon: Award,
      title: 'Certified PM',
      description: 'Product Discovery & Experimentation certified',
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Building Products That
              <span className="text-yellow-400"> Matter</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I'm a Product Manager with a passion for solving complex problems through
                data-driven insights and user-centered design. With experience at
                <span className="text-white font-semibold"> Cashkaro</span> and
                <span className="text-white font-semibold"> Datacultr</span>, I've led
                initiatives that significantly improved user retention and activation rates.
              </p>
              <p>
                My approach combines rigorous product analytics, competitive analysis, and
                cross-functional collaboration to deliver products that users love. From
                conceptualizing features to writing comprehensive PRDs, I thrive in the entire
                product development lifecycle.
              </p>
              <p>
                Armed with a B.Tech from <span className="text-white font-semibold">NIT Jamshedpur</span> and
                certifications in Product Experimentation and Discovery, I bring both technical
                depth and strategic thinking to every project.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-8 rounded-2xl hover:bg-zinc-800 transition-all duration-300 hover:scale-105 group"
              >
                <highlight.icon
                  size={40}
                  className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
