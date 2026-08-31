import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  // Generate static particles so they don't jump on re-render
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    // Ultra-Fast & Smooth Premium Timeline
    const t1 = setTimeout(() => setPhase(1), 1600); // 0 -> 1.6s: Shards fly in
    const t2 = setTimeout(() => setPhase(2), 1700); // 1.6s -> 1.7s: Impact Flash
    const t3 = setTimeout(() => setPhase(3), 2700); // 1.7s -> 2.7s: Hold exactly 1 second, then float exit
    const t4 = setTimeout(() => onComplete(), 3600); // 3.6s: Fully unmount after fade completes

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex items-center justify-center overflow-hidden pointer-events-none"
      initial={{ backgroundColor: 'rgba(0,0,0,1)' }}
      animate={{ backgroundColor: phase >= 3 ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,1)' }}
      transition={{ duration: 0.8, ease: "easeIn" }} // Removed delay to start revealing instantly
      exit={{ opacity: 0 }}
    >
      {/* Background Elements (Fade out during the exit to reveal landing page) */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ opacity: phase >= 3 ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Smooth Apple-style ease
      >
        {/* 1. Ambient Core Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* 2. Floating Energy Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute bg-cyan-400 rounded-full"
              style={{
                width: p.size,
                height: p.size,
                left: p.left,
                top: p.top,
                boxShadow: '0 0 10px 2px rgba(34,211,238,0.8)'
              }}
              animate={{ y: [0, -150], opacity: [0, 1, 0] }}
              transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
            />
          ))}
        </div>

        {/* 3. Deep Vignette to keep focus on center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_100%)] pointer-events-none" />
      </motion.div>

      {/* 4. The Massive Impact Shockwave */}
      {phase === 2 && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-cyan-400 z-30 mix-blend-screen pointer-events-none"
          initial={{ width: '100px', height: '100px', opacity: 1 }}
          animate={{ width: '200vw', height: '200vw', opacity: 0, borderWidth: '0px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      )}

      <AnimatePresence mode="wait">
        
        {/* PHASE 1: Supreme 4-Corner Shard Assembly */}
        {phase < 2 && (
          <motion.div
            key="dispersed"
            className="relative w-80 md:w-[550px] aspect-square flex items-center justify-center z-40"
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.2 }}
          >
            {/* Top Left Quadrant */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(0% 0%, 51% 0%, 51% 51%, 0% 51%)' }}
              initial={{ x: -300, y: -300, rotate: -90, scale: 0.2, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.4, delay: 0 }}
            >
              <img src="/hero-iic.png" alt="TL" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]" />
            </motion.div>

            {/* Top Right Quadrant */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 51%, 50% 51%)' }}
              initial={{ x: 300, y: -300, rotate: 90, scale: 0.2, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.4, delay: 0.15 }}
            >
              <img src="/hero-iic.png" alt="TR" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]" />
            </motion.div>

            {/* Bottom Left Quadrant */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(0% 50%, 51% 50%, 51% 100%, 0% 100%)' }}
              initial={{ x: -300, y: 300, rotate: -90, scale: 0.2, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.4, delay: 0.3 }}
            >
              <img src="/hero-iic.png" alt="BL" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(16,185,129,0.8)]" />
            </motion.div>

            {/* Bottom Right Quadrant */}
            <motion.div
              className="absolute inset-0"
              style={{ clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }}
              initial={{ x: 300, y: 300, rotate: 90, scale: 0.2, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, type: 'spring', bounce: 0.4, delay: 0.45 }}
            >
              <img src="/hero-iic.png" alt="BR" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]" />
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* PHASE 2 & 3: Unified Logo + Premium Float Wipe */}
      {phase >= 2 && (
        <motion.div
          key="unified-container"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 z-40"
        >
          {/* Flash bang when logo unifies */}
          {phase === 2 && (
            <motion.div
              className="absolute inset-0 bg-white z-50 mix-blend-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
            />
          )}
          
          <div className="relative z-40 w-full flex justify-center">
            
            {/* The Unified 3D Logo (Premium Minimalist Float & Fade) */}
            <motion.img
              src="/hero-iic.png"
              alt="IIC Unified"
              className="w-80 md:w-[550px] aspect-square object-contain drop-shadow-[0_0_80px_rgba(34,211,238,0.8)]"
              initial={{ scale: 1.15, filter: 'brightness(1.5)', y: 0 }}
              animate={
                phase === 3 
                  ? { 
                      scale: 0.9,     // Shrinks slightly for elegance
                      y: -80,         // Floats smoothly upwards
                      opacity: 0,     // Fades out
                      filter: 'brightness(1) blur(15px)' // Soft cinematic blur on exit
                    }
                  : { scale: 1, y: 0, opacity: 1, filter: 'brightness(1) blur(0px)' }
              }
              transition={
                phase === 3 
                  ? { duration: 1.0, ease: [0.16, 1, 0.3, 1] } // Apple-style Expo Out curve for ultra-premium feel
                  : { duration: 1.5, type: 'spring' }
              }
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Preloader;
