import re

with open('src/components/SmoothScroll.tsx', 'r') as f:
    content = f.read()

# Make it "Ultra Smooth"
content = content.replace('duration: 1.2,', 'duration: 1.8, // Ultra smooth')
content = content.replace('easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),', 'easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out')
content = content.replace('wheelMultiplier: 1,', 'wheelMultiplier: 0.8, // Slower, more controlled')

with open('src/components/SmoothScroll.tsx', 'w') as f:
    f.write(content)
