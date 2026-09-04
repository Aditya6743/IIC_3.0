import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Completely rewrite the Day Header to be a sleek cyberpunk pill
old_header = '''              {/* Day Header - Sticky with Blur */}
              <motion.div 
                className="flex flex-col items-center justify-center mb-20 text-center sticky top-28 z-40"
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="relative group">
                  <div className={`absolute inset-0 blur-2xl opacity-40 transition-opacity duration-500 rounded-full
                    ${dayIndex === 2 ? 'bg-cyan-500' : 'bg-emerald-500'}`} />
                  
                  <div className={`relative flex items-center gap-5 px-10 py-5 rounded-full border backdrop-blur-2xl shadow-3xl hover:scale-105 transition-transform duration-500
                    ${dayIndex === 2 ? 'bg-cyan-950/80 border-cyan-500/50 shadow-cyan-900/50' : 'bg-emerald-950/80 border-emerald-500/50 shadow-emerald-900/50'}`}>
                    
                    {/* Glowing Accent Ring */}
                    <div className={`absolute inset-0 rounded-full border-2 border-transparent mix-blend-screen opacity-50
                      ${dayIndex === 2 ? 'bg-[linear-gradient(45deg,rgba(34,211,238,0.5),transparent)]' : 'bg-[linear-gradient(45deg,rgba(16,185,129,0.5),transparent)]'}`} />

                    <span className={`text-3xl sm:text-4xl font-black tracking-widest uppercase ${dayIndex === 2 ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]'}`}>
                      {dayData.day}
                    </span>
                    
                    {dayData.date && (
                      <>
                        <div className={`w-1.5 h-12 rounded-full ${dayIndex === 2 ? 'bg-cyan-500/50' : 'bg-emerald-500/50'}`} />
                        <div className="flex flex-col text-left">
                          <span className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase">Phase</span>
                          <span className="text-xl font-bold text-white tracking-wider">{dayData.date}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>'''

new_header = '''              {/* Day Header - Sleek Cyberpunk Pill */}
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
              </motion.div>'''

if old_header in content:
    content = content.replace(old_header, new_header)
else:
    print("WARNING: Could not find old_header block to replace!")

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
