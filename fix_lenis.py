import re

with open('src/components/SmoothScroll.tsx', 'r') as f:
    content = f.read()

content = content.replace('duration: 1.8, // Ultra smooth', 'duration: 1.2, // Production standard smooth')
content = content.replace('wheelMultiplier: 0.8, // Slower, more controlled', 'wheelMultiplier: 1.0, // Natural feel')

with open('src/components/SmoothScroll.tsx', 'w') as f:
    f.write(content)
