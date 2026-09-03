import re

new_timeline_code = '''import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, Mic, Users, FileText, Coffee, Key, Gavel, Trophy, Code, MessageSquare, Award } from 'lucide-react';

const scheduleData = [
  {
    day: "Day 1",
    date: "SEPTEMBER 08",
    color: "emerald",
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
    color: "cyan",
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

const ScheduleEvent: React.FC<{ event: any, index: number, isDay2: boolean }> = ({ event, index, isDay2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const isLeft = index % 2 === 0;
  const Icon = event.icon;

  const colorConfig = isDay2 
    ? { border: 'border-cyan-500/30', bg: 'bg-cyan-500', glow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]', text: 'text-cyan-400', badgeBg: 'bg-cyan-950/40', badgeBorder: 'border-cyan-500/20' }
    : { border: 'border-emerald-500/30', bg: 'bg-emerald-500', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.5)]', text: 'text-emerald-400', badgeBg: 'bg-emerald-950/40', badgeBorder: 'border-emerald-500/20' };

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-normal group mb-8 sm:mb-16 w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Node / Dot */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        className={`absolute left-[20px] md:left-1/2 w-4 h-4 md:-translate-x-1/2 rounded-full border-[3px] border-black z-20 transition-all duration-500 ${colorConfig.bg} ${colorConfig.glow}`}
      >
        <div className={`absolute inset-0 rounded-full animate-ping opacity-50 ${colorConfig.bg}`} />
      </motion.div>

      {/* Horizontal Connector Line (Desktop) */}
      <motion.div 
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2rem)] h-px bg-gradient-to-r ${isLeft ? 'right-1/2 from-transparent to-white/20' : 'left-1/2 from-white/20 to-transparent'}`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ transformOrigin: isLeft ? 'right' : 'left' }}
      />

      {/* Content Card */}
      <motion.div 
        className={`w-[calc(100%-3rem)] md:w-[calc(50%-3rem)] ml-14 md:ml-0 ${isLeft ? 'md:pr-8 text-left md:text-right' : 'md:pl-8 text-left'}`}
        initial={{ opacity: 0, x: isLeft ? -30 : 30, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <div className={`relative p-5 sm:p-7 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 transition-all duration-300
          hover:bg-white/[0.03] hover:border-white/20 flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]`}>
          
          <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className={`p-2 rounded-xl ${colorConfig.badgeBg} ${colorConfig.badgeBorder} border`}>
              <Icon className={`w-4 h-4 ${colorConfig.text}`} />
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase border ${colorConfig.badgeBorder} ${colorConfig.text} bg-black/50`}>
              {event.time}
            </div>
          </div>

          <h3 className="text-lg sm:text-2xl font-black text-white tracking-wide mb-2 uppercase">
            {event.title}
          </h3>
          
          <div className={`flex items-center gap-2 font-mono text-xs sm:text-sm text-gray-400 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <MapPin className={`w-3.5 h-3.5 ${colorConfig.text} opacity-80`} />
            <span className="tracking-wide">{event.venue || 'To be announced'}</span>
          </div>

          {/* Corner Cyber Accent */}
          <div className={`absolute top-0 ${isLeft ? 'left-0 rounded-tl-2xl' : 'right-0 rounded-tr-2xl'} w-8 h-8 opacity-20 pointer-events-none`}
               style={{ background: `radial-gradient(circle at ${isLeft ? '0% 0%' : '100% 0%'}, ${isDay2 ? '#22d3ee' : '#10b981'}, transparent 70%)` }} />
        </div>
      </motion.div>
    </div>
  );
};

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Scroll Progress Track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative w-full py-16 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="relative">
          
          {/* Main Background Track */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Scroll Progress Track */}
          <motion.div 
            className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400 md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
            style={{ scaleY }}
          />

          {scheduleData.map((dayData, dayIndex) => (
            <div key={dayData.day} className="mb-24 last:mb-0 relative z-10 pt-10">
              
              {/* Day Header */}
              <motion.div 
                className="flex flex-col items-center justify-center mb-16 text-center sticky top-24 z-30"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
              >
                <div className="relative group">
                  <div className={`absolute inset-0 blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 rounded-full
                    ${dayIndex === 1 ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
                  <div className={`relative flex items-center gap-4 px-8 py-3 rounded-full border shadow-2xl backdrop-blur-xl
                    ${dayIndex === 1 ? 'bg-cyan-950/60 border-cyan-500/40' : 'bg-emerald-950/60 border-emerald-500/40'}`}>
                    <span className={`text-2xl sm:text-3xl font-black tracking-widest uppercase ${dayIndex === 1 ? 'text-cyan-400' : 'text-emerald-400'}`}>
                      {dayData.day}
                    </span>
                    <div className={`w-1.5 h-8 rounded-full opacity-50 ${dayIndex === 1 ? 'bg-cyan-400' : 'bg-emerald-400'}`} />
                    <span className="text-lg sm:text-xl font-bold text-white tracking-widest opacity-90">
                      {dayData.date}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Day Events */}
              <div className="relative">
                {dayData.events.map((event, index) => (
                  <ScheduleEvent key={index} event={event} index={index} isDay2={dayIndex === 1} />
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
'''

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(new_timeline_code)

