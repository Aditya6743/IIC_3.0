from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png').convert('RGBA')
width, height = img.size
data = img.load()

y_dark = []
for y in range(height):
    dark_count = 0
    for x in range(width):
        r, g, b, a = data[x, y]
        if r < 60 and g < 80 and b < 100:
            dark_count += 1
    if dark_count > 10:
        y_dark.append(y)

# Print contiguous blocks of dark pixels on y axis
blocks = []
if y_dark:
    start = y_dark[0]
    for i in range(1, len(y_dark)):
        if y_dark[i] != y_dark[i-1] + 1:
            blocks.append((start, y_dark[i-1]))
            start = y_dark[i]
    blocks.append((start, y_dark[-1]))

print("Dark pixel y-blocks:")
for block in blocks:
    print(block)
