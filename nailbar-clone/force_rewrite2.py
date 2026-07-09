import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
require_once('wp-load.php');

global $wp_rewrite;
$rules = $wp_rewrite->wp_rewrite_rules();
echo "Generated rules count: " . count((array)$rules) . "\\n";

if (!empty($rules)) {
    update_option('rewrite_rules', $rules);
    echo "Saved.\\n";
    // Check if front page rule exists
    $front = array_filter($rules, function($q) { return strpos($q, 'page_id') !== false; });
    echo "Front page rules: " . count($front) . "\\n";
} else {
    echo "No rules generated! Trying alternative...\\n";
    $wp_rewrite->set_permalink_structure('/%postname%/');
    $wp_rewrite->flush_rules();
    $rules2 = get_option('rewrite_rules');
    echo "Rules after set_permalink: " . count((array)$rules2) . "\\n";
}
"""

with open("force_rewrite2.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("force_rewrite2.php", 'rb') as f:
        ftp.storbinary('STOR force_rewrite2.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/force_rewrite2.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
