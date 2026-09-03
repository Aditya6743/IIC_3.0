import os

pages_dir = 'src/pages'
for filename in os.listdir(pages_dir):
    if filename.endswith('.tsx'):
        filepath = os.path.join(pages_dir, filename)
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Remove import statement
        content = content.replace("import Navbar from '../components/Navbar';\n", "")
        # Remove component usage
        content = content.replace("      <Navbar />\n", "")
        
        with open(filepath, 'w') as f:
            f.write(content)

# Add Navbar to App.tsx
with open('src/App.tsx', 'r') as f:
    app_content = f.read()

if 'import Navbar' not in app_content:
    app_content = app_content.replace(
        "import CustomCursor from './components/CustomCursor';",
        "import CustomCursor from './components/CustomCursor';\nimport Navbar from './components/Navbar';"
    )
    
    app_content = app_content.replace(
        "<SmoothScroll>",
        "<Navbar />\n        <SmoothScroll>"
    )
    
    with open('src/App.tsx', 'w') as f:
        f.write(app_content)
print("Navbar pulled up to App.tsx")
