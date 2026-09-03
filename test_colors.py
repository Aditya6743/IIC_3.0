from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png').convert('RGB')
data = img.load()

# Find some non-white pixels
for y in range(img.height // 2, img.height // 2 + 10):
    for x in range(img.width // 2, img.width // 2 + 10):
        print(data[x, y])
