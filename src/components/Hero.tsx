import React, { useEffect, useRef } from 'react';
import { Zap, Calendar, MapPin, Rocket, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // GSAP subtle parallax on the decorative blobs
    const ctx = gsap.context(() => {
      gsap.to('.hero-blob-1', {
        y: -50,
        x: 20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      gsap.to('.hero-blob-2', {
        y: -30,
        x: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    'Open to all innovators',
    '₹7L+ in goodies and prizes',
    'Expert mentorship',
    'Global networking opportunities',
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen pt-24 pb-16 overflow-hidden flex items-center bg-transparent"
      aria-label="Hero section"
    >

      <div
        className="hero-blob-1 absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #6ee7b7 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="hero-blob-2 absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' }}
        aria-hidden="true"
      />


      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Left — Content */}
          <motion.div
            className="max-w-2xl w-full"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="default" className="px-4 py-1.5 text-sm mb-6 inline-flex">
                <Rocket size={14} className="mr-1.5 text-pink-400" aria-hidden="true" />
                <span className="gradient-text font-semibold">Submissions started!</span>
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              <span className="gradient-text">IIC</span>{' '}
              <span className="text-pink-400">2.0</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-cyan-300 font-light">
                Innovation Unleashed
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl"
            >
              We're back with bigger impact and bolder innovation. Join the most
              anticipated hackathon of 2025 where dreams become reality.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                variant="neon"
                size="lg"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                Submit Project
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-pink-400 flex-shrink-0" aria-hidden="true" />
                <span>September 8–9, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-cyan-400 flex-shrink-0" aria-hidden="true" />
                <span>Manipal University Jaipur</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Highlights Card */}
          <motion.div
            ref={cardRef}
            className="relative w-full max-w-sm lg:max-w-md"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Decorative glow blobs behind card */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full opacity-20 blur-2xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -left-4 w-36 h-36 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative z-10 glass-card p-8 rounded-2xl">
              {/* Card Header */}
              <div className="text-center mb-7">
                <div className="inline-block p-4 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-4">
                  <Zap className="h-8 w-8 text-pink-400" aria-hidden="true" />
                </div>
                <h2 className="gradient-text text-2xl font-bold mb-1">Get Ready!</h2>
                <p className="text-gray-400 text-sm">The future starts here</p>
              </div>

              {/* Highlights List */}
              <ul className="space-y-3 mb-6" aria-label="Event highlights">
                {highlights.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-pink-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Quote footer */}
              <div className="mt-2 p-4 glass-surface rounded-xl border border-pink-500/20">
                <p className="text-pink-300 text-center text-sm font-medium italic">
                  "Where Innovation Meets Opportunity"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;