import re

with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

# Replace the dynamic tailwind class with a static one, or use style prop.
# Since shadowColor is just cyan or emerald, we can use the class directly based on isDay2.
old_class = "hover:bg-black/60 hover:border-white/10 group-hover:shadow-[0_0_20px_${shadowColor}] flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}"
new_class = "hover:bg-black/60 hover:border-white/10 ${isDay2 ? 'group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]' : 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'} flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'}`}"

content = content.replace(old_class, new_class)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
