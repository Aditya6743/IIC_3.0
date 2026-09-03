import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
if "SpotlightGridBackground" not in content:
    content = content.replace("import AudioProvider from './components/AudioProvider';", "import AudioProvider from './components/AudioProvider';\nimport SpotlightGridBackground from './components/background/SpotlightGridBackground';")

# Add component
if "<SpotlightGridBackground />" not in content:
    content = content.replace('<div className="relative z-10 bg-black min-h-screen select-none">', '<div className="relative z-10 bg-black min-h-screen select-none">\n        <SpotlightGridBackground />')

with open('src/App.tsx', 'w') as f:
    f.write(content)

with open('src/pages/Home.tsx', 'r') as f:
    home_content = f.read()

home_content = home_content.replace("import SpotlightGridBackground from '../components/background/SpotlightGridBackground';\n", "")
home_content = home_content.replace("      <SpotlightGridBackground />\n", "")

with open('src/pages/Home.tsx', 'w') as f:
    f.write(home_content)

