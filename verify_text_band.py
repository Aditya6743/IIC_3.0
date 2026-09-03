from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png').convert('RGBA')
width, height = img.size
data = img.load()

for block in [(120, 222), (240, 263), (279, 381)]:
    x_dark = []
    for y in range(block[0], block[1]+1):
        for x in range(width):
            r, g, b, a = data[x, y]
            if r < 60 and g < 80 and b < 100:
                x_dark.append(x)
    if x_dark:
        print(f"Y-Block {block}: X ranges from {min(x_dark)} to {max(x_dark)}")
