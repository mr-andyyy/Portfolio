import { ExternalLink, TrendingUp, Watch, Package } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: 'Swiggy Delivery Service',
      subtitle: 'Product Teardown & Improvement Case Study',
      description:
        'Comprehensive analysis of Swiggy\'s delivery service with strategic recommendations for enhancing user experience and operational efficiency.',
      icon: Package,
      tags: ['Product Analysis', 'UX Research', 'Market Research'],
      metrics: ['User Journey Mapping', 'Competitive Analysis', 'Feature Prioritization'],
    },
    {
      title: 'Habit Builder & Tracker',
      subtitle: 'Product Design from Scratch',
      description:
        'Designed a comprehensive habit tracking application that helps users create sustainable routines aligned with their lifestyle and goals.',
      icon: TrendingUp,
      tags: ['Product Design', 'User Research', 'Prototyping'],
      metrics: ['User Personas', 'Feature Roadmap', 'Wireframes'],
    },
    {
      title: 'Maritime Sports Smartwatch',
      subtitle: 'Product Design & Competitive Analysis',
      description:
        'Conceptualized a specialized smartwatch for gym enthusiasts and maritime sports athletes in the Cayman Islands market.',
      icon: Watch,
      tags: ['Market Research', 'Competitive Analysis', 'Product Strategy'],
      metrics: ['Market Sizing', 'Feature Differentiation', 'Go-to-Market'],
    },
  ];

  return (
    <section id="portfolio" className="min-h-screen flex items-center py-24 px-6 lg:px-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Featured <span className="text-yellow-400">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Case studies showcasing product thinking and problem-solving approach
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-black border border-zinc-800 rounded-2xl overflow-hidden group hover:border-yellow-400 transition-all duration-500 hover:scale-105"
            >
              <div className="relative h-64 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <project.icon
                  size={80}
                  className="text-yellow-400/20 group-hover:text-yellow-400/40 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                  <p className="text-sm text-yellow-400 font-medium">{project.subtitle}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-zinc-900 text-yellow-400 text-xs font-medium rounded-full border border-zinc-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  {project.metrics.map((metric, metricIndex) => (
                    <div
                      key={metricIndex}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></div>
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                <button className="flex items-center space-x-2 text-yellow-400 font-semibold hover:text-white transition-colors duration-300 group/btn">
                  <span>View Case Study</span>
                  <ExternalLink
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-yellow-400/10 to-transparent border border-yellow-400/30 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Certified Product Manager
              </h3>
              <p className="text-gray-400">
                Product Experimentation & Product Discovery Micro-Certifications
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="px-6 py-3 bg-yellow-400/20 border border-yellow-400 rounded-lg text-center">
                <span className="font-bold text-yellow-400">Product Experimentation</span>
              </div>
              <div className="px-6 py-3 bg-yellow-400/20 border border-yellow-400 rounded-lg text-center">
                <span className="font-bold text-yellow-400">Product Discovery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
