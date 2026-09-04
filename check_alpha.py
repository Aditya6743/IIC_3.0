from PIL import Image

img = Image.open('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png')
print("Mode:", img.mode)
if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
    alpha = img.getchannel('A')
    extrema = alpha.getextrema()
    print("Alpha extrema:", extrema)
    if extrema[0] < 255:
        print("Image has transparent pixels.")
    else:
        print("Image has an alpha channel but it is fully opaque.")
else:
    print("Image does NOT have an alpha channel (no transparency).")
