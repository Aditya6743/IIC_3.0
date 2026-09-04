import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TaglineText = () => (
  <div className="flex flex-col items-center justify-center text-center leading-[0.95] font-black w-full uppercase py-4">
    <span className="block text-[12vw] md:text-[9vw] tracking-tighter">36-HOURS.</span>
    <span className="block text-[12vw] md:text-[9vw] tracking-tighter">ONE STAGE.</span>
    <span className="block text-[8vw] md:text-[6vw] tracking-tighter mt-4 md:mt-6">INFINITE POSSIBILITIES.</span>
  </div>
);

const TypographyMask: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const clipProgress = useTransform(scrollYProgress, (progress) => {
    const [start, end] = isMobile ? [0.05, 0.75] : [0.2, 0.8];
    if (progress <= start) return 100;
    if (progress >= end) return 0;
    return 100 - ((progress - start) / (end - start)) * 100;
  });

  const scale = useTransform(scrollYProgress, (progress) => {
    const [start, end] = isMobile ? [0, 0.15] : [0, 0.2];
    const [minScale, maxScale] = isMobile ? [0.92, 1] : [0.95, 1];
    if (progress <= start) return minScale;
    if (progress >= end) return maxScale;
    return minScale + ((progress - start) / (end - start)) * (maxScale - minScale);
  });

  return (
    <section ref={containerRef} className="relative h-[135vh] md:h-[250vh] bg-transparent z-10 w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        <motion.div style={{ scale }} className="relative flex flex-col items-center justify-center w-full">
          
          <p className="text-cyan-400 tracking-[0.4em] text-xs md:text-sm font-semibold mb-8 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            The Future is Now
          </p>

          <div className="relative flex items-center justify-center w-full px-4">
            
            {/* UN-FILLED TEXT (Premium Space-Gray Metallic / Glass) */}
            <div 
              className="w-full bg-gradient-to-b from-gray-600 via-gray-800 to-[#02080a]" 
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)' 
              }}
            >
              <TaglineText />
            </div>

            {/* FILLED TEXT (Scroll-driven glowing mask) */}
            <motion.div 
              className="absolute inset-0 w-full bg-gradient-to-b from-cyan-200 via-cyan-400 to-emerald-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                clipPath: useTransform(clipProgress, (val) => `inset(${val}% 0 0 0)`),
                willChange: 'clip-path'
              }}
            >
              <TaglineText />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TypographyMask;
