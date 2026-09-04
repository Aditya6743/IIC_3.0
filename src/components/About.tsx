import React, { useRef } from 'react';
import { Code, Lightbulb, Users, Trophy, Sparkles } from 'lucide-react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: <Code className="h-7 w-7 text-pink-400" aria-hidden="true" />,
    title: 'Code with Purpose',
    description:
      'Build innovative solutions that address real-world challenges across various domains.',
    color: 'from-pink-500/20 to-rose-600/20',
    border: 'group-hover:border-pink-400/50',
  },
  {
    icon: <Lightbulb className="h-7 w-7 text-cyan-400" aria-hidden="true" />,
    title: 'Learn & Grow',
    description:
      'Expand your skills through workshops, mentorship sessions, and hands-on experience.',
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'group-hover:border-cyan-400/50',
  },
  {
    icon: <Users className="h-7 w-7 text-purple-400" aria-hidden="true" />,
    title: 'Connect & Collaborate',
    description:
      'Network with fellow developers, designers, and industry professionals.',
    color: 'from-purple-500/20 to-indigo-600/20',
    border: 'group-hover:border-purple-400/50',
  },
  {
    icon: <Trophy className="h-7 w-7 text-yellow-400" aria-hidden="true" />,
    title: 'Win Big',
    description:
      'Compete for substantial prizes and recognition for your innovative solutions.',
    color: 'from-yellow-500/20 to-orange-600/20',
    border: 'group-hover:border-yellow-400/50',
  },
];

const InteractiveFeatureCard = ({ feature, index, isInView }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{
        duration: 0.55,
        delay: 0.1 + index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="h-full"
    >
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`relative overflow-hidden h-full p-6 group bg-black/40 backdrop-blur-md border border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(236,72,153,0.15)]`}
      >
        {/* Flashlight Reveal Glow */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(236,72,153,0.1), transparent 60%)`
            )
          }}
        />
        
        {/* Animated Border Trace */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            border: '1px solid transparent',
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(150px circle at ${x}px ${y}px, rgba(236,72,153,0.5), transparent 100%) border-box`
            ),
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        <CardContent className="p-0 relative z-20 flex flex-col h-full">
          <div
            className={`bg-gradient-to-br ${feature.color} inline-flex p-3.5 rounded-xl mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]`}
          >
            {feature.icon}
          </div>
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-pink-400 transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed flex-grow group-hover:text-gray-300 transition-colors duration-300">
            {feature.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      
      ref={sectionRef}
      className="w-full"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 md:px-6">



        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <InteractiveFeatureCard key={index} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;