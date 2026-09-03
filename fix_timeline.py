import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# 1. Hackathon Schedule Line: Make it wider (w-48), but thinner (h-[2px])
content = content.replace(
    '<div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]" />',
    '<div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto mt-6 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />'
)

# 2. Vertical Timeline Tracks: Make them thinner (w-[2px]) to match
content = content.replace(
    'top-0 bottom-0 w-[4px] bg-white/[0.03]',
    'top-0 bottom-0 w-[2px] bg-white/[0.03]'
)
content = content.replace(
    'top-0 bottom-0 w-[4px]">',
    'top-0 bottom-0 w-[2px]">'
)

# 3. Connecting lines (horizontal): make them [2px] to match if they aren't already
# They are already h-[2px]. Let's increase the glow.
content = content.replace(
    'background: `linear-gradient(to ${isLeft ? \'left\' : \'right\'}, ${isDay2 ? \'rgba(34,211,238,0.5)\' : \'rgba(16,185,129,0.5)\'}, transparent)`',
    'background: `linear-gradient(to ${isLeft ? \'left\' : \'right\'}, ${isDay2 ? \'rgba(34,211,238,0.8)\' : \'rgba(16,185,129,0.8)\'}, transparent)`, boxShadow: `0 0 10px ${isDay2 ? \'rgba(34,211,238,0.5)\' : \'rgba(16,185,129,0.5)\'}`'
)

# 4. Enhance Spotlight Card to be more 'Wow'
# Give it a brighter border and more glass effect
content = content.replace(
    'className={`relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group ${className}`}',
    'className={`relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group ${className} hover:border-cyan-500/50 transition-colors duration-500`}'
)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
