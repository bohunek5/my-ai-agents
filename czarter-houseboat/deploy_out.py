import requests
import os
import zipfile
import math
import time

WP_URL = "https://zeglarstwomazury.pl"
WP_USER = "k@rol"
WP_PASS = "h59#%5*DcWT2yyFJ"
DEPLOY_SECRET = "mazury-deploy-2026-v6"
ZIP_PATH = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/deploy.zip"
OUT_DIR = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/out"
CHUNK_SIZE = 1 * 1024 * 1024  # 1MB

def create_zip():
    print(f"📦 Zipping {OUT_DIR} to {ZIP_PATH}...")
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(OUT_DIR):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, start=OUT_DIR)
                zf.write(file_path, arcname)
    print(f"✅ Zip created: {os.path.getsize(ZIP_PATH)} bytes")

def deploy():
    session = requests.Session()
    session.cookies.set("wordpress_test_cookie", "WP Cookie check")

    print("🔐 Logging into WordPress...")
    r = session.post(f"{WP_URL}/wp-login.php", data={
        "log": WP_USER, "pwd": WP_PASS, 
        "wp-submit": "Log In", "redirect_to": f"{WP_URL}/wp-admin/", "testcookie": "1"
    }, timeout=15, allow_redirects=True)
    
    if "wp-admin" not in r.url and "Dashboard" not in r.text:
        print("❌ Login failed!")
        return

    file_size = os.path.getsize(ZIP_PATH)
    total_chunks = math.ceil(file_size / CHUNK_SIZE)
    print(f"📤 Uploading {total_chunks} chunks...")

    with open(ZIP_PATH, 'rb') as f:
        for chunk_index in range(total_chunks):
            chunk_data = f.read(CHUNK_SIZE)
            print(f"  -> Uploading chunk {chunk_index + 1}/{total_chunks} ({len(chunk_data)} bytes)...")
            
            resp = session.post(f"{WP_URL}/wp-admin/admin-post.php", data={
                "action": "ag_upload_chunk",
                "ag_secret": DEPLOY_SECRET,
                "chunk_index": chunk_index,
                "total_chunks": total_chunks,
            }, files={"chunk": ("blob", chunk_data)})
            
            if resp.status_code != 200 or "ok" not in resp.text:
                print(f"❌ Chunk {chunk_index} failed! Status: {resp.status_code}, Response: {resp.text}")
                return
            time.sleep(0.5)

    print("🔄 Moving uploaded zip and extracting...")
    resp = session.post(f"{WP_URL}/wp-admin/admin-post.php", data={
        "action": "ag_move",
        "ag_secret": DEPLOY_SECRET
    })
    
    print(f"✅ Deploy response: {resp.text}")

if __name__ == "__main__":
    create_zip()
    deploy()
