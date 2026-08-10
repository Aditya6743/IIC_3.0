import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Globe, Instagram } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  email?: string;
  instagram?: string;
}

export interface SpeakerCardProps {
  avatar: string;
  name: string;
  designation: string;
  company: string;
  role: 'Judge' | 'Mentor' | 'Speaker';
  socials?: SocialLinks;
}

const SpeakerCard: React.FC<SpeakerCardProps> = ({
  avatar,
  name,
  designation,
  company,
  socials = {},
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative w-full aspect-[3/4] max-w-[340px] bg-[#020d11] border border-cyan-500/20 rounded-2xl overflow-hidden p-6 flex flex-col justify-end text-left transition-all duration-300 hover:border-cyan-400/50 hover:shadow-neon-pink/10 group"
    >
      {/* Top-Left Slanted Ribbon Corner */}
      <div
        className="absolute top-0 left-0 w-12 h-12 bg-cyan-400 pointer-events-none z-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />

      {/* Bottom-Right Slanted Ribbon Corner */}
      <div
        className="absolute bottom-0 right-0 w-12 h-12 bg-cyan-400 pointer-events-none z-10"
        style={{ clipPath: 'polygon(100% 100%, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />

      {/* Profile Portrait Image with Curved Oval Bottom Clip */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <img
          src={avatar}
          alt={`${name} portrait`}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            clipPath: 'ellipse(95% 75% at 50% 20%)',
          }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = 'none';
            setImageLoaded(true);
          }}
        />
        {/* Subtle vignette/gradient overlay at the bottom for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#020d11] via-transparent to-transparent opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* Vertically Stacked Outlined Social Links in Top-Right Corner */}
      <div
        className="absolute top-6 right-6 flex flex-col gap-2.5 z-20"
        role="list"
        aria-label={`${name} social links`}
      >
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s LinkedIn profile`}
            role="listitem"
            className="w-9 h-9 rounded-lg border border-gray-600/40 flex items-center justify-center bg-[#020d11]/70 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <Linkedin className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        )}
        {socials.instagram && (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s Instagram profile`}
            role="listitem"
            className="w-9 h-9 rounded-lg border border-gray-600/40 flex items-center justify-center bg-[#020d11]/70 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <Instagram className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        )}
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s GitHub profile`}
            role="listitem"
            className="w-9 h-9 rounded-lg border border-gray-600/40 flex items-center justify-center bg-[#020d11]/70 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <Github className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        )}
        {socials.twitter && (
          <a
            href={socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s X profile`}
            role="listitem"
            className="w-9 h-9 rounded-lg border border-gray-600/40 flex items-center justify-center bg-[#020d11]/70 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <Twitter className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        )}
        {socials.website && (
          <a
            href={socials.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name}'s personal website`}
            role="listitem"
            className="w-9 h-9 rounded-lg border border-gray-600/40 flex items-center justify-center bg-[#020d11]/70 text-gray-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
          >
            <Globe className="h-4.5 w-4.5" aria-hidden="true" />
          </a>
        )}
      </div>

      {/* Typography Overlay Content */}
      <div className="relative z-10 w-full pl-1 pb-1">
        <h3 className="text-2xl font-black text-white tracking-wide uppercase mb-1">
          {name}
        </h3>
        <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest leading-relaxed">
          {designation}, <br /> {company}
        </p>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
