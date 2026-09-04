with open('src/App.tsx', 'r') as f:
    content = f.read()

import_statement = "import SmoothScroll from './components/SmoothScroll';\n"
if 'SmoothScroll' not in content:
    content = content.replace("import CustomCursor from './components/CustomCursor';", "import CustomCursor from './components/CustomCursor';\n" + import_statement)
    
    # Wrap AnimatedRoutes inside SmoothScroll
    content = content.replace("<AnimatedRoutes />", "<SmoothScroll>\n          <AnimatedRoutes />\n        </SmoothScroll>")

with open('src/App.tsx', 'w') as f:
    f.write(content)
