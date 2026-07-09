import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
require_once('wp-load.php');
global $wpdb;
$permalink = get_option('permalink_structure');
echo "Permalink structure: '" . $permalink . "'\\n";

$rules = get_option('rewrite_rules');
echo "Rules count: " . count((array)$rules) . "\\n";

// Check for front page entries
if (!empty($rules)) {
    foreach ((array)$rules as $regex => $query) {
        if ($regex === '$' || strpos($query, 'page_id') !== false) {
            echo "  Rule: '$regex' => '$query'\\n";
        }
    }
}
"""

with open("check_permalink.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_permalink.php", 'rb') as f:
        ftp.storbinary('STOR check_permalink.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_permalink.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
