import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wp_rewrite;

// Force rebuild rewrite rules
$wp_rewrite->flush_rules(true);
echo "Rewrite rules flushed.\\n";

$rules = get_option('rewrite_rules');
if (!$rules) {
    echo "Still no rules! Checking why...\\n";
    // Manually generate the rules
    $rules = $wp_rewrite->wp_rewrite_rules();
    echo "Generated rules count: " . count($rules) . "\\n";
    if ($rules) {
        update_option('rewrite_rules', $rules);
        echo "Saved rules to database.\\n";
    }
} else {
    echo "Rules in DB: " . count($rules) . "\\n";
    // Show the front page rule
    foreach ($rules as $regex => $query) {
        if (strpos($query, 'page_id') !== false || $regex === '$') {
            echo $regex . " => " . $query . "\\n";
        }
    }
}
"""

with open("force_rewrite.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("force_rewrite.php", 'rb') as f:
        ftp.storbinary('STOR force_rewrite.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/force_rewrite.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
