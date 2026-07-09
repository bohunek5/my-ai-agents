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

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

// Aktywuj AI1WM + unlimited extension
$r1 = activate_plugin('all-in-one-wp-migration/all-in-one-wp-migration.php');
$r2 = activate_plugin('all-in-one-wp-migration-unlimited-extension/all-in-one-wp-migration-unlimited-extension.php');

echo "AI1WM activate: " . (is_wp_error($r1) ? $r1->get_error_message() : 'OK') . "\\n";
echo "Unlimited ext: " . (is_wp_error($r2) ? $r2->get_error_message() : 'OK') . "\\n";

// Verify backup file exists
$wpress = WP_CONTENT_DIR . '/ai1wm-backups/nailbar.com.pl-20200505-062543-uadrv7.wpress';
echo "Backup file: " . (file_exists($wpress) ? 'EXISTS (' . round(filesize($wpress)/1024/1024) . ' MB)' : 'MISSING') . "\\n";

// Check active plugins
$active = get_option('active_plugins');
foreach ($active as $p) {
    if (strpos($p, 'ai1wm') !== false || strpos($p, 'migration') !== false) {
        echo "Active: $p\\n";
    }
}
"""

with open("activate_ai1wm.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("activate_ai1wm.php", 'rb') as f:
        ftp.storbinary('STOR activate_ai1wm.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/activate_ai1wm.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
