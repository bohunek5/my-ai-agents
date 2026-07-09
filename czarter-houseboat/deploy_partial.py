import requests
import os
import io
import zipfile
import time

WP_URL = "https://zeglarstwomazury.pl"
WP_USER = "k@rol"
WP_PASS = "h59#%5*DcWT2yyFJ"
DEPLOY_SECRET = "mazury-deploy-2026-v6"

OUT_DIR = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/out"
ZIP_PATH = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/deploy_partial.zip"

print(f"📦 Zipping {OUT_DIR} to {ZIP_PATH} (excluding images)...")

# Create zip file excluding images/
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(OUT_DIR):
        if '/images' in root:
            continue
        for file in files:
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, OUT_DIR)
            zipf.write(file_path, arcname)

file_size = os.path.getsize(ZIP_PATH)
print(f"✅ Zip created: {file_size} bytes")

print("🔐 Logging into WordPress...")
session = requests.Session()
session.cookies.set("wordpress_test_cookie", "WP Cookie check")

r = session.post(f"{WP_URL}/wp-login.php", data={
    "log": WP_USER, "pwd": WP_PASS, 
    "wp-submit": "Log In", "redirect_to": f"{WP_URL}/wp-admin/", "testcookie": "1"
}, timeout=15, allow_redirects=True)

chunk_size = 1024 * 1024  # 1MB
total_chunks = (file_size + chunk_size - 1) // chunk_size

print(f"📤 Uploading {total_chunks} chunks...")

with open(ZIP_PATH, 'rb') as f:
    for i in range(total_chunks):
        chunk_data = f.read(chunk_size)
        print(f"  -> Uploading chunk {i+1}/{total_chunks} ({len(chunk_data)} bytes)...")
        
        retries = 3
        while retries > 0:
            try:
                resp = session.post(
                    f"{WP_URL}/wp-admin/admin-post.php",
                    data={
                        "action": "ag_upload_chunk_14",
                        "ag_secret": DEPLOY_SECRET,
                        "chunk_index": i
                    },
                    files={
                        "chunk": ("chunk.dat", chunk_data, "application/octet-stream")
                    },
                    timeout=30
                )
                if resp.status_code == 200 and resp.text.strip() == "ok":
                    break
                else:
                    print(f"     ⚠️ Chunk {i} failed with {resp.status_code}, response: {resp.text[:50]}")
                    retries -= 1
                    time.sleep(2)
            except Exception as e:
                print(f"     ⚠️ Exception on chunk {i}: {e}")
                retries -= 1
                time.sleep(2)
        
        if retries == 0:
            print("❌ Failed to upload chunk after retries.")
            exit(1)

print("🚀 Triggering partial unzip and move 14...")
resp = session.post(
    f"{WP_URL}/wp-admin/admin-post.php",
    data={
        "action": "ag_move_partial_14",
        "ag_secret": DEPLOY_SECRET
    },
    timeout=60
)

if resp.status_code == 200 and "ok" in resp.text:
    print("✅ Partial deploy finished successfully!")
else:
    print(f"❌ Deploy move failed! Status: {resp.status_code}")
    print(f"Response: {resp.text[:200]}")
