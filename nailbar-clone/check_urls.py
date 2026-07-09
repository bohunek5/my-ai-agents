import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;
$result = $wpdb->get_results("SELECT post_content FROM {$wpdb->posts} WHERE post_content LIKE '%http%' LIMIT 5");
foreach ($result as $row) {
    preg_match_all('/https?:\\/\\/[^"\\\'\\s]+/', $row->post_content, $matches);
    if (!empty($matches[0])) {
        print_r(array_slice(array_unique($matches[0]), 0, 5));
    }
}
"""

with open("check_urls.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_urls.php", 'rb') as f:
        ftp.storbinary('STOR check_urls.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_urls.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
