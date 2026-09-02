import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming Soon',
  description,
  icon,
  className = '',
}) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={sectionRef}
      className={`relative w-full py-16 px-4 overflow-hidden ${className}`}
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial={shouldReduceMotion ? 'visible' : 'hidden'}
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Animated Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 grid-bg opacity-[0.12]" />

        {/* Animated Radial Glows */}
        <div
          className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-cyan-900/30 rounded-full blur-[120px]"
          style={{
            animation: shouldReduceMotion ? 'none' : 'glow-float 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-emerald-900/25 rounded-full blur-[100px]"
          style={{
            animation: shouldReduceMotion ? 'none' : 'glow-float 14s ease-in-out infinite reverse',
            animationDelay: '-3s',
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-cyan-800/15 rounded-full blur-[80px]"
          style={{
            animation: shouldReduceMotion ? 'none' : 'glow-pulse 8s ease-in-out infinite',
          }}
        />

        {/* Floating Shapes */}
        <div className="floating-shapes" />
      </div>

      {/* Custom Background Animations */}
      <style>{`
        @keyframes glow-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -40px) scale(1.08); }
          50% { transform: translate(-15px, -20px) scale(0.94); }
          75% { transform: translate(-35px, 15px) scale(1.04); }
        }

        @keyframes glow-pulse {
          0%, 100% { opacity: 0.4; transform: translate(-50%, 0) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -10px) scale(1.1); }
        }
      `}</style>

      <div className="relative mx-auto w-full max-w-lg">
        {/* Gradient Glow Border */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-3xl blur opacity-20 transition duration-1000" aria-hidden="true" />
        
        {/* Glass Card */}
        <motion.div
          className="relative glass-card border border-white/10 rounded-3xl p-10 md:p-14 text-center flex flex-col items-center bg-[#05131b]/80 backdrop-blur-xl shadow-2xl"
          variants={shouldReduceMotion ? undefined : itemVariants}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              className="p-4 rounded-full bg-white/5 border border-white/10 mb-8 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
              variants={shouldReduceMotion ? undefined : itemVariants}
              animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-cyan-400">{icon}</span>
            </motion.div>
          )}

          {/* Heading */}
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight"
            variants={shouldReduceMotion ? undefined : itemVariants}
          >
            {title.split(' ').map((word, i) => (
              <span
                key={i}
                className={
                  word.toLowerCase() === 'soon'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400'
                    : ''
                }
              >
                {word}{i < title.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h2>

          {/* Divider */}
          <motion.div
            className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full mb-6 mx-auto"
            variants={shouldReduceMotion ? undefined : itemVariants}
            aria-hidden="true"
          />

          {/* Description */}
          {description && (
            <motion.p
              className="text-gray-400 text-base md:text-lg leading-relaxed"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ComingSoon;
