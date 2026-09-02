import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

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
            Distinguished global experts, industry leaders, and researchers joining us for IIC 3.0.
          </p>
        </motion.div>

        <ComingSoon
          title="Coming Soon"
          description="We are finalizing our list of distinguished global experts and researchers joining us for IIC 3.0."
          icon={<Sparkles className="w-10 h-10" aria-hidden="true" />}
        />
      </main>
    </div>
  );
};

export default GuestsContent;
