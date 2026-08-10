import React, { useRef } from 'react';
import { Code, Lightbulb, Users, Trophy, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: <Code className="h-7 w-7 text-pink-400" aria-hidden="true" />,
    title: 'Code with Purpose',
    description:
      'Build innovative solutions that address real-world challenges across various domains.',
    color: 'from-pink-500/20 to-rose-600/20',
    border: 'group-hover:border-pink-400/50',
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-cyan-400" aria-hidden="true" />,
    title: 'Learn & Grow',
    description:
      'Expand your skills through workshops, mentorship sessions, and hands-on experience.',
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'group-hover:border-cyan-400/50',
  },
  {
    icon: <Users className="h-7 w-7 text-purple-400" aria-hidden="true" />,
    title: 'Connect & Collaborate',
    description:
      'Network with fellow developers, designers, and industry professionals.',
    color: 'from-purple-500/20 to-indigo-600/20',
    border: 'group-hover:border-purple-400/50',
  },
  {
    icon: <Trophy className="h-7 w-7 text-yellow-400" aria-hidden="true" />,
    title: 'Win Big',
    description:
      'Compete for substantial prizes and recognition for your innovative solutions.',
    color: 'from-yellow-500/20 to-orange-600/20',
    border: 'group-hover:border-yellow-400/50',
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 space-bg"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Sparkles className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h2
            id="about-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About <span className="gradient-text">IIC 2.0</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            The International Innovation Challenge (IIC) is an empowering platform for
            young minds to address real-world challenges. The event brings together
            exceptional talents in a 36-hour hackathon, allowing participants to
            brainstorm and devise impactful solutions under the mentorship of industry
            leaders. We will also feature a startup carnival and international conference
            to foster innovation and collaboration.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{
                duration: 0.55,
                delay: 0.1 + index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Card
                className={`h-full p-6 group border border-pink-500/10 transition-all duration-300 ${feature.border} hover:shadow-glass-hover`}
              >
                <CardContent className="p-0">
                  <div
                    className={`bg-gradient-to-br ${feature.color} inline-flex p-3.5 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;