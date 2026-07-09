import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;
$result = $wpdb->get_results("SELECT post_content FROM {$wpdb->posts} WHERE post_content LIKE '%nailbar.com.pl%' LIMIT 5");
if (empty($result)) {
    echo "No more nailbar.com.pl in post_content!\\n";
} else {
    echo "Still found in post_content.\\n";
}
"""

with open("check_urls_again.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_urls_again.php", 'rb') as f:
        ftp.storbinary('STOR check_urls_again.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_urls_again.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
