with open('src/index.css', 'r') as f:
    content = f.read()

content = content.replace('scroll-behavior: smooth;', '/* scroll-behavior: smooth; removed for Lenis */')

with open('src/index.css', 'w') as f:
    f.write(content)
