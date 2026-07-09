import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
$_SERVER['REQUEST_URI'] = '/';

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

global $wp_rewrite;

// Check what rewrite rules look like
$rules = $wp_rewrite->wp_rewrite_rules();
echo "Generated rules on the fly: " . count($rules) . "\\n";

// DB rules
$db_rules = get_option('rewrite_rules');
echo "DB rules: " . count((array)$db_rules) . "\\n";

// Now manually test if '' matches anything
echo "\\nTesting REQUEST='/' (stripped to ''):\\n";
$request = '/';
$pathinfo = $request;
// WordPress strips leading slash
$pathinfo = ltrim($pathinfo, '/');
echo "Stripped request: '$pathinfo'\\n";

// Check each rule
if (!empty($db_rules)) {
    foreach ((array)$db_rules as $regex => $query) {
        if (preg_match("#^$regex#", $pathinfo, $matches)) {
            echo "MATCHED: '$regex' => '$query'\\n";
            break;
        }
    }
} else {
    echo "No DB rules to match against!\\n";
}
"""

with open("check_matched_rule.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_matched_rule.php", 'rb') as f:
        ftp.storbinary('STOR check_matched_rule.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_matched_rule.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
