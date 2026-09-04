
import React, { useState, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import ComingSoon from '@/components/ComingSoon';

const ProblemStatementsContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px',
  });

  return (
    <div
      className="min-h-screen space-bg"
      ref={sectionRef}
    >

      {/* =====================================================
          CURTAIN PRELOADER
      ====================================================== */}

      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: 1.7,
          duration: 0.4,
          ease: 'easeInOut',
        }}
      >

        {/* LEFT CURTAIN */}
        <motion.div
          className="absolute left-0 top-0 h-full w-1/2
                     bg-black
                     border-r border-pink-500/20"
          initial={{ x: 0 }}
          animate={{ x: '-100%' }}
          transition={{
            delay: 0.8,
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* RIGHT CURTAIN */}
        <motion.div
          className="absolute right-0 top-0 h-full w-1/2
                     bg-black
                     border-l border-purple-500/20"
          initial={{ x: 0 }}
          animate={{ x: '100%' }}
          transition={{
            delay: 0.8,
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* CENTER CONTENT */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{
            opacity: 1,
            scale: 1,
          }}
          animate={{
            opacity: 0,
            scale: 0.85,
          }}
          transition={{
            delay: 0.55,
            duration: 0.35,
            ease: 'easeOut',
          }}
        >

          <div className="text-center px-6">

            {/* Small Icon */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="mb-5"
            >
              <div
                className="mx-auto w-14 h-14 rounded-full
                           flex items-center justify-center
                           bg-gradient-to-br
                           from-pink-500/20
                           to-purple-600/20
                           border border-pink-500/20"
              >
                <Search
                  className="w-6 h-6 text-pink-400"
                  aria-hidden="true"
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.5,
              }}
            >
              Problem{' '}
              <span className="gradient-text">
                Statements
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              className="h-1 w-16 mx-auto mt-5 rounded-full
                         bg-gradient-to-r
                         from-pink-500
                         to-purple-600"
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: 64,
                opacity: 1,
              }}
              transition={{
                delay: 0.45,
                duration: 0.5,
              }}
            />

            {/* Loading Text */}
            <motion.p
              className="text-gray-400 text-sm mt-5"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
              }}
            >
              Loading challenges...
            </motion.p>

          </div>
        </motion.div>
      </motion.div>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="container mx-auto px-4 pt-32 pb-20">

        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
          }}
        >

          {/* PAGE TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Problem Statements
          </h1>

          {/* DIVIDER */}
          <div
            className="section-divider mb-6"
            aria-hidden="true"
          />

          {/* DESCRIPTION */}
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Choose from cutting-edge problem statements across various
            technological domains. Each challenge is designed to push the
            boundaries of innovation and create real-world impact.
          </p>


          {/* =================================================
              SEARCH BAR
          ================================================== */}

          <div className="relative max-w-lg mx-auto">

            <Search
              className="absolute left-4 top-1/2
                         -translate-y-1/2
                         h-4 w-4
                         text-gray-400"
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder="Search problems or categories…"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="
                w-full
                pl-11
                pr-4
                py-3
                glass-surface
                rounded-xl
                border
                border-pink-500/20
                text-white
                placeholder:text-gray-500
                bg-transparent
                focus:outline-none
                focus:border-pink-400/60
                transition-colors
                duration-300
                text-sm
              "
              aria-label="Search problem statements"
            />

          </div>
        </motion.div>


        {/* =================================================
            COMING SOON
        ================================================== */}

        <ComingSoon
          title="Coming Soon"
          description="We are curating cutting-edge problem statements across various technological domains. Each challenge is designed to push the boundaries of innovation and create real-world impact. Stay tuned for the full list!"
        />

      </main>

    </div>
  );
};

export default ProblemStatementsContent;

