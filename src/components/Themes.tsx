import React, { useRef } from 'react';
import {
  Lightbulb, Shield, AlertTriangle, UserCheck,
  Lock, Monitor, Home, Heart, Building, Rocket,
  BookOpen, Sprout, GraduationCap,
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const themes = [
  { icon: <Shield className="h-7 w-7 text-yellow-400" aria-hidden="true" />, title: 'Defense Tech & Strategic Innovation', color: 'from-yellow-500/20 to-orange-500/20', hover: 'hover:border-yellow-400/50' },
  { icon: <AlertTriangle className="h-7 w-7 text-red-400" aria-hidden="true" />, title: 'Disaster Management & Relief', color: 'from-red-500/20 to-orange-600/20', hover: 'hover:border-red-400/50' },
  { icon: <UserCheck className="h-7 w-7 text-pink-400" aria-hidden="true" />, title: 'Women & Child Safety', color: 'from-pink-500/20 to-rose-600/20', hover: 'hover:border-pink-400/50' },
  { icon: <Lock className="h-7 w-7 text-cyan-400" aria-hidden="true" />, title: 'Border & Homeland Security', color: 'from-cyan-500/20 to-blue-600/20', hover: 'hover:border-cyan-400/50' },
  { icon: <Monitor className="h-7 w-7 text-purple-400" aria-hidden="true" />, title: 'Cyber Vigilance & Digital Sovereignty', color: 'from-purple-500/20 to-indigo-600/20', hover: 'hover:border-purple-400/50' },
  { icon: <Home className="h-7 w-7 text-green-400" aria-hidden="true" />, title: 'Rural Empowerment & Smart Villages', color: 'from-green-500/20 to-emerald-600/20', hover: 'hover:border-green-400/50' },
  { icon: <Heart className="h-7 w-7 text-pink-500" aria-hidden="true" />, title: 'Healthcare & Mental Wellness', color: 'from-pink-600/20 to-red-500/20', hover: 'hover:border-pink-500/50' },
  { icon: <Building className="h-7 w-7 text-blue-400" aria-hidden="true" />, title: 'Urban Infrastructure & Smart Cities', color: 'from-blue-500/20 to-cyan-600/20', hover: 'hover:border-blue-400/50' },
  { icon: <Rocket className="h-7 w-7 text-indigo-400" aria-hidden="true" />, title: 'Space & Aerotech Innovation', color: 'from-indigo-500/20 to-purple-600/20', hover: 'hover:border-indigo-400/50' },
  { icon: <BookOpen className="h-7 w-7 text-orange-400" aria-hidden="true" />, title: 'Digital Literacy & Access for All', color: 'from-orange-500/20 to-amber-600/20', hover: 'hover:border-orange-400/50' },
  { icon: <Sprout className="h-7 w-7 text-green-500" aria-hidden="true" />, title: 'Smart & Sustainable Agriculture', color: 'from-green-600/20 to-lime-500/20', hover: 'hover:border-green-500/50' },
  { icon: <GraduationCap className="h-7 w-7 text-teal-400" aria-hidden="true" />, title: 'Education & Skill Development', color: 'from-teal-500/20 to-cyan-600/20', hover: 'hover:border-teal-400/50' },
];

const Themes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="themes"
      ref={sectionRef}
      className="py-24 space-bg"
      aria-labelledby="themes-heading"
    >
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full mb-5">
            <Lightbulb className="h-7 w-7 text-yellow-400" aria-hidden="true" />
          </div>
          <h2
            id="themes-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Themes <span className="gradient-text">IIC 3.0</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore 12 diverse challenge tracks where innovation meets impact. Choose
            your theme and craft solutions that redefine the future.
          </p>
        </motion.div>

        {/* Theme Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {themes.map((theme, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 + index * 0.06, duration: 0.45 }}
            >
              <Card
                className={`flex flex-col items-center text-center p-5 group border border-pink-500/10 ${theme.hover} h-full transition-all duration-300`}
              >
                <CardContent className="p-0">
                  <div
                    className={`bg-gradient-to-br ${theme.color} inline-flex p-3.5 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {theme.icon}
                  </div>
                  <h3 className="text-sm font-medium text-gray-200 leading-snug">
                    {theme.title}
                  </h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Themes;
