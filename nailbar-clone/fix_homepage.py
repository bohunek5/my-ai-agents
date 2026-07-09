import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
echo "show_on_front: " . get_option('show_on_front') . "\\n";
echo "page_on_front: " . get_option('page_on_front') . "\\n";
echo "page_for_posts: " . get_option('page_for_posts') . "\\n";
"""

with open("fix_homepage.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_homepage.php", 'rb') as f:
        ftp.storbinary('STOR fix_homepage.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_homepage.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
