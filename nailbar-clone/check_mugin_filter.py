import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
define('WP_USE_THEMES', true);
require_once __DIR__ . '/wp-load.php';

// Hook VERY early to check what happens
add_action('pre_get_posts', function($query) {
    if ($query->is_main_query()) {
        echo "===PRE_GET_POSTS===\\n";
        echo "is_main_query: YES\\n";
        echo "is_front_page: " . ($query->is_front_page() ? 'YES' : 'NO') . "\\n";
        echo "is_home: " . ($query->is_home() ? 'YES' : 'NO') . "\\n";
        echo "query_vars page_id: " . $query->get('page_id') . "\\n";
    }
}, 1);

wp();

echo "\\n===AFTER wp()===\\n";
echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\\n";
echo "queried_object_id: " . get_queried_object_id() . "\\n";
"""

with open("check_mugin_filter.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_mugin_filter.php", 'rb') as f:
        ftp.storbinary('STOR check_mugin_filter.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_mugin_filter.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
