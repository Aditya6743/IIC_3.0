import React, { useRef } from 'react';
import { Check, Rocket, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

const benefits = [
  'Connect with industry professionals and peers',
  'Compete for ₹7L+ in prizes',
  'Learn new skills and technologies',
  'Build your portfolio with impressive projects',
  'Potential job opportunities with sponsor companies',
];

const Registration: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="register"
      ref={sectionRef}
      className="py-24 space-bg"
      aria-labelledby="register-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Rocket className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h2
            id="register-heading"
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Register for <span className="gradient-text">IIC 3.0</span>
          </h2>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Secure your spot for the biggest hackathon of the year.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="flex items-center justify-center mb-10 relative z-10">
                <div className="p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mr-3">
                  <Sparkles className="h-7 w-7 text-pink-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                  Why Join IIC 3.0?
                </h3>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-10 relative z-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
                    className="flex items-start gap-3 p-4 glass-surface rounded-xl border border-pink-500/10 hover:border-pink-500/30 transition-colors duration-300"
                  >
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center relative z-10">
                <Button
                  variant="neon"
                  size="xl"
                  onClick={() =>
                    window.open(
                      'https://unstop.com/hackathons/international-innovation-challenge-20-manipal-university-mu-jaipur-1527559',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                >
                  <Rocket size={20} aria-hidden="true" />
                  Register Now!!
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Registration;