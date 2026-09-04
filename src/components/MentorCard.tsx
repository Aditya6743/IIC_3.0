import React, { useState } from 'react';
import { Linkedin, Twitter, Github, Globe, Instagram } from 'lucide-react';
import { Mentor } from '../types/mentor';

export interface MentorCardProps {
  mentor: Mentor;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const [imgSrc, setImgSrc] = useState(mentor.image);

  const socials = mentor.socials;
  const hasSocials = Boolean(
    socials &&
      (socials.linkedin ||
        socials.twitter ||
        socials.github ||
        socials.website ||
        socials.instagram)
  );

  return (
    <div className="flex flex-col h-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6">
      {/* Mentor Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white/[0.02]">
        <img
          src={imgSrc}
          alt={mentor.name}
          loading="lazy"
          onError={() => {
            if (imgSrc.startsWith('/Mentors/')) {
              setImgSrc(imgSrc.replace('/Mentors/', '/mentors/'));
            }
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Mentor Details */}
      <div className="flex flex-col flex-grow pt-5 text-center">
        <h3 className="text-xl font-semibold text-white tracking-wide mb-1">
          {mentor.name}
        </h3>

        <p className="text-sm font-medium text-pink-400 mb-2">
          {mentor.title}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          {mentor.headline}
        </p>

        {/* Social Links */}
        {hasSocials && (
          <div
            className="mt-auto pt-2 flex items-center justify-center gap-2.5"
            role="list"
            aria-label={`${mentor.name}'s social links`}
          >
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name}'s LinkedIn profile`}
                role="listitem"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {socials?.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name}'s X profile`}
                role="listitem"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {socials?.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name}'s GitHub profile`}
                role="listitem"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {socials?.website && (
              <a
                href={socials.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name}'s website`}
                role="listitem"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            {socials?.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${mentor.name}'s Instagram profile`}
                role="listitem"
                className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/20 transition-colors duration-200 inline-flex items-center justify-center"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
