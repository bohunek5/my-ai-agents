import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
// Before wp-load, let's just check the REQUEST_URI
error_reporting(E_ALL);
ini_set('display_errors', 1);

$_SERVER['REQUEST_URI'] = '/';
$_SERVER['HTTP_HOST'] = 'zeglarstwomazury.pl';

require_once('wp-load.php');

global $wp, $wp_query;

// Manually setup the request
$wp->parse_request('');
$wp->query_posts();
$wp->handle_404();
$wp->send_headers();

echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\\n";
echo "show_on_front: " . get_option('show_on_front') . "\\n";
echo "page_on_front: " . get_option('page_on_front') . "\\n";
echo "\\nQuery vars: ";
print_r($wp_query->query_vars);
"""

with open("deep_debug.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("deep_debug.php", 'rb') as f:
        ftp.storbinary('STOR deep_debug.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/deep_debug.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
