import re

# Update Hero.tsx
with open('src/components/Hero.tsx', 'r') as f:
    hero_content = f.read()

hero_content = hero_content.replace('src="/hero-iic.png"', 'src="/hero-iic-new.png"')
hero_content = re.sub(r"style=\{\{ transform: 'translateZ\(60px\)', clipPath: 'inset\(0 3% 0 3%\)' \}\}", "style={{ transform: 'translateZ(60px)' }}", hero_content)

with open('src/components/Hero.tsx', 'w') as f:
    f.write(hero_content)

# Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

nav_content = nav_content.replace('src="/iic-3.0-logo.png"', 'src="/iic-3.0-logo-new.png"')
nav_content = re.sub(r"style=\{\{ clipPath: 'inset\(0 3% 0 3%\)' \}\}\s*", "", nav_content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)

# Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

footer_content = footer_content.replace('src="/iic-3.0-logo.png"', 'src="/iic-3.0-logo-new.png"')
footer_content = re.sub(r"style=\{\{ clipPath: 'inset\(0 3% 0 3%\)' \}\}\s*", "", footer_content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(footer_content)

