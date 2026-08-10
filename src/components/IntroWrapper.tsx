import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const IntroWrapper: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    navigate('/home');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleEnter();
    }
  };

  return (
    <div
      className="min-h-screen relative text-white overflow-hidden font-mono"
      style={{ background: 'radial-gradient(ellipse at center, #051820 0%, #030f14 100%)' }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="IIC 2.0 Intro Screen — Press Enter to continue"
    >
      {/* Transparent background container */}
      <div className="absolute inset-0 z-0 bg-transparent" aria-hidden="true">
      </div>

      {/* Subtle cyber-grid overlay on top of stars */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(20,184,166,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(20,184,166,0.04) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />


      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {/* Grid pulse overlay */}
            <motion.div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 20, 147, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
              animate={{ opacity: [0.05, 0.2, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />

            {/* Logo with scan-line effect */}
            <motion.div
              className="relative mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <img
                id="iic-intro-logo"
                alt="IIC 2.0"
                src="/iic-logo.png"
                width="600"
                className="max-w-[85vw]"
              />
              {/* Scan line */}
              <motion.div
                className="absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60"
                style={{ top: '50%' }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Tagline */}
            <motion.div
              className="relative mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-gray-300 text-lg sm:text-2xl tracking-wider leading-relaxed font-light">
                <motion.span
                  className="inline-block mr-2 text-pink-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  aria-hidden="true"
                >
                  {'>'}
                </motion.span>
                We are{' '}
                <span className="text-pink-400 font-semibold">Back:</span>{' '}
                Bigger in{' '}
                <span className="text-cyan-400 font-semibold">Impact</span>
                {'; '}
                Bolder in{' '}
                <span className="text-purple-400 font-semibold">Innovation.</span>
                <motion.span
                  className="inline-block ml-2 text-pink-400"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  aria-hidden="true"
                >
                  {'<'}
                </motion.span>
                {/* Cursor */}
                <motion.span
                  className="inline-block w-0.5 h-5 bg-pink-400 ml-2 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  aria-hidden="true"
                />
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-pink-400 opacity-60" aria-hidden="true" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-pink-400 opacity-60" aria-hidden="true" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-pink-400 opacity-60" aria-hidden="true" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-pink-400 opacity-60" aria-hidden="true" />

              <button
                onClick={handleEnter}
                className="modern-button neon-button relative px-14 py-5 rounded-lg text-lg font-bold text-white transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
                style={{ letterSpacing: '3px' }}
                aria-label="Enter IIC 2.0 — Revolutionize The World"
              >
                {/* Shimmer */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
                <span className="relative z-10">Revolutionize The World</span>
              </button>
            </motion.div>

            {/* Hint text */}
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <motion.p
                className="text-pink-400 tracking-widest text-sm mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                // Make your dreams come true...
              </motion.p>
              <p className="text-cyan-300/60 text-xs font-light">[ Press ENTER to JOIN US ]</p>
            </motion.div>

            {/* Floating pings */}
            {[
              { top: '25%', left: '25%', color: 'bg-pink-400', delay: '0s' },
              { top: '75%', right: '25%', color: 'bg-cyan-400', delay: '1s' },
              { top: '50%', left: '15%', color: 'bg-purple-400', delay: '2s' },
            ].map((dot, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 ${dot.color} rounded-full animate-ping`}
                style={{ top: dot.top, left: dot.left, right: (dot as { right?: string }).right, animationDelay: dot.delay }}
                aria-hidden="true"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroWrapper;