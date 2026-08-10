import React, { useRef } from 'react';
import { Trophy, Award, Crown, Zap } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const prizes = [
  {
    position: '2nd Place',
    icon: <Trophy className="h-12 w-12 text-gray-300" aria-hidden="true" />,
    prize: '₹50,000',
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
    glow: 'rgba(180, 180, 180, 0.15)',
    borderColor: 'border-gray-400/30 group-hover:border-gray-400/60',
    order: 'order-2 lg:order-1',
    scale: 'lg:scale-95',
  },
  {
    position: '1st Place',
    icon: <Crown className="h-14 w-14 text-yellow-400" aria-hidden="true" />,
    prize: '₹75,000',
    gradient: 'from-yellow-400 via-orange-500 to-red-500',
    glow: 'rgba(255, 165, 0, 0.15)',
    borderColor: 'border-yellow-400/40 group-hover:border-yellow-400/70',
    order: 'order-1 lg:order-2',
    scale: 'lg:scale-105',
    featured: true,
  },
  {
    position: '3rd Place',
    icon: <Award className="h-12 w-12 text-amber-600" aria-hidden="true" />,
    prize: '₹25,000',
    gradient: 'from-amber-600 via-amber-700 to-amber-800',
    glow: 'rgba(180, 80, 0, 0.15)',
    borderColor: 'border-amber-600/30 group-hover:border-amber-600/60',
    order: 'order-3 lg:order-3',
    scale: 'lg:scale-95',
  },
];

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
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full mb-5">
            <Trophy className="h-7 w-7 text-yellow-400" aria-hidden="true" />
          </div>
          <h2
            id="prizes-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Prizes &amp; <span className="gradient-text">Rewards</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ₹7L+ in cash prizes, plus invaluable opportunities, mentorship, and
            resources for winners.
          </p>
        </motion.div>

        {/* Prize Podium */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              className={`${prize.order} ${prize.scale} transition-transform duration-300`}
              variants={fadeUp}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              transition={{ duration: 0.55, delay: 0.15 + index * 0.12 }}
            >
              <Card
                className={`relative overflow-hidden text-center p-8 group border ${prize.borderColor} transition-all duration-300 ${prize.featured ? 'shadow-glass-hover' : ''}`}
              >
                {/* Background gradient tint */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prize.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                {/* Featured badge */}
                {prize.featured && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full">
                      <Zap size={10} aria-hidden="true" />
                      Top Prize
                    </span>
                  </div>
                )}

                <CardContent className="p-0 relative z-10">
                  <div className="inline-flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10 p-5 rounded-full mb-5 transition-transform duration-300 group-hover:scale-110">
                    {prize.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">
                    {prize.position}
                  </h3>
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {prize.prize}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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