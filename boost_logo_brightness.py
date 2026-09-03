import re

# Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

old_nav_class = 'className="transition-all duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] hover:brightness-110"'
new_nav_class = 'className="transition-all duration-300 brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] hover:scale-105 hover:drop-shadow-[0_0_30px_rgba(34,211,238,1)] hover:brightness-150"'

nav_content = nav_content.replace(old_nav_class, new_nav_class)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)

# Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

old_foot_class = 'className="opacity-90 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500 group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.6)] group-hover:opacity-100"'
new_foot_class = 'className="brightness-125 contrast-125 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-500 group-hover:drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] group-hover:brightness-150"'

footer_content = footer_content.replace(old_foot_class, new_foot_class)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(footer_content)

