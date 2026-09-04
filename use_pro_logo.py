import re

# Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

nav_content = nav_content.replace('src="/iic-3.0-logo.png"', 'src="/iic-3.0-logo-pro.png"')
nav_content = re.sub(r'style=\{\{ clipPath: "inset\(0 3% 0 3%\)" \}\}\n\s+', '', nav_content)

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(nav_content)

# Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

footer_content = footer_content.replace('src="/iic-3.0-logo.png"', 'src="/iic-3.0-logo-pro.png"')
footer_content = re.sub(r"style=\{\{ clipPath: 'inset\(0 3% 0 3%\)' \}\}\n\s+", "", footer_content)

with open('src/components/Footer.tsx', 'w') as f:
    f.write(footer_content)

