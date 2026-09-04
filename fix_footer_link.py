import re

with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

old_link = '''<Link to="/" className="group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl">'''
new_link = '''<Link to="/" onClick={() => window.scrollTo(0, 0)} className="group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-xl">'''

if old_link in content:
    content = content.replace(old_link, new_link)
    with open('src/components/Footer.tsx', 'w') as f:
        f.write(content)
    print("Updated footer link")
else:
    print("Could not find Footer old link. Checking exact string...")
    # fallback regex
    content = re.sub(
        r'<Link to="/" className="group inline-block([^"]*)">',
        r'<Link to="/" onClick={() => window.scrollTo(0, 0)} className="group inline-block\1">',
        content
    )
    with open('src/components/Footer.tsx', 'w') as f:
        f.write(content)
