import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ComingSoon from '@/components/ComingSoon';

const ProblemStatementsContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 py-20">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Problem Statements
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8">
            Choose from cutting-edge problem statements across various technological
            domains. Each challenge is designed to push the boundaries of innovation
            and create real-world impact.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search problems or categories…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 glass-surface rounded-xl border border-pink-500/20 text-white placeholder:text-gray-500 bg-transparent focus:outline-none focus:border-pink-400/60 transition-colors duration-300 text-sm"
              aria-label="Search problem statements"
            />
          </div>
        </motion.div>

        {/* Content Area */}
        <ComingSoon
          title="Coming Soon"
          description="We are curating cutting-edge problem statements across various technological domains. Each challenge is designed to push the boundaries of innovation and create real-world impact. Stay tuned for the full list!"
        />
      </main>
    </div>
  );
};

export default ProblemStatementsContent;
