import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
if "import About from './pages/About';" not in content:
    content = content.replace("import Home from './pages/Home';", "import Home from './pages/Home';\nimport About from './pages/About';")

# Add Route
if '<Route path="/about" element={<PageTransition><About /></PageTransition>} />' not in content:
    content = content.replace('<Route path="/" element={<PageTransition><Home /></PageTransition>} />', '<Route path="/" element={<PageTransition><Home /></PageTransition>} />\n        <Route path="/about" element={<PageTransition><About /></PageTransition>} />')

with open('src/App.tsx', 'w') as f:
    f.write(content)

