import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$post = get_post(168);
if ($post) {
    echo "ID: " . $post->ID . "\\n";
    echo "Title: " . $post->post_title . "\\n";
    echo "Status: " . $post->post_status . "\\n";
    echo "Type: " . $post->post_type . "\\n";
} else {
    echo "Page 168 not found!\\n";
}
"""

with open("check_page_168.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_page_168.php", 'rb') as f:
        ftp.storbinary('STOR check_page_168.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_page_168.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
