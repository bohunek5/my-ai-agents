import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
error_reporting(0);
require_once('wp-load.php');

// Check active plugins
$plugins = get_option('active_plugins');
echo "Active plugins:\\n";
foreach ($plugins as $p) {
    echo "  - $p\\n";
}

echo "\\nActive theme: " . get_option('stylesheet') . "\\n";
echo "Template: " . get_option('template') . "\\n";
"""

with open("check_plugins_blocking.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_plugins_blocking.php", 'rb') as f:
        ftp.storbinary('STOR check_plugins_blocking.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_plugins_blocking.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8', errors='ignore'))
except Exception as e:
    print("Error:", e)
