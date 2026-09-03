from PIL import Image

def process_logo_full(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    data = img.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = data[x, y]
            
            if r > 245 and g > 245 and b > 245:
                data[x, y] = (0, 0, 0, 0)
            else:
                alpha_float = max(0, min(1.0, (255 - r) / 200.0))
                
                if alpha_float <= 0.05:
                    data[x, y] = (0, 0, 0, 0)
                else:
                    new_r = int(max(0, min(255, (r - 255 * (1 - alpha_float)) / alpha_float)))
                    new_g = int(max(0, min(255, (g - 255 * (1 - alpha_float)) / alpha_float)))
                    new_b = int(max(0, min(255, (b - 255 * (1 - alpha_float)) / alpha_float)))
                    
                    # If this is a very dark pixel (the text), let's make it bright cyan or white
                    # so it can be read on a dark background now that the white banner is gone!
                    if new_r < 60 and new_g < 80 and new_b < 100:
                        new_r, new_g, new_b = 200, 240, 255 # Ice white/cyan
                        
                    new_a = int(alpha_float * 255)
                    
                    data[x, y] = (new_r, new_g, new_b, new_a)

    img.save(output_path)
    print(f"Successfully applied full matting and inverted text for {output_path}")

input_img = '/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png'
process_logo_full(input_img, 'public/iic-3.0-logo-pro.png')

