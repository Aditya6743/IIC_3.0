with open('src/components/SponsorsContent.tsx', 'r') as f:
    content = f.read()

content = content.replace("logo: '/doa-rajasthan.png',", "logo: '/doa-rajasthan-dark.png',")

with open('src/components/SponsorsContent.tsx', 'w') as f:
    f.write(content)
