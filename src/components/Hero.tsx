
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Rocket } from 'lucide-react';
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import SplitText from './SplitText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const Hero: React.FC = () => {
  const [flipDegrees, setFlipDegrees] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const isFirstLoad = useRef(!sessionStorage.getItem('hasSeenPreloader')).current;
  const baseDelay = isFirstLoad ? 2.7 : 0;

  // 3D Parallax & Brightness State (Optimized with Framer Motion, no React re-renders)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const rawBrightness = useMotionValue(1);
  const rawBtnX = useMotionValue(0);
  const rawBtnY = useMotionValue(0);

  // Smooth Springs for performance
  const springConfig = { damping: 25, stiffness: 70, mass: 1 };
  const rotateX = useSpring(rawMouseX, springConfig);
  const rotateY = useSpring(rawMouseY, springConfig);
  const brightness = useSpring(rawBrightness, springConfig);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const btnSpringX = useSpring(rawBtnX, { stiffness: 150, damping: 15, mass: 0.5 });
  const btnSpringY = useSpring(rawBtnY, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Up to 15 degrees tilt based on cursor position
    const rotateYVal = ((x - centerX) / centerX) * 15;
    const rotateXVal = -((y - centerY) / centerY) * 15;
    
    rawMouseX.set(rotateXVal || 0);
    rawMouseY.set(rotateYVal || 0);

    // Proximity brightness (max 1.25 when cursor is in the dead center)
    const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDist = Math.max(rect.width, rect.height) / 2;
    if (maxDist > 0) {
      const intensity = Math.max(0, 1 - dist / maxDist);
      rawBrightness.set(1 + intensity * 0.35);
    }
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    rawMouseX.set(0);
    rawMouseY.set(0);
    rawBrightness.set(1);
  };

  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    rawBtnX.set(x * 0.2);
    rawBtnY.set(y * 0.2);
  };

  const handleBtnLeave = () => {
    if (shouldReduceMotion) return;
    rawBtnX.set(0);
    rawBtnY.set(0);
  };

  useEffect(() => {
    if (shouldReduceMotion) return;
    // GSAP subtle parallax on the background for depth
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg-layer', {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-16 overflow-hidden flex items-center bg-transparent"
      aria-label="Hero section"
    >
      {/* Subtle Background Depth Layer */}
      <div className="hero-bg-layer absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

          {/* Left — Typography & Content (approx 45% width) */}
          <motion.div
            className="w-full lg:w-[45%] z-20 flex-shrink-0"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
          >
            {/* <motion.div variants={fadeUp}>
              <Badge variant="outline" className="px-5 py-2 text-sm mb-8 inline-flex bg-cyan-950/30 border-cyan-500/30 backdrop-blur-md">
                <Rocket size={14} className="mr-2 text-cyan-400" aria-hidden="true" />
                <span className="text-cyan-100 tracking-wide font-medium">Submissions are now open</span>
              </Badge>
            </motion.div> */}

            <h1 className="text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight flex flex-col">
              <div className="flex items-center">
                {/* Letter by Letter IIC */}
                {['I', 'I', 'C'].map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                    animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                    transition={{ delay: baseDelay + 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
                
                {/* 3.0 follows immediately after */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: baseDelay + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 ml-4"
                >
                  3.0
                </motion.span>
              </div>

              {/* Innovation Unleashed follows */}
              <div className="mt-3 overflow-hidden">
                <SplitText 
                  text="Innovation Unleashed" 
                  delay={baseDelay + 0.3} 
                  staggerDelay={0.08}
                  className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light tracking-tight"
                  wordClassName="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 pb-2"
                />
              </div>
            </h1>

            <div className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg font-light">
              <SplitText 
                text="We're back with bigger impact and bolder innovation. Join the most anticipated technology conference and hackathon of 2026."
                delay={baseDelay + 0.5}
                staggerDelay={0.03}
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: baseDelay + 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <motion.button
                ref={btnRef}
                onMouseMove={handleBtnMove}
                onMouseLeave={handleBtnLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ x: btnSpringX, y: btnSpringY }}
                className="relative px-10 py-5 bg-cyan-400 text-cyan-950 font-black uppercase tracking-widest text-sm rounded-full overflow-hidden group shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-shadow duration-300 border border-cyan-300/50"
                onClick={() =>
                  window.open(
                    'https://forms.gle/5g6k1Z7Q8v9x1Y2F9',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                {/* Cyber Matrix Glitch Hover Effect */}
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                
                {/* Dynamic Light Sweep */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] group-hover:animate-sweep" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-950 animate-pulse" />
                  Submit Project
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: baseDelay + 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 text-gray-500 text-sm tracking-wide uppercase font-medium"
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
                <span>Sep 8–9, 2026</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                <span>MUJ Campus</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Hero 3D Graphic Rehaul (Epic Cinematic Orbital Construct) */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full lg:w-[55%] relative flex justify-end items-center lg:-translate-y-8 lg:translate-x-8 xl:translate-x-12 pointer-events-auto"
            style={{ perspective: 1500 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: baseDelay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="relative w-full max-w-[550px] xl:max-w-[650px] aspect-square flex justify-center items-center mx-auto lg:mr-0 transition-all duration-200 ease-out"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', filter }}
            >
              {/* Entrance Spin Wrapper */}
              <motion.div
                className="relative z-10 w-full"
                initial={{ opacity: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  rotateY: [-360, 0], // Explicit keyframes force a full 360 revolution
                  rotateX: [30, 0] 
                } : {}}
                transition={{ delay: baseDelay + 0.2, duration: 1.8, ease: [0.16, 1, 0.3, 1] }} // Premium Expo-Out curve guarantees rotation completes smoothly
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Interactive Flip Wrapper */}
                <motion.div
                  animate={{ rotateY: flipDegrees }}
                  transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 15 }}
                  onDoubleClick={() => setFlipDegrees(prev => prev + 360)}
                  whileHover={{ scale: 1.05 }}
                  style={{ transformStyle: 'preserve-3d', cursor: 'grab' }}
                  whileTap={{ cursor: 'grabbing', scale: 0.95 }}
                  className="group relative"
                >
                  {/* Continuous Float Animation */}
                  {/* Dedicated hardware-accelerated glow (avoids drop-shadow flickering) */}
                  <div className="absolute inset-0 w-full h-full bg-cyan-400/15 blur-[50px] rounded-full transition-opacity duration-500 opacity-30 group-hover:opacity-60" style={{ transform: 'translateZ(20px)' }} />
                  
                  {/* Continuous Float Animation */}
                  <motion.img
                    src="/hero-iic.png"
                    alt="IIC 3.0 3D Logo"
                    className="relative w-full h-auto object-contain transition-[filter] duration-500 hover:brightness-110"
                    style={{ transform: 'translateZ(60px)', clipPath: 'inset(0 3% 0 3%)' }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Custom Animations */}
            <style>
              {`
                @keyframes sweep {
                  0% { transform: translateX(-100%) skewX(-15deg); }
                  100% { transform: translateX(200%) skewX(-15deg); }
                }
              `}
            </style>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;