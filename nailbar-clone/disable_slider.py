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

// Disable nextend-smart-slider3-pro plugin
$active_plugins = get_option('active_plugins');
$key = array_search('nextend-smart-slider3-pro/nextend-smart-slider3-pro.php', $active_plugins);
if ($key !== false) {
    unset($active_plugins[$key]);
    $active_plugins = array_values($active_plugins);
    update_option('active_plugins', $active_plugins);
    echo "Smart Slider 3 Pro DISABLED!\\n";
} else {
    echo "Not found in active plugins. Checking...\\n";
    foreach ($active_plugins as $p) {
        if (strpos($p, 'slider') !== false || strpos($p, 'nextend') !== false) {
            echo "Found: $p\\n";
        }
    }
}
echo "Done.\\n";
"""

with open("disable_slider.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("disable_slider.php", 'rb') as f:
        ftp.storbinary('STOR disable_slider.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/disable_slider.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
