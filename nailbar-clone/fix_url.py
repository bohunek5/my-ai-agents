import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$new_url = 'https://zeglarstwomazury.pl';
update_option('siteurl', $new_url);
update_option('home', $new_url);

// Update Elementor CSS
if ( class_exists( '\\Elementor\\Plugin' ) ) {
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
}

echo "Updated URLs to: " . $new_url;
"""

with open("fix_url.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_url.php", 'rb') as f:
        ftp.storbinary('STOR fix_url.php', f)
    ftp.quit()
    
    # We must call it using the NEW domain because the old one might not route here directly, 
    # but let's try the direct server URL first in case DNS is cached or something
    req = urllib.request.Request("http://serwer194525.lh.pl/zeglarstwomazury.pl/fix_url.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
