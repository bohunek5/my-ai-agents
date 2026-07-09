import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;

// Check siteurl and home options
$siteurl = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'siteurl'");
$home = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'home'");
$show_on_front = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'show_on_front'");
$page_on_front = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'page_on_front'");

echo "siteurl: $siteurl\\n";
echo "home: $home\\n";
echo "show_on_front: $show_on_front\\n";
echo "page_on_front: $page_on_front\\n";
"""

with open("check_wp_options.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_wp_options.php", 'rb') as f:
        ftp.storbinary('STOR check_wp_options.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_wp_options.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
