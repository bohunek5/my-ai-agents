import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$pages = get_pages();
foreach ($pages as $page) {
    echo $page->ID . ": " . $page->post_title . "\\n";
}
"""

with open("list_pages.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("list_pages.php", 'rb') as f:
        ftp.storbinary('STOR list_pages.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/list_pages.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
