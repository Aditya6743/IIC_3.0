import re

# 1. Remove from Home.tsx
with open('src/pages/Home.tsx', 'r') as f:
    home_content = f.read()

home_content = home_content.replace("import About from '../components/About';\n", "")
home_content = home_content.replace("      <About />\n", "")

with open('src/pages/Home.tsx', 'w') as f:
    f.write(home_content)

# 2. Add to AboutContent.tsx
with open('src/components/AboutContent.tsx', 'r') as f:
    about_content = f.read()

if "import About from './About';" not in about_content:
    about_content = about_content.replace("import Timeline from './Timeline';", "import Timeline from './Timeline';\nimport About from './About';")
    
    # We will place it right before the Timeline
    about_content = about_content.replace("{/* Timeline Section */}", "<About />\n\n        {/* Timeline Section */}")

with open('src/components/AboutContent.tsx', 'w') as f:
    f.write(about_content)
