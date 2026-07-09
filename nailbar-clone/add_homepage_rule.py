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

global $wpdb, $wp_rewrite;

// Get current rules
$rules = get_option('rewrite_rules');
$rules = (array)$rules;

echo "Current rules count: " . count($rules) . "\\n";
echo "'\\$' rule exists: " . (isset($rules['$']) ? 'YES' : 'NO') . "\\n";

// Add the '$' rule for front page (page_id=168)
$rules['$'] = 'index.php?&page_id=168';

// Save it back
update_option('rewrite_rules', $rules);
echo "Updated rules count: " . count($rules) . "\\n";

// Verify
$updated = get_option('rewrite_rules');
echo "'\\$' rule now: " . (isset($updated['$']) ? $updated['$'] : 'MISSING') . "\\n";

echo "\\nFront page is now mapped.\\n";
"""

with open("add_homepage_rule.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("add_homepage_rule.php", 'rb') as f:
        ftp.storbinary('STOR add_homepage_rule.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/add_homepage_rule.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
