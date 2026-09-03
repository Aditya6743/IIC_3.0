import re

with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

# Apply clipPath to the IIC logo in the navbar
old_nav = r'''                src="/iic-3\.0-logo\.png"
                width="130"
                className="transition-all duration-300 drop-shadow-\[0_0_15px_rgba\(34,211,238,0\.4\)\] hover:scale-105 hover:drop-shadow-\[0_0_25px_rgba\(34,211,238,0\.8\)\] hover:brightness-110"
              />'''

new_nav = '''                src="/iic-3.0-logo.png"
                width="130"
                className="transition-all duration-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] hover:brightness-110"
                style={{ clipPath: 'inset(0 10% 0 10%)' }}
              />'''

content = re.sub(old_nav, new_nav, content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)
