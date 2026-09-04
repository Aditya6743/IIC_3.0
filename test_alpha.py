from PIL import Image

img = Image.open('public/iic-3.0-logo-new.png')
data = img.load()
trans_count = 0
for y in range(img.height):
    for x in range(img.width):
        if data[x, y][3] == 0:
            trans_count += 1
print(f"Transparent pixels: {trans_count} out of {img.width * img.height}")
