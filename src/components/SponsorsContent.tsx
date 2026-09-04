import React, { useRef, useState } from 'react';
import { ExternalLink, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
// import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// const Pdf = '/IIC_DECK.pdf';

interface Sponsor {
  logo: string;
  name: string;
  industry: string;
  website: string;
  description: string;
  tier: string;
}

const coPoweredBy: Sponsor[] = [
  {
    logo: '/sponsors/unstop.png',
    name: 'Unstop',
    industry: 'Talent & EdTech Platform',
    website: 'https://unstop.com',
    description: 'Connecting students with developers, coding challenges, and corporate employers.',
    tier: 'Title Partner',
  },
];

const goldSponsors: Sponsor[] = [
  {
    logo: '/sponsors/MongoDB_SpringGreen.png',
    name: 'MongoDB',
    industry: 'Database & Cloud Services',
    website: 'https://www.mongodb.com',
    description: 'Leading NoSQL database platform providing flexible, scalable data storage for modern applications.',
    tier: 'Gold Sponsor',
  },
  {
    logo: '/sponsors/Lockup-Horizontal-Dark.svg',
    name: 'Codecrafters',
    industry: 'Educational Technology',
    website: 'https://codecrafters.io',
    description: 'Interactive coding challenge platform teaching backend engineering through building real systems.',
    tier: 'Gold Sponsor',
  },
  {
    logo: '/sponsors/interviewbuddy-white.png',
    name: 'Interview Buddy',
    industry: 'Interview Preparation Platform',
    website: 'https://interviewbuddy.com',
    description: 'AI-powered platform helping candidates prepare for technical and HR interviews with confidence.',
    tier: 'Technology Partner',
  },
  {
    logo: '/sponsors/Internshala logo.png',
    name: 'Internshala',
    industry: 'Internship & Training Platform',
    website: 'https://internshala.com',
    description: 'India\'s leading platform connecting students with internships, work-from-home jobs, and courses.',
    tier: 'Technology Partner',
  },
  {
    logo: '/sponsors/doa-rajasthan-dark.png',
    name: 'Department of Agriculture',
    industry: 'Government of Rajasthan',
    website: 'https://agriculture.rajasthan.gov.in/',
    description: 'Empowering innovation in agriculture and agritech to solve real-world farming challenges.',
    tier: 'Government Partner',
  },
  {
    logo: '/sponsors/doic.png',
    name: 'DoIC MUJ',
    industry: 'Academic Innovation Dept',
    website: 'https://jaipur.manipal.edu',
    description: 'Directorate of Innovation and Incubation fostering academic and startup growth.',
    tier: 'Academic Partner',
  },
  {
    logo: '/sponsors/eCell.jpeg',
    name: 'E-Cell MUJ',
    industry: 'Entrepreneurship Hub',
    website: 'https://ecellmuj.in',
    description: 'Empowering students with startup mentorship, resources, and pitch workshops.',
    tier: 'Community Partner',
  },
  {
    logo: '/sponsors/aic.jpeg',
    name: 'AIC MUJ',
    industry: 'Atal Incubation Centre',
    website: 'https://aicmuj.in',
    description: 'Incubation support for tech startups from idea to pilot and scale stages.',
    tier: 'Community Partner',
  },
];

const problemPartners: Sponsor[] = [
  {
    logo: '/sponsors/mlhealth360.jpeg',
    name: 'mlHealth360',
    industry: 'Healthcare Technology',
    website: 'https://mlhealth360.com',
    description: 'AI-powered clinical intelligence platform for healthcare operational scaling.',
    tier: 'Technology Partner',
  },
  {
    logo: '/sponsors/mahindra.avif',
    name: 'Mahindra',
    industry: 'Automotive & Mobility',
    website: 'https://mahindra.com',
    description: 'Global federation of automotive, aerospace, and agricultural technology businesses.',
    tier: 'Problem Partner',
  },
  {
    logo: '/sponsors/doa-rajasthan-dark.png',
    name: 'Department of Agriculture',
    industry: 'Government of Rajasthan',
    website: 'https://agriculture.rajasthan.gov.in/',
    description: 'Empowering innovation in agriculture and agritech to solve real-world farming challenges.',
    tier: 'Problem Partner',
  },
  {
    logo: '/sponsors/Group 1.png',
    name: 'HCLTech',
    industry: 'Information Technology & Consulting',
    website: 'https://www.hcltech.com',
    description: 'Global technology company delivering digital, engineering, cloud, AI, and software services.',
    tier: 'Problem Partner',
  },
  {
    logo: '/sponsors/icar-logo-png_seeklogo-158112.png',
    name: 'Indian Council of Agricultural Research (ICAR)',
    industry: 'Engineering & Product Development',  
    website: 'https://icar.org.in/',
    description: 'National research institution for agricultural sciences and technology.',
    tier: 'Problem Partner',
  }
];

const SponsorShowcaseCard: React.FC<{ sponsor: Sponsor; delay: number; isInView: boolean }> = ({
  sponsor,
  delay,
  isInView,
}) => {
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleClick = () => {
    window.open(sponsor.website, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <div
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Visit ${sponsor.name} website`}
        className="w-full bg-[#061820]/40 border border-border/30 rounded-2xl p-5 flex flex-col justify-between text-left transition-all duration-300 hover:border-cyan-400/40 hover:shadow-glass hover:-translate-y-1 group relative overflow-hidden"
      >
        {/* Subtle internal shimmer layer */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]"
          aria-hidden="true"
        />

        {/* Branded Logo Container (White background to respect logo colors) */}
        <div className="w-full h-24 bg-white rounded-xl p-4 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          {!logoLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full bg-[#f8fafc]" />
          )}
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className={`max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLogoLoaded(true)}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              setLogoLoaded(true);
            }}
          />
        </div>

        {/* Corporate Details */}
        <div className="mt-4 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
              {sponsor.name}
            </h4>
            <ExternalLink className="h-3.5 w-3.5 text-gray-500 group-hover:text-cyan-300 transition-colors duration-300 flex-shrink-0" />
          </div>
          <span className="text-[10px] font-semibold text-cyan-400/80 uppercase tracking-widest block mt-1.5">
            {sponsor.industry}
          </span>
          <p className="text-[11px] text-gray-400 leading-relaxed mt-2.5">
            {sponsor.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SponsorsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 pt-32 pb-20">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text">Sponsors</span>
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            IIC 3.0 is made possible by the support of forward-thinking companies pushing the boundaries of engineering and research.
          </p>
        </motion.div>

        {/* ── Co-Powered By Tier ─────────────────────────────────────────────── */}
        {coPoweredBy.length > 0 && (
          <div className="mb-20">
            <motion.div
              className="text-center mb-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              <Trophy className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Co-Powered By
              </h2>
            </motion.div>
            <div className="flex justify-center">
              <div className="max-w-sm w-full">
                {coPoweredBy.map((s, i) => (
                  <SponsorShowcaseCard
                    key={i}
                    sponsor={s}
                    delay={0.3}
                    isInView={isInView}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Gold & community Partners Tier ─────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-10 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <Sparkles className="h-5 w-5 text-cyan-400" aria-hidden="true" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
               Sponsors &amp; Partners
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch justify-items-center">
            {goldSponsors.map((sponsor, sIdx) => (
              <SponsorShowcaseCard
                key={sIdx}
                sponsor={sponsor}
                delay={0.25 + sIdx * 0.05}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* ── Problem Statement Partners Tier ────────────────────────────────── */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-10 flex items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Problem Statement Partners
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch justify-items-center">
            {problemPartners.map((sponsor, sIdx) => (
              <SponsorShowcaseCard
                key={sIdx}
                sponsor={sponsor}
                delay={0.3 + sIdx * 0.05}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* ── Become a Sponsor CTA ───────────────────────────────────────────── */}
        {/* <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-[#061820]/40 border border-border/30 rounded-2xl p-8 max-w-2xl mx-auto hover:border-cyan-400/30 transition-colors duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">Want to Sponsor?</h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Join our community of forward-thinking companies supporting the next generation of tech innovators.
            </p>
            <Button
              variant="cyan"
              size="lg"
              onClick={() => window.open(Pdf, '_blank')}
            >
              Download Brochure
            </Button>
          </div>
        </motion.div> */}
      </main>
    </div>
  );
};

export default SponsorsContent;
