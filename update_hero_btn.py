import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

# Make the hero button insanely impressive
old_btn = '''              <motion.button
                ref={btnRef}
                onMouseMove={handleBtnMove}
                onMouseLeave={handleBtnLeave}
                style={{ x: btnSpringX, y: btnSpringY }}
                className="relative px-8 py-4 bg-cyan-500 text-cyan-950 font-bold uppercase tracking-wider text-sm rounded-full overflow-hidden group shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                {/* Highlight Sweep */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-sweep" />
                <span className="relative z-10">Submit Project</span>
              </motion.button>'''

new_btn = '''              <motion.button
                ref={btnRef}
                onMouseMove={handleBtnMove}
                onMouseLeave={handleBtnLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ x: btnSpringX, y: btnSpringY }}
                className="relative px-10 py-5 bg-cyan-400 text-cyan-950 font-black uppercase tracking-widest text-sm rounded-full overflow-hidden group shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition-shadow duration-300 border border-cyan-300/50"
                onClick={() =>
                  window.open(
                    'https://docs.google.com/forms/d/1r6umjVOO-wcnGa-XwrCkjcvPk2f8rcAo1msmgnfnCz0/edit',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                {/* Cyber Matrix Glitch Hover Effect */}
                <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                
                {/* Dynamic Light Sweep */}
                <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-[150%] group-hover:animate-sweep" />
                
                <span className="relative z-10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-950 animate-pulse" />
                  Submit Project
                </span>
              </motion.button>'''

content = content.replace(old_btn, new_btn)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
