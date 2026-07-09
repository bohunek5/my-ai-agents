import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
echo "siteurl: " . get_option('siteurl') . "\\n";
echo "home: " . get_option('home') . "\\n";
"""

with open("check_url.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_url.php", 'rb') as f:
        ftp.storbinary('STOR check_url.php', f)
    ftp.quit()
    
    response = urllib.request.urlopen("http://serwer194525.lh.pl/zeglarstwomazury.pl/check_url.php")
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
