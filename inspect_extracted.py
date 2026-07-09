import glob
import os

extracted_dir = "/Users/karolbohdanowicz/my-ai-agents/CONTENT-BOSS/pliki-i-dane/drawings_extracted"
images = glob.glob(os.path.join(extracted_dir, "real_*.jpeg")) + glob.glob(os.path.join(extracted_dir, "real_*.png"))
images.sort()

html = """<!DOCTYPE html>
<html>
<head>
    <title>Inspect Real Page 8 and 12</title>
    <style>
        body { font-family: sans-serif; background: #f3f4f6; padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; text-align: center; }
        img { max-width: 100%; max-height: 150px; object-fit: contain; }
        .name { font-size: 11px; font-weight: bold; margin-top: 10px; word-break: break-all; }
    </style>
</head>
<body>
    <h1>Real Page 8 (Klik) and Page 12 (Switches) Drawings</h1>
    <div class="grid">
"""

for img_path in images:
    name = os.path.basename(img_path)
    # Copy to workspace assets folder to make sure it loads
    dest = os.path.join("/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/assets/k2018", name)
    shutil_copy = True
    try:
        import shutil
        shutil.copy(img_path, dest)
    except Exception as e:
        print(f"Error copying {name}: {e}")
        shutil_copy = False
        
    if shutil_copy:
        html += f"""
            <div class="card">
                <img src="k2018/{name}">
                <div class="name">{name}</div>
            </div>
        """

html += """
    </div>
</body>
</html>
"""

inspect_path = "/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/assets/inspect_new.html"
with open(inspect_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Inspection HTML generated at:", inspect_path)
