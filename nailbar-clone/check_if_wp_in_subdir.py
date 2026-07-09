import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
echo "SCRIPT_FILENAME: " . $_SERVER['SCRIPT_FILENAME'] . "\\n";
echo "SCRIPT_NAME: " . $_SERVER['SCRIPT_NAME'] . "\\n";
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "\\n";
echo "DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "\\n";
echo "__DIR__: " . __DIR__ . "\\n";
echo "__FILE__: " . __FILE__ . "\\n";
"""

with open("serverinfo.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("serverinfo.php", 'rb') as f:
        ftp.storbinary('STOR serverinfo.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/serverinfo.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
