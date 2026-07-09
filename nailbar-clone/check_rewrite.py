import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;

$rules = get_option('rewrite_rules');
if (!$rules) {
    echo "No rewrite_rules in database!\\n";
} else {
    // Show first few rules
    $i = 0;
    foreach ($rules as $regex => $query) {
        echo $regex . " => " . $query . "\\n";
        if (++$i > 20) {
            echo "... (and more)\\n";
            break;
        }
    }
}
"""

with open("check_rewrite.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_rewrite.php", 'rb') as f:
        ftp.storbinary('STOR check_rewrite.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_rewrite.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
