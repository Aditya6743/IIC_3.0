import React, { useRef } from 'react';
import { Users } from 'lucide-react';
import { Mentor } from '../types/mentor';
import mentorsData from '../data/mentors.json';
import MentorCard from './MentorCard';


const JudgesMentorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mentors = mentorsData as Mentor[];

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-16">

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
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default JudgesMentorsContent;