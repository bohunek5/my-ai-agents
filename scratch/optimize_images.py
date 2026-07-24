import os
from PIL import Image

gallery_dir = '/Users/karolbohdanowicz/my-ai-agents/mazuryaktywnie/public/images/gallery'

def optimize():
    for filename in os.listdir(gallery_dir):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            filepath = os.path.join(gallery_dir, filename)
            size_before = os.path.getsize(filepath)
            print(f"Optimizing {filename} ({size_before / 1024 / 1024:.2f} MB)...")
            
            with Image.open(filepath) as img:
                # Resize if width > 1920
                if img.width > 1920:
                    ratio = 1920 / img.width
                    new_size = (1920, int(img.height * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Save back with compression
                if filename.lower().endswith('.png'):
                    img.save(filepath, optimize=True)
                else:
                    img.save(filepath, 'JPEG', quality=85, optimize=True)
            
            size_after = os.path.getsize(filepath)
            print(f"Optimized {filename} to {size_after / 1024 / 1024:.2f} MB (saved { (size_before - size_after) / 1024 / 1024:.2f} MB)")

if __name__ == "__main__":
    optimize()
