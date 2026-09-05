import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Twitter } from 'lucide-react';

const guests = [
  {
    name: "Col. Rajyavardhan Singh Rathore",
    role: "Minister of IT & Communication, Govt of Rajasthan",
    description: "Olympic Medallist and prominent political leader driving youth affairs, sports, and IT innovation in Rajasthan.",
    image: "/guest/guest-rathore.jpg",
  },
  {
    name: "Dr. Jagdeesh Chandra",
    role: "CEO & Editor-in-Chief, First India News",
    description: "Former IAS officer and visionary media personality leading one of the fastest-growing news networks in India.",
    image: "/guest/guest-jagdeesh.jpg",
  }
];

const GuestCard = ({ guest, index, isInView }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="flex flex-col w-full h-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-4 sm:p-5 hover:bg-white/[0.05] transition-all duration-500 items-center hover:shadow-[0_10px_40px_-15px_rgba(34,211,238,0.2)] hover:border-white/20"
    >
      {/* Guest Image - 3:2 Ratio (Shorter vertically) */}
      <div className="relative aspect-[3/2] w-full shrink-0 rounded-2xl overflow-hidden bg-white/[0.02]">
        <img
          src={guest.image}
          alt={guest.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Guest Details - Centered and vertically tightened */}
      <div className="flex flex-col flex-grow text-center items-center pt-4 w-full">
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide mb-1.5">
          {guest.name}
        </h3>

        <p className="text-sm font-semibold text-pink-400 mb-3 uppercase tracking-widest">
          {guest.role}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">
          {guest.description}
        </p>

        {/* Social Links - Bottom Center */}
        <div className="mt-auto flex items-center justify-center w-full pt-1">
          {guest.twitter && (
            <a
              href={guest.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${guest.name}'s Twitter`}
              className="p-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-500/50 transition-all duration-300 inline-flex items-center justify-center hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <Twitter className="w-4 h-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const GuestsContent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen space-bg" ref={sectionRef}>
      <main className="container mx-auto px-4 pt-28 pb-10 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="gradient-text">Guests</span>
          </h1>
          <div className="section-divider mb-6 mx-auto" aria-hidden="true" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Distinguished global experts, industry leaders, and researchers joining us for IIC 3.0.
          </p>
        </motion.div>

        {/* Guest Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4 sm:px-6">
          {guests.map((guest, index) => (
            <GuestCard key={index} guest={guest} index={index} isInView={isInView} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GuestsContent;
