import { BarChart, Database, Users, Lightbulb, FileText, GitBranch } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Lightbulb,
      category: 'Product Strategy',
      skills: [
        'Product Development Lifecycle',
        'Product Roadmapping',
        'Product Prioritization',
        'Competitive Analysis',
        'Market Research',
      ],
    },
    {
      icon: Users,
      category: 'User Research',
      skills: [
        'User Research',
        'Product Analytics',
        'Product Experimentation',
        'Funnel Analysis',
        'User Journey Mapping',
      ],
    },
    {
      icon: GitBranch,
      category: 'Methodologies',
      skills: [
        'Agile',
        'Scrum',
        'Cross-functional Collaboration',
        'Product Improvement',
        'A/B Testing',
      ],
    },
    {
      icon: Database,
      category: 'Technical Tools',
      skills: ['SQL', 'Mixpanel', 'Power BI', 'Jira', 'Confluence'],
    },
    {
      icon: FileText,
      category: 'Documentation',
      skills: ['PRD Writing', 'User Stories', 'Technical Specs', 'Process Documentation'],
    },
    {
      icon: BarChart,
      category: 'Analytics Tools',
      skills: ['MS Excel', 'Miro', 'Asana', 'MS PowerPoint'],
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-24 px-6 lg:px-12 bg-zinc-950">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Skills & <span className="text-yellow-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building world-class products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-black border border-zinc-800 rounded-2xl p-8 hover:border-yellow-400 transition-all duration-300 group hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-yellow-400/20 transition-colors duration-300">
                  <category.icon size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center text-gray-300 group/item hover:text-white transition-colors duration-200"
                  >
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-200"></div>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
