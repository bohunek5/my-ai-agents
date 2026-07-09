import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
flush_rewrite_rules();
echo "Permalinks flushed.\\n";
"""

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    with open("flush_permalinks.php", "wb") as f:
        f.write(code.encode('utf-8'))
    
    with open("flush_permalinks.php", "rb") as f:
        ftp.storbinary('STOR flush_permalinks.php', f)
    
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/flush_permalinks.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
