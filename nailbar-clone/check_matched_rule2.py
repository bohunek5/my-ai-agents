import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$db_rules = get_option('rewrite_rules');
$pathinfo = '';  // empty string = request for '/'

echo "Testing empty string against all rules:\\n";
$matched = false;
foreach ((array)$db_rules as $regex => $query) {
    if (preg_match("#^$regex#", $pathinfo, $matches)) {
        echo "MATCHED: '$regex' => '$query'\\n";
        $matched = true;
        break;
    }
}
if (!$matched) {
    echo "No match found!\\n";
    // Show first 5 rules
    $i = 0;
    foreach ((array)$db_rules as $regex => $query) {
        echo "  Rule: '" . substr($regex, 0, 60) . "' => '" . substr($query, 0, 60) . "'\\n";
        if (++$i >= 5) break;
    }
}
"""

with open("check_matched_rule2.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_matched_rule2.php", 'rb') as f:
        ftp.storbinary('STOR check_matched_rule2.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_matched_rule2.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
