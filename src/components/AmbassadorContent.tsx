import React, { useRef } from 'react';
import { Users, Award, Star, Zap, Gift, Network, Trophy, TrendingUp, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const perks = [
  { icon: <Award className="h-7 w-7 text-yellow-400" aria-hidden="true" />, title: 'Recognition Certificate & Goodies', description: 'Official certificate for your leadership and contribution. Cool swags, gadgets and exclusive merch!', color: 'from-yellow-500/20 to-orange-500/20', hover: 'hover:border-yellow-400/50' },
  { icon: <Gift className="h-7 w-7 text-pink-400" aria-hidden="true" />, title: 'Exclusive Perks', description: 'Ambassador-only swags and VIP access to special events and sessions.', color: 'from-pink-500/20 to-rose-600/20', hover: 'hover:border-pink-400/50' },
  { icon: <Network className="h-7 w-7 text-cyan-400" aria-hidden="true" />, title: 'Participation Certificate & Networking', description: 'Connect with top peers and tech leaders. Build valuable professional relationships.', color: 'from-cyan-500/20 to-blue-600/20', hover: 'hover:border-cyan-400/50' },
  { icon: <Trophy className="h-7 w-7 text-purple-400" aria-hidden="true" />, title: 'Performance Rewards', description: '8+ signups = free team entry, social media shoutout, and website feature.', color: 'from-purple-500/20 to-indigo-600/20', hover: 'hover:border-purple-400/50' },
  { icon: <TrendingUp className="h-7 w-7 text-green-400" aria-hidden="true" />, title: 'Skill Development & Resume Boost', description: 'Showcase leadership, communication, and tech community building skills.', color: 'from-green-500/20 to-emerald-600/20', hover: 'hover:border-green-400/50' },
  { icon: <Star className="h-7 w-7 text-orange-400" aria-hidden="true" />, title: 'Early Access', description: 'Get first access to event updates, workshops, and exclusive content.', color: 'from-orange-500/20 to-amber-600/20', hover: 'hover:border-orange-400/50' },
];

const responsibilities = [
  'Promote IIC 2.0 on your campus and social media',
  'Organize tech talks and awareness sessions',
  'Help students with registration and queries',
  'Share event updates and announcements',
  'Build a community of tech enthusiasts',
  'Collect feedback and suggestions from participants',
];

const stats = [
  { number: '500+', label: 'Students Reached' },
  { number: '50+', label: 'Campus Partners' },
  { number: '100%', label: 'Career Growth' },
  { number: '24/7', label: 'Community Support' },
];

const AmbassadorContent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg">
      <main className="container mx-auto px-4 py-20" ref={sectionRef}>

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Users className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join the <span className="gradient-text">Movement</span>
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Be a part of something bigger! Become a{' '}
            <span className="gradient-text font-semibold">Campus Ambassador</span>{' '}
            and help us build a thriving, innovative community.
          </p>
        </motion.div>

        {/* Perks */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-3 mb-10">
            <Sparkles className="h-6 w-6 text-pink-400" aria-hidden="true" />
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">
              Ambassador Perks &amp; Benefits
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
              >
                <Card className={`p-6 group border border-pink-500/10 ${perk.hover} h-full transition-all duration-300`}>
                  <CardContent className="p-0">
                    <div className={`bg-gradient-to-br ${perk.color} inline-flex p-3.5 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110`}>
                      {perk.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{perk.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{perk.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Responsibilities & Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="p-8 h-full border border-pink-500/20">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-5 w-5 text-pink-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold gradient-text">Your Responsibilities</h3>
                </div>
                <ul className="space-y-4" aria-label="Ambassador responsibilities">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-gradient-to-r from-pink-400 to-cyan-400 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Card className="p-8 h-full border border-pink-500/20">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold gradient-text mb-7">Why Become an Ambassador?</h3>
                <div className="grid grid-cols-2 gap-5">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center p-4 glass-surface rounded-xl border border-pink-500/10">
                      <div className="text-3xl font-bold gradient-text mb-1">{stat.number}</div>
                      <div className="text-gray-400 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45 }}
        >
          <Card className="p-8 max-w-2xl mx-auto border border-yellow-400/20">
            <CardContent className="p-0">
              <div className="flex items-center justify-center gap-3 mb-5">
                <Trophy className="h-7 w-7 text-yellow-400" aria-hidden="true" />
                <h3 className="text-2xl font-bold gradient-text">Ready to Lead?</h3>
              </div>
              <p className="text-gray-400 mb-7 leading-relaxed">
                Applications are now open! Join our community of passionate leaders and make
                a real impact on your campus.
              </p>
              <Button
                variant="neon"
                size="lg"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/e/1FAIpQLSe6ijcmxTn81PlqAFyGi8QxcUmkxcaGJZT5OoOfFGsIFegi4Q/viewform',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                Apply Now
              </Button>
              <p className="text-gray-500 text-xs mt-4">
                Applications close soon. Don't miss your chance to be part of the movement!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default AmbassadorContent;