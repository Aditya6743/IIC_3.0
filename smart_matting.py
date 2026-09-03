from PIL import Image

def process_logo(input_path, output_path):
    img = Image.open(input_path).convert('RGBA')
    width, height = img.size
    data = img.load()

    # 1. Flood fill to find exterior background
    exterior = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    visited = set()
    
    while queue:
        x, y = queue.pop(0)
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        r, g, b, a = data[x, y]
        # Condition to spread: must be whitish (R>150, G>150, B>150)
        # Cyan has R~12, so it acts as a perfect wall.
        if r > 150 and g > 150 and b > 150:
            exterior.add((x, y))
            if x > 0: queue.append((x - 1, y))
            if x < width - 1: queue.append((x + 1, y))
            if y > 0: queue.append((x, y - 1))
            if y < height - 1: queue.append((x, y + 1))

    # 2. Dilate the exterior to include the anti-aliased edge (halo)
    dilated_exterior = set(exterior)
    for _ in range(3): # Dilate 3 times
        new_points = set()
        for x, y in dilated_exterior:
            if x > 0: new_points.add((x - 1, y))
            if x < width - 1: new_points.add((x + 1, y))
            if y > 0: new_points.add((x, y - 1))
            if y < height - 1: new_points.add((x, y + 1))
        dilated_exterior.update(new_points)
        
    # Filter to only keep valid coordinates
    dilated_exterior = {(x, y) for x, y in dilated_exterior if 0 <= x < width and 0 <= y < height}

    # 3. Apply alpha matting ONLY to the dilated exterior
    for y in range(height):
        for x in range(width):
            if (x, y) in dilated_exterior:
                r, g, b, a = data[x, y]
                
                # If it's almost pure white, kill it completely
                if r > 245 and g > 245 and b > 245:
                    data[x, y] = (0, 0, 0, 0)
                else:
                    # Estimate alpha based on Red channel (since foreground cyan has low Red)
                    # We assume true foreground has R ~ 0-50, and background has R = 255
                    alpha_float = max(0, min(1.0, (255 - r) / 200.0))
                    
                    if alpha_float <= 0.05:
                        data[x, y] = (0, 0, 0, 0)
                    else:
                        # Un-premultiply RGB to recover original color without white cast
                        # C_true = (C_obs - 255(1 - a)) / a
                        new_r = int(max(0, min(255, (r - 255 * (1 - alpha_float)) / alpha_float)))
                        new_g = int(max(0, min(255, (g - 255 * (1 - alpha_float)) / alpha_float)))
                        new_b = int(max(0, min(255, (b - 255 * (1 - alpha_float)) / alpha_float)))
                        new_a = int(alpha_float * 255)
                        
                        data[x, y] = (new_r, new_g, new_b, new_a)
            # Pixels outside the dilated exterior (like the banner interior) are untouched!

    img.save(output_path)
    print(f"Successfully matted and saved to {output_path}")

input_img = '/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png'
process_logo(input_img, 'public/iic-3.0-logo-pro.png')

