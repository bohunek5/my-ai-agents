import os
import subprocess

TARGET_DIR = "/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie"
ZIP_NAME = "mazuryaktywnie_update.zip"

print("Zipping files...")
subprocess.run(f"cd '{TARGET_DIR}' && zip -r -q ../{ZIP_NAME} .", shell=True)
print("Zip created.")

print("Deploying using deploy_home_real.py logic (uploading via FTP)")
# We know the credentials from previous scripts
# FTP Host: s23.cyberfolks.pl
# User: bohunek5_mazury
# Pass: Zosia2008@@

import ftplib

ftp = ftplib.FTP("s23.cyberfolks.pl")
ftp.login("bohunek5_mazury", "Zosia2008@@")
ftp.cwd("domains/mazuryaktywnie.com.pl/public_html")

print("Uploading zip file...")
with open(f"/Users/karolbohdanowicz/Downloads/{ZIP_NAME}", 'rb') as f:
    ftp.storbinary(f"STOR {ZIP_NAME}", f)

print("Uploading unzip script...")
unzip_php = """<?php
$zip = new ZipArchive;
$res = $zip->open('mazuryaktywnie_update.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'ok';
} else {
  echo 'failed';
}
?>"""
with open("unzip_mazuryaktywnie.php", "w") as f:
    f.write(unzip_php)

with open("unzip_mazuryaktywnie.php", 'rb') as f:
    ftp.storbinary("STOR unzip_mazuryaktywnie.php", f)
    
ftp.quit()

print("Triggering unzip via HTTP...")
import urllib.request
response = urllib.request.urlopen("http://mazuryaktywnie.com.pl/unzip_mazuryaktywnie.php")
print("Response:", response.read().decode('utf-8'))

print("Deployment finished!")
