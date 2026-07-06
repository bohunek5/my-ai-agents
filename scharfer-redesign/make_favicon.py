import sys
from PIL import Image

def make_favicon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    side = max(w, h)
    
    square = Image.new("RGBA", (side, side), (255, 255, 255, 0))
    x = (side - w) // 2
    y = (side - h) // 2
    square.paste(img, (x, y))
    
    square.save(output_path, format='ICO', sizes=[(16, 16), (32, 32), (64, 64), (128, 128), (256, 256)])

if __name__ == '__main__':
    make_favicon('public/logo_scharfer.png', 'src/app/favicon.ico')
