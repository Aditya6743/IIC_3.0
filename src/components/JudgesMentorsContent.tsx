import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';

const JudgesMentorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  });

  const judges = [
    {
      name: 'Prince Yadav',
      role: 'SDE2 @ GreyOrange',
      image: '/images/prince-yadav.jpg',
    },
    {
      name: 'Ayushman Pandita',
      role: 'Founder @ growthrocket.ai',
      image: '/images/ayushman-pandita.jpg',
    },
    {
      name: 'Ankit Jha',
      role: 'Full Stack Developer',
      image: '/images/ankit-jha.jpg',
    },
    {
      name: 'Nandini Sharma',
      role: 'Educator & Entrepreneur',
      image: '/images/nandini-sharma.jpg',
    },
  ];

  return (
    <div
      className="min-h-screen space-bg"
      ref={sectionRef}
    >
      <main className="container mx-auto px-4 py-20">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : {}
          }
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Users
              className="h-7 w-7 text-pink-400"
              aria-hidden="true"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Judges &amp;{' '}
            <span className="gradient-text">
              Mentors
            </span>
          </h1>

          {/* Divider */}
          <div
            className="section-divider mb-10 mx-auto"
            aria-hidden="true"
          />

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Industry leaders and experts guiding and evaluating your innovations.
          </p>
        </motion.div>

        {/* Judges & Mentors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {judges.map((judge, index) => (
            <motion.div
              key={judge.name}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-2">

                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40">
                  <img
                    src={judge.image}
                    alt={judge.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-5 text-center">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {judge.name}
                  </h2>

                  <p className="text-pink-400 text-sm">
                    {judge.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
};

export default JudgesMentorsContent;