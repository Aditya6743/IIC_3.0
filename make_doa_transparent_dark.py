from PIL import Image

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert('L')
    width, height = img.size
    
    out_img = Image.new('RGBA', (width, height))
    out_data = out_img.load()
    in_data = img.load()
    
    for y in range(height):
        for x in range(width):
            lum = in_data[x, y]
            
            # Alpha is inverse of luminance (black = 255 opaque, white = 0 transparent)
            alpha = max(0, min(255, int((255 - lum) * 1.5)))
            
            # The color should be pure BLACK
            out_data[x, y] = (0, 0, 0, alpha)

    out_img.save(output_path)
    print(f"Saved transparent DARK DOA logo to {output_path}")

process_logo('/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788468298712.jpg', 'public/doa-rajasthan-dark.png')
