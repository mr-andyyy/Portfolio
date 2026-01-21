import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Product Management Intern',
      company: 'Cashkaro',
      location: 'Gurugram, India',
      period: 'September 2025 - Present',
      achievements: [
        'Conducted user retention analysis for post-exit feature, suggesting strategic changes to increase user trust',
        'Led end-to-end Browser Extension project: SERP research, network domain mapping, prototyping, competitive analysis, and PRD documentation',
        'Improved user activation rate through comprehensive growth product analysis of pre-exit feature',
        'Performed funnel analysis of complete user journey for Missing Ticket feature',
      ],
      color: 'yellow',
    },
    {
      title: 'Graduate Engineer Trainee',
      company: 'Datacultr',
      location: 'Gurugram, India',
      period: 'August 2024 - August 2025',
      achievements: [
        'Built Elastic Search API providing clients organized device data for simlock feature applications',
        'Developed autolock API using Elastic Search and ORM queries for improved device lock management',
        'Implemented SENDGRID email notification system for client approval workflows',
        'Enhanced client experience through organized data presentation and automated notification systems',
      ],
      color: 'blue',
    },
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Work <span className="text-yellow-400">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Driving product excellence through innovation and data-driven insights
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative bg-zinc-900 rounded-2xl p-8 md:p-12 hover:bg-zinc-800 transition-all duration-300 group"
            >
              <div className="absolute -left-3 top-12 w-6 h-6 bg-yellow-400 rounded-full hidden md:block group-hover:scale-125 transition-transform duration-300"></div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-xl font-semibold text-gray-300 mb-4">
                    <Briefcase size={20} className="text-yellow-400" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-start space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {exp.achievements.map((achievement, achIndex) => (
                  <div
                    key={achIndex}
                    className="flex items-start space-x-4 text-gray-300 group/item hover:text-white transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-200"></div>
                    <p className="leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8 md:p-12">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-yellow-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase size={32} className="text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Education</h3>
              <div className="space-y-3 text-gray-300">
                <div>
                  <p className="text-lg font-semibold text-white">
                    Bachelor of Technology in Electronics and Communication Engineering
                  </p>
                  <p className="text-yellow-400 font-medium">
                    National Institute of Technology, Jamshedpur
                  </p>
                  <p className="text-sm text-gray-400">CGPA: 7.74 | May 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
