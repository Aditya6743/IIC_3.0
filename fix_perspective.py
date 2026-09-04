with open('src/components/Timeline.tsx', 'r') as f:
    content = f.read()

old_wrap = '''        transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
      >
        <SpotlightCard isDay2={isDay2} isLeft={isLeft} className={`flex flex-col ${isLeft ? 'md:items-end text-left md:text-right' : 'md:items-start text-left'}`}>'''

new_wrap = '''        transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
        style={{ perspective: "1000px" }}
      >
        <SpotlightCard isDay2={isDay2} isLeft={isLeft} className={`flex flex-col ${isLeft ? 'md:items-end text-left md:text-right' : 'md:items-start text-left'}`}>'''

content = content.replace(old_wrap, new_wrap)

with open('src/components/Timeline.tsx', 'w') as f:
    f.write(content)
