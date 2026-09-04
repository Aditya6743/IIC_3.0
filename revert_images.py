import re

# Update Hero.tsx
with open('src/components/Hero.tsx', 'r') as f:
    hero_content = f.read()

hero_content = hero_content.replace('src="/hero-iic-new.png"', 'src="/hero-iic.png"')
hero_content = hero_content.replace("style={{ transform: 'translateZ(60px)' }}", "style={{ transform: 'translateZ(60px)', clipPath: 'inset(0 3% 0 3%)' }}")

with open('src/components/Hero.tsx', 'w') as f:
    f.write(hero_content)

# Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

nav_content = nav_content.replace('src="/iic-3.0-logo-new.png"', 'src="/iic-3.0-logo.png"')
# add clipPath to className
nav_content = re.sub(r'(className="transition-all duration-300 drop-shadow-\[0_0_15px_rgba\(34,211,238,0\.4\)\] hover:scale-105 hover:drop-shadow-\[0_0_25px_rgba\(34,211,238,0\.8\)\] hover:brightness-110")', r'\1\n                style={{ clipPath: "inset(0 3% 0 3%)" }}', nav_content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)

# Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

footer_content = footer_content.replace('src="/iic-3.0-logo-new.png"', 'src="/iic-3.0-logo.png"')
footer_content = re.sub(r'(className="opacity-90 drop-shadow-\[0_0_15px_rgba\(34,211,238,0\.3\)\] transition-all duration-500 group-hover:drop-shadow-\[0_0_30px_rgba\(34,211,238,0\.7\)\] group-hover:opacity-100 group-hover:brightness-110")', r'\1\n                  style={{ clipPath: "inset(0 3% 0 3%)" }}', footer_content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(footer_content)

