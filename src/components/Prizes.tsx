import React, { useRef } from 'react';
import { Trophy, Award, Crown, Zap } from 'lucide-react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const prizes = [
  {
    position: 'Winner',
    icon: <Crown className="h-14 w-14 text-yellow-400" aria-hidden="true" />,
    prize: '₹1,00,000',
    description: '1 Lakh cash prize',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glow: 'rgba(255, 165, 0, 0.15)',
    borderColor: 'border-yellow-400/40 group-hover:border-yellow-400/70',
    order: 'order-1 lg:order-2',
    scale: 'lg:scale-105',
    featured: true,
  },
  {
    position: '1st Runner Up',
    icon: <Trophy className="h-12 w-12 text-gray-300" aria-hidden="true" />,
    prize: '₹75,000',
    description: '75K cash prize',
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
    glow: 'rgba(180, 180, 180, 0.15)',
    borderColor: 'border-gray-400/30 group-hover:border-gray-400/60',
    order: 'order-2 lg:order-1',
    scale: 'lg:scale-95',
  },
  {
    position: '2nd Runner Up',
    icon: <Award className="h-12 w-12 text-amber-600" aria-hidden="true" />,
    prize: '₹50,000',
    description: '50K cash prize',
    gradient: 'from-amber-600 via-amber-700 to-amber-800',
    glow: 'rgba(180, 80, 0, 0.15)',
    borderColor: 'border-amber-600/30 group-hover:border-amber-600/60',
    order: 'order-3 lg:order-3',
    scale: 'lg:scale-95',
  },
  {
    position: 'Paid Internship, Rewards and Other Benefits',
    icon: <Zap className="h-12 w-12 text-cyan-300" aria-hidden="true" />,
    prize: '₹4,75,000',
    description: 'Goodies, hampers, courses, paid internship and incubation opportunity, recommendation certificate, etc.',
    gradient: 'from-cyan-400 via-teal-500 to-emerald-500',
    glow: 'rgba(45, 212, 191, 0.15)',
    borderColor: 'border-cyan-400/30 group-hover:border-cyan-400/60',
    order: 'order-4 lg:order-4 md:col-span-3',
    scale: 'lg:scale-95',
  },
];

const InteractivePrizeCard = ({ prize, index, isInView }: any) => {
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -15, scale: 1.02 }}
      className={`${prize.order} ${prize.scale} transition-all duration-300 relative group`}
      variants={fadeUp}
      initial="initial"
      animate={isInView ? 'animate' : 'initial'}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
    >
      <Card
        className={`relative overflow-hidden text-center p-8 border ${prize.borderColor} bg-black/40 backdrop-blur-xl h-full transition-all duration-300 ${prize.featured ? 'shadow-[0_0_30px_rgba(255,165,0,0.2)]' : 'hover:shadow-glass-hover'}`}
      >
        {/* Holographic Glare Effect */}
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-screen"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`
            )
          }}
        />
        
        {/* Background gradient tint */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}
          aria-hidden="true"
        />

        {/* Featured badge */}
        {prize.featured && (
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-30">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full shadow-[0_0_15px_rgba(255,165,0,0.5)]">
              <Zap size={10} aria-hidden="true" />
              Top Prize
            </span>
          </div>
        )}

        <CardContent className="p-0 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 p-5 rounded-full mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            {prize.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-300 mb-2">
            {prize.position}
          </h3>
          <div className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-3 group-hover:from-white group-hover:to-white transition-colors duration-300">
            {prize.prize}
          </div>
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
            {prize.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Prizes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="prizes"
      ref={sectionRef}
      className="py-24 space-bg"
      aria-labelledby="prizes-heading"
    >
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="prizes-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Rewards <span className="gradient-text">and Prizes</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ₹7 Lakh+ prize pool, plus invaluable opportunities, mentorship, and
            resources for winners.
          </p>
        </motion.div>

        {/* Prize Podium */}
        {/* Prize Podium */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-end">
          {prizes.map((prize, index) => (
            <InteractivePrizeCard key={index} prize={prize} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Additional prizes note */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Special category prizes, swag packs, and sponsor goodies to be announced.
        </motion.p>
      </div>
    </section>
  );
};

export default Prizes;