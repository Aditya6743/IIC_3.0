from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png').convert('RGB')
data = img.load()

max_r = 0
for y in range(img.height):
    for x in range(img.width):
        r, g, b = data[x, y]
        # Ignore white/grayish pixels
        if g > r + 30 and b > r + 30: # This is a distinctly cyan/blue pixel
            max_r = max(max_r, r)

print("Max Red in Cyan pixels:", max_r)
