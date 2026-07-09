import paramiko
import os
import requests

HOST = 'serwer194525.lh.pl'
USER = 'serwer194525'
PASS = 'KochamAntygravity2026$'
REMOTE_DIR = 'public_html/zeglarstwomazury.pl'
LOCAL_ZIP = '/Users/karolbohdanowicz/Downloads/NAILBAR_FTP_ROOT.zip'
REMOTE_ZIP = f'{REMOTE_DIR}/NAILBAR_FTP_ROOT.zip'
REMOTE_PHP = f'{REMOTE_DIR}/unzip_temp.php'

php_code = """<?php
$zip = new ZipArchive;
$res = $zip->open('NAILBAR_FTP_ROOT.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'Unzip successful';
} else {
  echo 'Unzip failed';
}
?>"""

with open('unzip_temp.php', 'w') as f:
    f.write(php_code)

print("Connecting to SFTP...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(HOST, username=USER, password=PASS)
sftp = ssh.open_sftp()

print("Uploading ZIP...")
sftp.put(LOCAL_ZIP, REMOTE_ZIP)

print("Uploading PHP unzipper...")
sftp.put('unzip_temp.php', REMOTE_PHP)

print("Triggering unzip via HTTP...")
# Trigger the php script via HTTP
try:
    response = requests.get('https://zeglarstwomazury.pl/unzip_temp.php', timeout=30)
    print("Response:", response.text)
except Exception as e:
    print("HTTP request failed:", e)

print("Cleaning up remote files...")
try:
    sftp.remove(REMOTE_ZIP)
    sftp.remove(REMOTE_PHP)
except Exception as e:
    print("Failed to remove remote files:", e)

sftp.close()
ssh.close()
os.remove('unzip_temp.php')
print("Done.")
