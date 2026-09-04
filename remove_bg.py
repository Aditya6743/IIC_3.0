from PIL import Image

def flood_fill_transparency(img_path, out_path, tolerance=30):
    img = Image.open(img_path).convert("RGBA")
    data = img.load()
    width, height = img.size
    
    # Target color is the top-left pixel
    target_r, target_g, target_b, _ = data[0, 0]
    
    # Check if top-left is white-ish (to confirm background is white)
    if not (target_r > 200 and target_g > 200 and target_b > 200):
        print("Top left is not white, doing simple thresholding instead.")
        # If not, let's just do a simple threshold
        for y in range(height):
            for x in range(width):
                r, g, b, a = data[x, y]
                if r > 240 and g > 240 and b > 240:
                    data[x, y] = (r, g, b, 0)
        img.save(out_path)
        return

    # BFS for flood fill
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    for start_node in queue:
        if start_node not in visited:
            q = [start_node]
            while q:
                x, y = q.pop(0)
                if (x, y) in visited:
                    continue
                visited.add((x, y))
                
                r, g, b, a = data[x, y]
                
                # Check if pixel is within tolerance of target color
                if abs(r - target_r) <= tolerance and abs(g - target_g) <= tolerance and abs(b - target_b) <= tolerance:
                    data[x, y] = (r, g, b, 0)
                    
                    # Add neighbors
                    if x > 0: q.append((x - 1, y))
                    if x < width - 1: q.append((x + 1, y))
                    if y > 0: q.append((x, y - 1))
                    if y < height - 1: q.append((x, y + 1))
                    
    img.save(out_path)
    print(f"Saved transparent image to {out_path}")

input_img = '/Users/aditya/.gemini/antigravity/brain/e0833e0c-e8eb-4762-a68d-4957cc5c5224/.user_uploaded/media_1788464288312.png'
flood_fill_transparency(input_img, 'public/iic-3.0-logo-new.png', tolerance=15)
flood_fill_transparency(input_img, 'public/hero-iic-new.png', tolerance=15)
