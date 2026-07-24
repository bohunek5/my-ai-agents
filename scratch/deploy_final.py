import os
import zipfile
import ftplib
import requests

OUT_DIR = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"
ZIP_PATH = "/Users/karolbohdanowicz/my-ai-agents/scratch/deploy_home.zip"
FTP_HOST = "serwer2617918.home.pl"
FTP_USER = "antygravity@serwer2617918.home.pl"
FTP_PASS = "Kurwa123$$$"
HTTP_URL = "http://mazuryaktywnie.com.pl/unzip_mazuryaktywnie.php"

print(f"📦 Zipping {OUT_DIR} to {ZIP_PATH}...")
with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(OUT_DIR):
        for file in files:
            file_path = os.path.join(root, file)
            # Skip tmp folder if present
            if 'tmp' in file_path.split(os.sep):
                continue
            arcname = os.path.relpath(file_path, OUT_DIR)
            zipf.write(file_path, arcname)

print("Writing unzip_mazuryaktywnie.php...")
unzip_php_code = """<?php
// Function to delete directory recursively
function deleteDir($dirPath) {
    if (!is_dir($dirPath)) return;
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}

// Clean up old static pages to prevent collision
$old_files = [
    'about.html',
    'contact.html',
    'embed.html',
    'fleets.html',
    'index.html',
    'mazuryaktywnie-home.html',
    'sailora-home.html',
    'rezerwacja.html',
    'fundusze.html',
    'sukces.html',
    'admin.html'
];
foreach ($old_files as $f) {
    if (file_exists($f)) {
        unlink($f);
    }
}

// Clean up old assets/directories
$old_dirs = ['de', 'en', 'css', 'js', 'fonts', 'images', '_next'];
foreach ($old_dirs as $d) {
    if (is_dir($d)) {
        deleteDir($d);
    }
}

// Extract the new site
$zip = new ZipArchive;
$res = $zip->open('deploy_home.zip');
if ($res === TRUE) {
    $zip->extractTo('./');
    $zip->close();
    echo 'OK';
} else {
    echo 'FAILED';
}

// Clean up deployment files
@unlink('deploy_home.zip');
@unlink('unzip_mazuryaktywnie.php');
?>"""

unzip_file_path = "/Users/karolbohdanowicz/my-ai-agents/scratch/unzip_mazuryaktywnie.php"
with open(unzip_file_path, "w") as f:
    f.write(unzip_php_code)

print(f"📡 Connecting to FTP: {FTP_HOST}...")
ftp = ftplib.FTP(FTP_HOST)
ftp.login(FTP_USER, FTP_PASS)

print("Uploading unzip script...")
with open(unzip_file_path, "rb") as f:
    ftp.storbinary("STOR unzip_mazuryaktywnie.php", f)

print("Uploading deploy_home.zip...")
with open(ZIP_PATH, "rb") as f:
    ftp.storbinary("STOR deploy_home.zip", f)

ftp.quit()
print("FTP upload completed.")

print(f"🚀 Triggering extraction at {HTTP_URL}...")
try:
    r = requests.get(HTTP_URL, timeout=120)
    print(f"Response ({r.status_code}): {r.text}")
    if r.status_code == 200 and "OK" in r.text.strip():
        print("✅ Deployment finished successfully!")
    else:
        print("❌ Deployment might have failed.")
except Exception as e:
    print(f"❌ Error triggering unzip: {e}")

# Cleanup local temp files
if os.path.exists(ZIP_PATH):
    os.remove(ZIP_PATH)
if os.path.exists(unzip_file_path):
    os.remove(unzip_file_path)
