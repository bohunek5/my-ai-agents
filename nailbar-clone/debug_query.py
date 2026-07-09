import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wp, $wp_query;
$wp->parse_request();
$wp->query_posts();

echo "Query vars:\\n";
print_r($wp->query_vars);
echo "\\nQueried object: " . get_class($wp_query->queried_object) . "\\n";
echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\\n";
echo "page_on_front: " . get_option('page_on_front') . "\\n";
echo "show_on_front: " . get_option('show_on_front') . "\\n";
"""

with open("debug_query.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("debug_query.php", 'rb') as f:
        ftp.storbinary('STOR debug_query.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/debug_query.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
