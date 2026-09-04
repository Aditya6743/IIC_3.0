import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Fix Node/Orb
old_node = '''      {/* Node / Glowing Orb */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
        className={`absolute left-[37px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-[3px] border-black z-20 flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow}`}
      >
        {event.completed ? (
          <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />
        ) : (
          <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${colorConfig.bg}`} />
        )}
        <div className={`absolute inset-0 -m-2 rounded-full blur-[8px] pointer-events-none opacity-50 ${colorConfig.bg}`} />
      </motion.div>'''

new_node = '''      {/* Node / Glowing Orb */}
      <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
          className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow}`}
        >
          {event.completed ? (
            <Check className="w-3.5 h-3.5 text-black" strokeWidth={4} />
          ) : (
            <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${colorConfig.bg}`} />
          )}
          <div className={`absolute inset-0 -m-2 rounded-full blur-[8px] pointer-events-none opacity-50 ${colorConfig.bg}`} />
        </motion.div>
      </div>'''

content = content.replace(old_node, new_node)

# Fix Glowing Track
old_track = '''          {/* Glowing Animated Scroll Progress Track */}
          <motion.div 
            className="absolute left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400 origin-top rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            style={{ scaleY: smoothProgress }}
          />'''

new_track = '''          {/* Glowing Animated Scroll Progress Track */}
          <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[4px]">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-cyan-400 origin-top rounded-full shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              style={{ scaleY: smoothProgress }}
            />
          </div>'''

content = content.replace(old_track, new_track)

# Fix Leading Edge Indicator (Does not have animate prop but has style={{ top: ... }} which might conflict if we ever add transform)
old_edge = '''          {/* Subtle Leading Edge Indicator (replaces the intense spark) */}
          <motion.div 
            className="absolute left-[37px] md:left-1/2 -translate-x-1/2 w-3 h-8 -translate-y-full pointer-events-none z-30"
            style={{ top: sparkPosition }}
          >
            <div className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-30" />
            <div className="absolute bottom-0 left-1/2 w-2 h-4 bg-white rounded-full -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          </motion.div>'''

new_edge = '''          {/* Subtle Leading Edge Indicator (replaces the intense spark) */}
          <div className="absolute left-[37px] md:left-1/2 -translate-x-1/2 w-3 h-8 -translate-y-full pointer-events-none z-30">
            <motion.div className="relative w-full h-full" style={{ top: sparkPosition }}>
              <div className="absolute inset-0 bg-white rounded-full blur-[3px] opacity-30" />
              <div className="absolute bottom-0 left-1/2 w-2 h-4 bg-white rounded-full -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>'''

content = content.replace(old_edge, new_edge)

# While we're at it, restore the missing left/right connector line positioning!
old_connector = '''      {/* Cyber Circuit Connector Line (Desktop) */}
      <motion.div 
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2.5rem)] h-[2px]`}'''

new_connector = '''      {/* Cyber Circuit Connector Line (Desktop) */}
      <motion.div 
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-[calc(50%-2.5rem)] h-[2px] ${isLeft ? 'right-[50%]' : 'left-[50%]'}`}'''

content = content.replace(old_connector, new_connector)


with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
