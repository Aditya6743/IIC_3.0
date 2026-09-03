import re

with open('src/components/Hero.tsx', 'r') as f:
    content = f.read()

old_div = r'''<div className="absolute inset-0 w-full h-full bg-cyan-400/20 blur-\[60px\] rounded-full transition-opacity duration-500 opacity-50 group-hover:opacity-100" style=\{\{ transform: 'translateZ\(20px\)' \}\} />'''
new_div = '''<div className="absolute inset-0 w-full h-full bg-cyan-400/15 blur-[50px] rounded-full transition-opacity duration-500 opacity-30 group-hover:opacity-60" style={{ transform: 'translateZ(20px)' }} />'''

content = re.sub(old_div, new_div, content)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(content)
