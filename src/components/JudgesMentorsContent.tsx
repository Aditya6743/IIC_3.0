import React, { useRef, useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import SpeakerCard from '@/components/SpeakerCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Person {
  avatar: string;
  name: string;
  designation: string;
  company: string;
  role: 'Judge' | 'Mentor';
  socials: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

const judges: Person[] = [
  {
    avatar: '/judge1.png',
    name: 'Kushal Vijay',
    designation: 'Software Engineer',
    company: 'Microsoft',
    role: 'Judge',
    socials: {
      linkedin: 'https://www.linkedin.com/in/kushalvijay/',
      instagram: 'https://instagram.com/kushalvijay',
      github: 'https://github.com/kushalvijay',
    },
  },
  {
    avatar: '/judge2.png',
    name: 'Swati Maurya',
    designation: 'Software Engineer',
    company: 'Amazon',
    role: 'Judge',
    socials: {
      linkedin: 'https://www.linkedin.com/in/swati-maurya/',
      instagram: 'https://instagram.com',
      github: 'https://github.com',
    },
  },
  {
    avatar: '/mentor1.png',
    name: 'Aditi Gupta',
    designation: 'CEO',
    company: 'TechTip24',
    role: 'Mentor',
    socials: {
      linkedin: 'https://www.linkedin.com/in/aditi-gupta-techtip24/',
      instagram: 'https://instagram.com',
      website: 'https://techtip24.com',
    },
  },
  {
    avatar: '/mentor2.png',
    name: 'Bhagirath Giri',
    designation: 'Director',
    company: 'WsCube Tech',
    role: 'Mentor',
    socials: {
      linkedin: 'https://www.linkedin.com/in/bhagirath-giri/',
      instagram: 'https://instagram.com',
      website: 'https://wscubetech.com',
    },
  },
  {
    avatar: '/mentor3.png',
    name: 'Sonam Chhikara',
    designation: 'Associate',
    company: 'PwC',
    role: 'Mentor',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sonam-chhikara-pwc/',
      instagram: 'https://instagram.com',
    },
  },
];

const JudgesMentorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Users className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Judges &amp; <span className="gradient-text">Mentors</span>
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Industry leaders and experts guiding and evaluating your innovations.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch justify-items-center">
          {judges.map((person, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
              className="w-full flex justify-center"
            >
              <SpeakerCard
                avatar={person.avatar}
                name={person.name}
                designation={person.designation}
                company={person.company}
                role={person.role}
                socials={person.socials}
              />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JudgesMentorsContent;
