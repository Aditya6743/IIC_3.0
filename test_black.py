from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png').convert('RGB')
data = img.load()

# Find darkest pixels
for y in range(img.height):
    for x in range(img.width):
        r, g, b = data[x, y]
        if r < 50 and g < 50 and b < 50:
            print(f"Dark pixel at {x},{y}: {r, g, b}")
            break
    else:
        continue
    break
