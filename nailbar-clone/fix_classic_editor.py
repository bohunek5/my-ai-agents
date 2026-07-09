import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
require_once('wp-load.php');
global $wpdb;

// classic-editor might be overriding the editor for ALL pages including front page
// Disable classic-editor plugin
$active_plugins = get_option('active_plugins');
$key = array_search('classic-editor/classic-editor.php', $active_plugins);
if ($key !== false) {
    unset($active_plugins[$key]);
    $active_plugins = array_values($active_plugins);
    update_option('active_plugins', $active_plugins);
    echo "Classic Editor deactivated.\\n";
} else {
    echo "Classic Editor was not active.\\n";
}

// Also check if ocean-portfolio has a conflict
echo "Done.\\n";
"""

with open("fix_classic_editor.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_classic_editor.php", 'rb') as f:
        ftp.storbinary('STOR fix_classic_editor.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_classic_editor.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
