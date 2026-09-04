import re

with open('src/components/CustomCursor.tsx', 'r') as f:
    content = f.read()

content = content.replace('stiffness: 500, damping: 28, mass: 0.5', 'stiffness: 250, damping: 20, mass: 0.2')

with open('src/components/CustomCursor.tsx', 'w') as f:
    f.write(content)
