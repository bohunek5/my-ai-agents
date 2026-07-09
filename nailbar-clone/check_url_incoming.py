import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

# Upload a file at root that shows what PHP sees as the REQUEST_URI
code = """<?php
echo "REQUEST_URI: " . $_SERVER['REQUEST_URI'] . "\\n";
echo "HTTP_HOST: " . $_SERVER['HTTP_HOST'] . "\\n";
echo "DOCUMENT_ROOT: " . $_SERVER['DOCUMENT_ROOT'] . "\\n";
echo "SCRIPT_NAME: " . $_SERVER['SCRIPT_NAME'] . "\\n";
"""

with open("check_url_incoming.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_url_incoming.php", 'rb') as f:
        ftp.storbinary('STOR check_url_incoming.php', f)
    ftp.quit()
    
    # Try fetching the homepage URL which goes through index.php
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_url_incoming.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
