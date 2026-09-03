import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# 1. Hackathon schedule horizontal line: Make it "little bigger" (wider and solid)
content = content.replace(
    '<div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />',
    '<div className="w-64 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />'
)
# Just in case it wasn't strictly matching
content = re.sub(
    r'<div className="w-\d+ h-[^"]+" />',
    '<div className="w-64 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />',
    content
)

# 4. "WOW" Factor on nodes: Add double rings and pulse
content = content.replace(
    'className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow}`}',
    'className={`w-7 h-7 rounded-full border-[3px] border-black flex items-center justify-center ${colorConfig.bg} ${colorConfig.glow} ring-2 ring-offset-2 ring-offset-black ${isDay2 ? \'ring-cyan-500/50\' : \'ring-emerald-500/50\'}`}'
)

# Wow factor on Day Header
content = content.replace(
    'className={`relative flex items-center gap-5 px-8 py-4 rounded-full border backdrop-blur-xl shadow-2xl',
    'className={`relative flex items-center gap-5 px-10 py-5 rounded-full border backdrop-blur-2xl shadow-3xl hover:scale-105 transition-transform duration-500'
)

# Wow factor on cards
content = content.replace(
    'boxShadow: isFocused ? `0 20px 40px -10px ${isDay2 ? \'rgba(34,211,238,0.2)\' : \'rgba(16,185,129,0.2)\'}` : \'0 10px 30px -10px rgba(0,0,0,0.5)\'',
    'boxShadow: isFocused ? `0 20px 50px -10px ${isDay2 ? \'rgba(34,211,238,0.4)\' : \'rgba(16,185,129,0.4)\'}` : \'0 10px 30px -10px rgba(0,0,0,0.5)\''
)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
