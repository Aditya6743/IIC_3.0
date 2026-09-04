import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Update MUJ Logo
old_muj = 'className="transition-opacity duration-300 hover:opacity-90 grayscale brightness-200 contrast-125 opacity-80 hover:opacity-100"'
new_muj = 'className="transition-all duration-300 hover:opacity-100 grayscale brightness-200 contrast-125 opacity-80 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"'
content = content.replace(old_muj, new_muj)

# Update IIC Logo
old_iic = 'className="transition-all duration-300 hover:opacity-90 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]"'
new_iic = 'className="transition-all duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] hover:brightness-110"'
content = content.replace(old_iic, new_iic)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

