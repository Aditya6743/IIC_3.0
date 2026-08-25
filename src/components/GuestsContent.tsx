import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, Linkedin, Twitter, Github, Globe } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Guest {
  avatar: string;
  name: string;
  designation: string;
  company: string;
  role: 'Chief Guest' | 'Guest Speaker' | 'Special Guest';
  bio: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

const guests: Guest[] = [
  {
    avatar: '/guest1.png',
    name: 'Jai G. Singla',
    designation: 'Scientist Engineer SF',
    company: 'SAC-ISRO',
    role: 'Chief Guest',
    bio: 'Leading space application center research and earth observation payload design.',
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://isro.gov.in',
    },
  },
  {
    avatar: '/guest2.png',
    name: 'Arjun Kumar',
    designation: 'Associate Director & Scientist',
    company: 'DRDO',
    role: 'Special Guest',
    bio: 'Pioneering defense technologies and aerospace engineering research for military systems.',
    socials: {
      linkedin: 'https://linkedin.com',
    },
  },
  {
    avatar: '/guest3.png',
    name: 'Jean Calleja Agius',
    designation: 'Head of Anatomy',
    company: 'University of Malta',
    role: 'Guest Speaker',
    bio: 'Specialized in molecular anatomy and clinical genomics studies.',
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://um.edu.mt',
    },
  },
  {
    avatar: '/guest4.png',
    name: 'Ing. Carl James Debono',
    designation: 'Dean',
    company: 'University of Malta',
    role: 'Guest Speaker',
    bio: 'Researching intelligent video systems, wireless transmission, and communication networks.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    avatar: '/guest5.png',
    name: 'Neville Calleja',
    designation: 'Chair, EHII',
    company: 'WHO',
    role: 'Special Guest',
    bio: 'Directing healthcare databases and information systems for international medical standards.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    },
  },
  {
    avatar: '/guest6.png',
    name: 'Lalit Garg',
    designation: 'Professor',
    company: 'University of Malta',
    role: 'Guest Speaker',
    bio: 'Expert in machine learning, information extraction, and medical diagnostic databases.',
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
  },
  {
    avatar: '/guest7.png',
    name: 'Varadraj P. Gurupur',
    designation: 'Professor',
    company: 'University of Central Florida',
    role: 'Guest Speaker',
    bio: 'Specialized in decision support systems and health information management systems.',
    socials: {
      linkedin: 'https://linkedin.com',
      website: 'https://ucf.edu',
    },
  },
  {
    avatar: '/guest8.png',
    name: 'Vincent Lopez',
    designation: 'CEO',
    company: 'Parker Health Inc., USA',
    role: 'Special Guest',
    bio: 'Leading innovative electronic health record integration and SaaS platforms.',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
    },
  },
];

const GuestCard: React.FC<{ guest: Guest; delay: number; isInView: boolean }> = ({
  guest,
  delay,
  isInView,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="w-full flex"
    >
      <div className="w-full bg-[#061820]/40 border border-border/30 rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-400/40 hover:shadow-glass hover:-translate-y-1 group relative overflow-hidden justify-between h-full">
        {/* Profile Image (Circular Avatar with Hover Zoom) */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden border border-border/30 bg-secondary/20 mb-5 flex-shrink-0">
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
          )}
          <img
            src={guest.avatar}
            alt={`${guest.name} portrait`}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03] ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              setImageLoaded(true);
            }}
          />
        </div>

        {/* Role Badge */}
        <Badge
          variant={guest.role === 'Chief Guest' ? 'default' : 'cyan'}
          className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full mb-3"
        >
          {guest.role}
        </Badge>

        {/* Identity Details */}
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-lg font-bold text-white tracking-tight leading-tight mb-1">
            {guest.name}
          </h3>
          <span className="text-sm font-medium text-gray-300 leading-snug">
            {guest.designation}
          </span>
          <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider block mt-1">
            {guest.company}
          </span>
          <p className="text-xs text-gray-400 leading-relaxed mt-3 px-2 line-clamp-2 min-h-[32px]">
            {guest.bio}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-border/20 my-4" aria-hidden="true" />

        {/* Social Row */}
        <div className="flex justify-center items-center gap-2.5" role="list" aria-label={`${guest.name} social links`}>
          {guest.socials.linkedin && (
            <a
              href={guest.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name}'s LinkedIn profile`}
              role="listitem"
              className="p-1.5 rounded-md bg-secondary/20 text-gray-400 hover:text-white hover:bg-secondary/60 transition-all duration-200 border border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {guest.socials.twitter && (
            <a
              href={guest.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name}'s X profile`}
              role="listitem"
              className="p-1.5 rounded-md bg-secondary/20 text-gray-400 hover:text-white hover:bg-secondary/60 transition-all duration-200 border border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {guest.socials.github && (
            <a
              href={guest.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name}'s GitHub profile`}
              role="listitem"
              className="p-1.5 rounded-md bg-secondary/20 text-gray-400 hover:text-white hover:bg-secondary/60 transition-all duration-200 border border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          {guest.socials.website && (
            <a
              href={guest.socials.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name}'s personal website`}
              role="listitem"
              className="p-1.5 rounded-md bg-secondary/20 text-gray-400 hover:text-white hover:bg-secondary/60 transition-all duration-200 border border-border/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const GuestsContent: React.FC = () => {
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
            <Sparkles className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Guests</span>
          </h1>
          <div className="section-divider mb-10 mx-auto" aria-hidden="true" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Distinguished global experts, industry leaders, and researchers joining us for IIC 2.0.
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
              <div className="p-4 rounded-full bg-white/5 border border-white/10 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" aria-hidden="true" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
                Coming <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400">Soon</span>
              </h2>
              
              <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full mb-6 mx-auto"></div>
              
              <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                We are finalizing our list of distinguished global experts and researchers joining us for IIC 2.0.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default GuestsContent;
