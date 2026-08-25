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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Judges &amp; <span className="gradient-text">Mentors</span>
          </h1>
          <div className="section-divider mb-10 mx-auto" aria-hidden="true" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Industry leaders and experts guiding and evaluating your innovations.
          </p>
        </motion.div>

        {/* Premium Coming Soon */}
        <motion.div
          className="flex flex-col items-center justify-center py-16 px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        >
          <div className="relative group w-full max-w-lg mx-auto">
            {/* Glowing background blur */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative glass-card border border-white/10 rounded-3xl p-10 md:p-14 text-center flex flex-col items-center bg-[#05131b]/80 backdrop-blur-xl shadow-2xl">
              <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-8 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
                <Users className="w-10 h-10 text-pink-400 animate-pulse" aria-hidden="true" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Soon</span>
              </h2>
              
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full mb-6 mx-auto"></div>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                We are carefully selecting an elite panel of industry leaders and mentors to guide you through IIC 2.0. Stay tuned!
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default JudgesMentorsContent;
