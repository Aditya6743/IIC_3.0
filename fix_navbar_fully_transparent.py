import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "'py-3 bg-white/[0.02] backdrop-blur-lg border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'",
    "'py-3 bg-transparent backdrop-blur-md border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'"
)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
