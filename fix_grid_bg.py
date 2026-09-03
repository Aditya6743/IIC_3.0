with open('src/components/background/SpotlightGridBackground.tsx', 'r') as f:
    content = f.read()

content = content.replace("via-purple-400", "via-emerald-400")

with open('src/components/background/SpotlightGridBackground.tsx', 'w') as f:
    f.write(content)
