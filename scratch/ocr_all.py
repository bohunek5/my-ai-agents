import subprocess
import os

media_dir = "/Users/karolbohdanowicz/my-ai-agents/LASERTAG/assets/media"
cennik_path = os.path.join(media_dir, "CENNIKIKI I PAKIETY LT.jpg")
plakat_path = os.path.join(media_dir, "PLAKAT LT.jpg")

swift_script = "/Users/karolbohdanowicz/my-ai-agents/scratch/ocr.swift"

def run_ocr(image_path, output_name):
    print(f"Running OCR on {os.path.basename(image_path)}...")
    result = subprocess.run(["swift", swift_script, image_path], capture_output=True, text=True)
    if result.returncode == 0:
        out_path = f"/Users/karolbohdanowicz/my-ai-agents/scratch/{output_name}"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(result.stdout)
        print(f"Saved to {out_path}")
    else:
        print(f"Error for {image_path}: {result.stderr}")

run_ocr(cennik_path, "cennik_ocr.txt")
run_ocr(plakat_path, "plakat_ocr.txt")
