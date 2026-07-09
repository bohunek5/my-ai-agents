import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
require_once __DIR__ . '/wp-load.php';

echo "ABSPATH: " . ABSPATH . "\\n";
echo "WP_CONTENT_DIR: " . WP_CONTENT_DIR . "\\n";
echo "home_url: " . home_url() . "\\n";
echo "site_url: " . site_url() . "\\n";

// Check what URL REQUEST maps to
global $wp;
echo "\\nRequest: " . $wp->request . "\\n";
echo "Matched rule: " . (property_exists($wp, 'matched_rule') ? $wp->matched_rule : 'n/a') . "\\n";
echo "Matched query: " . (property_exists($wp, 'matched_query') ? $wp->matched_query : 'n/a') . "\\n";
"""

with open("check_abspath.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_abspath.php", 'rb') as f:
        ftp.storbinary('STOR check_abspath.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_abspath.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
