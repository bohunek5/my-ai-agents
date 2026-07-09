import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

# Use AI1WM's internal import mechanism directly
code = r"""<?php
set_time_limit(0);
ignore_user_abort(true);
ini_set('memory_limit', '512M');

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$wpress = WP_CONTENT_DIR . '/ai1wm-backups/nailbar.com.pl-20200505-062543-uadrv7.wpress';

if (!file_exists($wpress)) {
    die("Backup not found!\n");
}

echo "Backup found: " . round(filesize($wpress)/1024/1024) . " MB\n";
flush();

// Load AI1WM
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration/all-in-one-wp-migration.php';

// Check classes
echo "Ai1wm_Main exists: " . (class_exists('Ai1wm_Main') ? 'YES' : 'NO') . "\n";

// Use AI1WM's storage and import classes
if (class_exists('Ai1wm_Main')) {
    // Set up import params  
    update_option('ai1wm_import', array(
        'archive' => basename($wpress),
        'status'  => array(),
    ));
    
    echo "Import queued! Check WP Admin > All-in-One WP Migration > Import\n";
    echo "Or visit: https://zeglarstwomazury.pl/wp-admin/admin.php?page=ai1wm_import\n";
} else {
    echo "Could not load AI1WM classes\n";
}
"""

with open("direct_import.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("direct_import.php", 'rb') as f:
        ftp.storbinary('STOR direct_import.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/direct_import.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
