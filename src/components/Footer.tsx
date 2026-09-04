import React from 'react';
import { Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const quickLinks = [
  { name: 'About', path: '/about' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Problem Statements', path: '/problem-statements' },
  { name: 'Judges & Mentors', path: '/judges-mentors' },
  { name: 'Gallery', path: '/gallery' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/iicmuj?igsh=ZzZjejkyOW5ibmNs', icon: <Instagram size={18} />, label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/international-innovation-challenge-iic/', icon: <Linkedin size={18} />, label: 'LinkedIn' },
];

// Simple seeded random function to keep stars deterministic
const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const Sparkles = () => {
  const sparkles = Array.from({ length: 60 });
  return (
    <div className="absolute top-0 left-0 right-0 h-0 z-20 overflow-visible pointer-events-none">
      {sparkles.map((_, i) => {
        // Use deterministic random values based on the index `i`
        const r1 = random(i);
        const r2 = random(i + 100);
        const r3 = random(i + 200);
        const r4 = random(i + 300);
        const r5 = random(i + 400);

        const isCyan = r1 > 0.4;
        const color = isCyan ? '#22d3ee' : '#10b981'; // cyan-400 or emerald-500
        const shadow = isCyan ? 'rgba(34,211,238,0.8)' : 'rgba(16,185,129,0.8)';
        const size = r2 * 3 + 1.5; // 1px to 4.5px
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${r3 * 100}%`,
              top: '0px',
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 4}px ${size}px ${shadow}`
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: [0, r4 * -30 - 10], // Float up between 10px and 40px
              x: [0, (r5 - 0.5) * 20] // Drift left or right slightly
            }}
            transition={{
              duration: random(i + 500) * 2 + 1.5, // 1.5s to 3.5s
              repeat: Infinity,
              delay: random(i + 600) * 4,
              ease: "easeOut"
            }}
          />
        );
      })}
    </div>
  );
};

const HorizontalLaserBeam = ({ delay = 0 }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none z-30">
      <style>{`
        @keyframes laser-shoot {
          0% { transform: translateX(-100vw); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
      
      {/* Subtle Base Line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/30 to-transparent" />
      
      {/* 1. Long faint cyan tail */}
      <div
        className="absolute top-0 h-[2px] w-[40vw] bg-gradient-to-r from-transparent via-cyan-500/40 to-cyan-400 blur-[2px]"
        style={{ animation: `laser-shoot 7s linear ${delay}s infinite`, willChange: 'transform' }}
      />
      
      {/* 2. Core bright cyan beam */}
      <div
        className="absolute top-0 h-[2px] w-[20vw] bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)]"
        style={{ animation: `laser-shoot 4.5s linear ${delay + 1.5}s infinite`, willChange: 'transform' }}
      />
      
      {/* 3. Blinding white leading edge */}
      <div
        className="absolute top-0 h-[2px] w-[10vw] bg-gradient-to-r from-transparent via-white/80 to-white shadow-[0_0_15px_rgba(255,255,255,1)]"
        style={{ animation: `laser-shoot 3s linear ${delay + 3.5}s infinite`, willChange: 'transform' }}
      />
      
      {/* 4. Emerald trailing pulse */}
      <div
        className="absolute top-0 h-[2px] w-[25vw] bg-gradient-to-r from-transparent via-emerald-400/60 to-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
        style={{ animation: `laser-shoot 5.5s linear ${delay + 0.5}s infinite`, willChange: 'transform' }}
      />
    </div>
  );
};



const TopBoundaryRay = () => {
  return (
    <div className="absolute top-0 left-0 right-0 h-[4px] overflow-hidden pointer-events-none z-40">
      <style>{`
        @keyframes massive-sweep {
          0% { transform: translateX(-60vw); }
          100% { transform: translateX(110vw); }
        }
      `}</style>
      
      {/* 1. Base glow track */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/40 to-transparent" />
      
      {/* 2. Massive wide energy field */}
      <div
        className="absolute top-0 h-[4px] w-[50vw] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]"
        style={{
          animation: "massive-sweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          boxShadow: "0 0 40px 10px rgba(34,211,238,0.6), 0 0 80px 20px rgba(16,185,129,0.3)",
          willChange: "transform"
        }}
      />
      
      {/* 3. Intense White-Hot Core */}
      <div
        className="absolute top-[1px] h-[2px] w-[20vw] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          animation: "massive-sweep 5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          boxShadow: "0 0 20px 4px rgba(255,255,255,0.8)",
          willChange: "transform"
        }}
      />
    </div>
  );
};

const FooterBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000000]">
      {/* 1. Static ambient glow that matches the main page's green-black lighting bleeding from above */}
      <div className="absolute inset-0 opacity-60 mix-blend-screen" style={{ background: 'radial-gradient(circle at 50% -20%, rgba(16,185,129,0.15) 0%, rgba(34,211,238,0.1) 40%, transparent 90%)' }} />
      
      {/* 2. Static seamlessly aligned grid (No moving beams) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          backgroundAttachment: "fixed",
        }}
      />
    </div>
  );
};


const FooterParticles = () => {
  const particles = Array.from({ length: 80 });
  return (
    <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
      <style>{`
        @keyframes twinkle-particle {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: var(--max-opacity); transform: scale(var(--max-scale)); }
        }
      `}</style>
      {particles.map((_, i) => {
        const r1 = random(i * 7 + 10);
        const r2 = random(i * 11 + 20);
        const r3 = random(i * 13 + 30);
        const r4 = random(i * 17 + 40);
        const r5 = random(i * 19 + 50);
        const r6 = random(i * 23 + 60);
        const r7 = random(i * 29 + 70);
        const r8 = random(i * 31 + 80);
        
        const isCyan = r1 > 0.5;
        const color = isCyan ? "#22d3ee" : "#10b981";
        const size = r2 * 3 + 1.5;
        return (
          <div
            key={`fp-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${r3 * 100}%`,
              top: `${r4 * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${size}px ${isCyan ? "rgba(34,211,238,0.5)" : "rgba(16,185,129,0.5)"}`,
              "--max-opacity": r5 * 0.6 + 0.4,
              "--max-scale": r6 + 1,
              animation: `twinkle-particle ${3 + r7 * 4}s ease-in-out ${r8 * 2}s infinite`,
              willChange: "opacity, transform"
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#000000] pt-24 pb-10 border-t border-white/10 overflow-hidden">
      
      {/* 1. Live Sparkles & Glowing Laser Edge */}
      <Sparkles />
      
      <FooterBackground />
      <FooterParticles />
      
      <TopBoundaryRay />


      {/* 2. Top-Center Ambient Glow for Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      {/* 3. Main Footer Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 max-w-7xl mx-auto">
          
          {/* Brand & Description (Takes up 5 columns) */}
          <div className="flex flex-col items-center md:items-start md:col-span-5 space-y-6 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 border border-transparent hover:border-white/[0.05]">
            <Link to="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  alt="IIC 3.0 Logo"
                  src="/iic-3.0-logo-pro.png"
                  width="180"
                  className="brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] group-hover:brightness-150"
                  />
              </motion.div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left max-w-sm font-light">
              The premier hackathon experience where innovation meets opportunity. Join us for 36 hours of relentless creation and disruption.
            </p>
            
            {/* Status Indicator */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
              </div>
              <span className="text-xs text-gray-400 font-medium tracking-[0.2em] uppercase">
                All Systems Online
              </span>
            </div>
          </div>

          {/* Quick Links (Takes up 3 columns) */}
          <div className="flex flex-col items-center md:items-start md:col-span-3 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 border border-transparent hover:border-white/[0.05]">
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest opacity-80">Explore</h3>
            <ul className="space-y-4 text-center md:text-left w-full">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group relative text-gray-400 hover:text-white transition-colors duration-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded py-1.5 px-3 -ml-3 inline-block w-max"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute left-0 bottom-0 top-0 w-0 bg-cyan-950/40 rounded transition-all duration-300 group-hover:w-full -z-10"></span>
                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-transparent transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Links (Takes up 4 columns) */}
          <div className="flex flex-col items-center md:items-start md:col-span-4 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors duration-500 border border-transparent hover:border-white/[0.05]">
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest opacity-80">Connect</h3>
            
            <div className="flex gap-4 mb-10">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group relative p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/50 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">{link.icon}</span>
                </a>
              ))}
            </div>

            <div className="space-y-4 text-sm text-gray-400 text-center md:text-left">
              <a href="mailto:iic.manipal@gmail.com" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                  <Mail size={14} className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-cyan-400" />
                </div>
                <span className="font-light tracking-wide">iic.manipal@gmail.com</span>
              </a>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 group">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-cyan-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div className="font-light tracking-wide leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                    Keshav Anand: <a href="tel:7970466554" className="hover:text-cyan-400">7970466554</a><br />
                    Sarath Mohanraj: <a href="tel:8903244085" className="hover:text-cyan-400">8903244085</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="opacity-70 group-hover:opacity-100 transition-opacity group-hover:text-emerald-400" />
                </div>
                <span className="font-light tracking-wide leading-relaxed pt-1 group-hover:text-gray-300 transition-colors">
                  Manipal University Jaipur,<br />Dehmi Kalan, Rajasthan
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          


          <p className="text-gray-500 text-xs font-light tracking-wider relative z-10">
            © {new Date().getFullYear()} IIC 3.0. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] text-gray-500 uppercase tracking-widest font-medium relative z-10">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;