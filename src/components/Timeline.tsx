import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award, Megaphone, Check } from 'lucide-react';

const scheduleData = [
  {
    day: "Online Phase",
    date: "COMPLETED",
    events: [
      { time: "Aug 28", title: "Registration & PPT", venue: "Online", icon: FileText, completed: true },
      { time: "Aug 30", title: "Shortlisting Results", venue: "Online", icon: Megaphone, completed: true },
    ]
  },
  {
    day: "Day 1",
    date: "SEPTEMBER 08",
    events: [
      { time: "09:00 - 10:30", title: "Reporting Time", venue: "AB - 1 Lobby", icon: Users },
      { time: "10:30 - 12:00", title: "Inaugural Ceremony", venue: "Smt. Vasanti Pai Audi AB - 3", icon: Mic },
      { time: "12:00", title: "Problem Statement Release", venue: "To be announced", icon: FileText },
      { time: "12:00 - 13:00", title: "Lunch", venue: "LHC 1st Floor", icon: Coffee },
      { time: "13:00", title: "Room Allotment", venue: "To be announced", icon: Key },
      { time: "19:00 - 20:00", title: "Mentoring Round 1", venue: "Alloted Rooms", icon: Users },
      { time: "20:00 - 22:00", title: "Dinner", venue: "LHC 1st Floor", icon: Coffee },
      { time: "23:00 - 01:00", title: "Mentoring Round 2", venue: "Alloted Rooms", icon: Users },
    ]
  },
  {
    day: "Day 2",
    date: "SEPTEMBER 09",
    events: [
      { time: "03:00 - 05:00", title: "Judging - Round 2", venue: "To be announced", icon: Gavel },
      { time: "07:00", title: "Results Out - Round 2", venue: "To be announced", icon: Trophy },
      { time: "08:00 - 09:00", title: "Breakfast", venue: "LHC 1st Floor", icon: Coffee },
      { time: "09:00 - 12:00", title: "Implementation - Round 3", venue: "Alloted Rooms", icon: Code },
      { time: "11:00 - 12:00", title: "Panel Discussion", venue: "Smt. Sharda Pai Audi AB - 2", icon: MessageSquare },
      { time: "12:00 - 13:00", title: "Lunch", venue: "LHC 1st Floor", icon: Coffee },
      { time: "13:00 - 15:00", title: "Judging - Round 3", venue: "To be announced", icon: Gavel },
      { time: "16:00 - 18:00", title: "Valedictory Ceremony", venue: "Smt. Sharda Pai Audi AB - 2", icon: Award },
    ]
  }
];

// 3D Magical Spotlight Tilt Card
const SpotlightCard: React.FC<{ children: React.ReactNode; isDay2: boolean; className?: string; isLeft: boolean }> = ({ children, isDay2, className = "", isLeft }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    
    // Spotlight position
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // Tilt calculations (-0.5 to 0.5)
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
    x.set(0);
    y.set(0);
  };

  const color = isDay2 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(16, 185, 129, 0.4)';

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 group ${className} hover:border-white/30 transition-colors duration-500`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        boxShadow: isFocused ? `0 30px 60px -12px ${isDay2 ? 'rgba(34,211,238,0.3)' : 'rgba(16,185,129,0.3)'}` : '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100 overflow-hidden"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
          transform: "translateZ(1px)",
        }}
      />
      
      {/* Cyber Scanline Background */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl overflow-hidden" 
        style={{ transform: "translateZ(1px)" }} 
      />
      
      <div 
        className="relative z-10 p-5 sm:p-7"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
};


const ScheduleEvent: React.FC<{ event: any, index: number, isDay2: boolean }> = ({ event, index, isDay2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const isLeft = index % 2 === 0;
  const Icon = event.icon;

  const colorConfig = isDay2 
    ? { border: 'border-cyan-500/30', bg: 'bg-cyan-500', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.8)]', text: 'text-cyan-400', badgeBg: 'bg-cyan-950/40', badgeBorder: 'border-cyan-500/20' }
    : { border: 'border-emerald-500/30', bg: 'bg-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.8)]', text: 'text-emerald-400', badgeBg: 'bg-emerald-950/40', badgeBorder: 'border-emerald-500/20' };

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-normal group mb-8 sm:mb-16 w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Node / Glowing Orb */}
      <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
          className={`w-7 h-7 rounded-full border-[3px] border-black flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow} ring-2 ring-offset-2 ring-offset-black ${isDay2 ? 'ring-cyan-500/50' : 'ring-emerald-500/50'}`}
        >
          {event.completed ? (
            <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />
          ) : (
            <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${colorConfig.bg}`} />
          )}
          <div className={`absolute inset-0 -m-2 rounded-full blur-[8px] pointer-events-none opacity-50 ${colorConfig.bg}`} />
        </motion.div>
      </div>

      {/* Cyber Circuit Connector Line (Desktop) */}
      <motion.div 
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2.5rem)] h-[2px] ${isLeft ? 'right-[50%]' : 'left-[50%]'}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        style={{ 
          transformOrigin: isLeft ? 'right' : 'left',
          background: `linear-gradient(to ${isLeft ? 'left' : 'right'}, ${isDay2 ? 'rgba(34,211,238,0.8)' : 'rgba(16,185,129,0.8)'}, transparent)`, boxShadow: `0 0 10px ${isDay2 ? 'rgba(34,211,238,0.5)' : 'rgba(16,185,129,0.5)'}`
        }}
      />

      {/* Content Card with 3D Spotlight */}
      <motion.div 
        className={`w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] ml-16 md:ml-0 ${isLeft ? 'md:pr-4' : 'md:pl-4'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(15px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        style={{ perspective: "1000px" }}
      >
        <SpotlightCard isDay2={isDay2} isLeft={isLeft} className={`flex flex-col ${isLeft ? 'md:items-end text-left md:text-right' : 'md:items-start text-left'}`}>
          
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-2.5 rounded-xl ${colorConfig.badgeBg} ${colorConfig.badgeBorder} border backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]`}>
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colorConfig.text}`} />
            </div>
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${colorConfig.badgeBorder} ${colorConfig.text} bg-black/60 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
              {event.time}
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 tracking-tight mb-3 uppercase drop-shadow-sm">
            {event.title}
          </h3>
          
          <div className={`flex items-center gap-2 font-mono text-xs sm:text-sm text-gray-400 bg-white/[0.03] px-3 py-1.5 rounded-md border border-white/[0.05] ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <MapPin className={`w-3.5 h-3.5 ${colorConfig.text} opacity-80`} />
            <span className="tracking-wide">{event.venue || 'To be announced'}</span>
          </div>

        </SpotlightCard>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Scroll Progress Track with Physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });
  
  // Calculate dynamic top position for the glowing spark
  const sparkPosition = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full py-20 overflow-hidden" ref={containerRef} id="schedule">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight uppercase">Hackathon Schedule</h2>
        <div className="w-64 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="relative">
          
          {/* Main Background Track (Dark) */}
          <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.03] rounded-full border-x border-white/[0.02]" />
          
          {/* Glowing Animated Scroll Progress Track */}
          <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400 origin-top rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              style={{ scaleY: smoothProgress }}
            />
          </div>

          {/* Subtle Leading Edge Indicator (replaces the intense spark) */}
          <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 w-3 h-8 -translate-y-full pointer-events-none z-30">
            <motion.div className="relative w-full h-full" style={{ top: sparkPosition }}>
              <div className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-30" />
              <div className="absolute bottom-0 left-1/2 w-2 h-4 bg-white rounded-full -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>

          {scheduleData.map((dayData, dayIndex) => (
            <div key={dayData.day} className="mb-32 last:mb-0 relative z-10 pt-10">
              
              {/* Day Header - Sleek Cyberpunk Pill */}
              <motion.div 
                className="flex flex-col items-center justify-center mb-16 text-center sticky top-28 z-40"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="relative group">
                  {/* Subtle ambient glow behind the pill */}
                  <div className={`absolute inset-0 blur-xl opacity-30 transition-opacity duration-500 rounded-full
                    ${dayIndex === 2 ? 'bg-cyan-500' : 'bg-emerald-500'} group-hover:opacity-60`} />
                  
                  <div className={`relative flex items-center gap-4 px-6 py-2.5 rounded-full border backdrop-blur-md shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]
                    ${dayIndex === 2 ? 'bg-[#03151A]/90 border-cyan-500/40' : 'bg-[#021A14]/90 border-emerald-500/40'}`}>
                    
                    <span className={`text-base sm:text-lg font-bold tracking-[0.15em] uppercase ${dayIndex === 2 ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}>
                      {dayData.day}
                    </span>
                    
                    {dayData.date && (
                      <>
                        <div className={`w-[2px] h-5 rounded-full ${dayIndex === 2 ? 'bg-cyan-500/40' : 'bg-emerald-500/40'}`} />
                        <span className="text-sm sm:text-base font-semibold tracking-[0.1em] text-white/90 uppercase">{dayData.date}</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Day Events */}
              <div className="relative">
                {dayData.events.map((event, index) => (
                  <ScheduleEvent key={index} event={event} index={index} isDay2={dayIndex === 2} />
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default Timeline;
