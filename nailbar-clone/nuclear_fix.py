import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;

// 1. Delete the cached rewrite_rules so WordPress rebuilds them fresh
delete_option('rewrite_rules');
echo "1. rewrite_rules deleted.\\n";

// 2. Force-delete object cache for options
wp_cache_flush();
echo "2. Object cache flushed.\\n";

// 3. Confirm the front page options are set correctly
$wpdb->query("UPDATE {$wpdb->options} SET option_value = 'page' WHERE option_name = 'show_on_front'");
$wpdb->query("UPDATE {$wpdb->options} SET option_value = '168' WHERE option_name = 'page_on_front'");
echo "3. Front page options updated.\\n";

// 4. Flush rewrite rules properly
flush_rewrite_rules(true);
echo "4. Rewrite rules flushed (hard).\\n";
"""

with open("nuclear_fix.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("nuclear_fix.php", 'rb') as f:
        ftp.storbinary('STOR nuclear_fix.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/nuclear_fix.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
