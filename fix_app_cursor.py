import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add import
if "import CustomCursor" not in content:
    content = content.replace("import AudioProvider from './components/AudioProvider';", "import AudioProvider from './components/AudioProvider';\nimport CustomCursor from './components/CustomCursor';")

# Add component
if "<CustomCursor />" not in content:
    content = content.replace("<AudioProvider />", "<AudioProvider />\n      <CustomCursor />")

with open('src/App.tsx', 'w') as f:
    f.write(content)

