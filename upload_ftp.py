import ftplib
import os
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/scharfer.com.pl')

print("Uploading out.zip...")
with open('/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/out.zip', 'rb') as f:
    ftp.storbinary('STOR out.zip', f)
print("Uploaded out.zip")

unzip_php = """<?php
$zip = new ZipArchive;
$res = $zip->open('out.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'OK';
} else {
  echo 'FAILED';
}
?>"""

with open('/Users/karolbohdanowicz/my-ai-agents/unzip_scharfer.php', 'w') as f:
    f.write(unzip_php)

print("Uploading unzip_scharfer.php...")
with open('/Users/karolbohdanowicz/my-ai-agents/unzip_scharfer.php', 'rb') as f:
    ftp.storbinary('STOR unzip_scharfer.php', f)
print("Uploaded unzip script.")

ftp.quit()
