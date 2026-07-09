import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$kit_id = get_option('elementor_active_kit');
echo "Active kit ID: " . $kit_id . "\\n";

if ($kit_id) {
    $post = get_post($kit_id);
    if ($post) {
        echo "Kit status: " . $post->post_status . "\\n";
        echo "Kit type: " . $post->post_type . "\\n";
    } else {
        echo "Kit post not found!\\n";
    }
}
"""

with open("check_active_kit.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_active_kit.php", 'rb') as f:
        ftp.storbinary('STOR check_active_kit.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_active_kit.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
