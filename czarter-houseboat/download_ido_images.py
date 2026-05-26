import os
import urllib.request

images = [
    "https://mazury.holiday/img/galerie/103793_4.jpg",
    "https://mazury.holiday/img/galerie/103768_4.jpg",
    "https://mazury.holiday/img/galerie/103779_4.jpg",
    "https://mazury.holiday/img/galerie/103761_4.jpg",
    "https://mazury.holiday/img/galerie/103772_4.jpg",
    "https://mazury.holiday/img/galerie/103767_4.jpg"
]

target_dir = "public/images/stranda/C_Generic"
os.makedirs(target_dir, exist_ok=True)

for i, img_url in enumerate(images):
    filename = os.path.join(target_dir, f"C_Generic_{i+1}.jpg")
    try:
        urllib.request.urlretrieve(img_url, filename)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed {img_url}: {e}")

