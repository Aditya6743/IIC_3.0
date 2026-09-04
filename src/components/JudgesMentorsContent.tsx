import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';


const JudgesMentorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 pt-32 pb-20">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Judges &amp; <span className="gradient-text">Mentors</span>
          </h1>
          <div className="section-divider mb-10 mx-auto" aria-hidden="true" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Industry leaders and experts guiding and evaluating your innovations.
          </p>
        </motion.div>

        <ComingSoon
          title="Coming Soon"
          description="We are carefully selecting an elite panel of industry leaders and mentors to guide you through IIC 3.0. Stay tuned!"
          icon={<Users className="w-10 h-10" aria-hidden="true" />}
        />
      </main>
    </div>
  );
};

export default JudgesMentorsContent;
