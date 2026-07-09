import requests
import os
import zipfile
import math
import time

WP_URL = "https://zeglarstwomazury.pl"
DEPLOY_SECRET = "mazury-deploy-2026-v6"
ZIP_PATH = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/deploy.zip"
OUT_DIR = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/out"
CHUNK_SIZE = 1 * 1024 * 1024  # 1MB

def deploy():
    session = requests.Session()
    file_size = os.path.getsize(ZIP_PATH)
    total_chunks = math.ceil(file_size / CHUNK_SIZE)
    print(f"📤 Uploading {total_chunks} chunks to /upload_chunk.php...")

    with open(ZIP_PATH, 'rb') as f:
        for chunk_index in range(total_chunks):
            chunk_data = f.read(CHUNK_SIZE)
            print(f"  -> Uploading chunk {chunk_index + 1}/{total_chunks} ({len(chunk_data)} bytes)...")
            
            resp = session.post(f"{WP_URL}/upload_chunk.php", data={
                "ag_secret": DEPLOY_SECRET,
                "chunk_index": chunk_index,
                "total_chunks": total_chunks,
            }, files={"chunk": ("blob", chunk_data)})
            
            if resp.status_code != 200 or "ok" not in resp.text:
                print(f"❌ Chunk {chunk_index} failed! Status: {resp.status_code}, Response: {resp.text}")
                return
            time.sleep(0.5)

    print("🔄 Moving uploaded zip and extracting via /ag_move.php...")
    resp = session.post(f"{WP_URL}/ag_move.php", data={
        "ag_secret": DEPLOY_SECRET
    })
    
    print(f"✅ Deploy response: {resp.text}")

if __name__ == "__main__":
    deploy()
