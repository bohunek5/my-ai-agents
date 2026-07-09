import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$edit_mode = get_post_meta(168, '_elementor_edit_mode', true);
echo "Edit mode: " . $edit_mode . "\\n";

if ($edit_mode !== 'builder') {
    update_post_meta(168, '_elementor_edit_mode', 'builder');
    echo "Set _elementor_edit_mode to 'builder'.\\n";
}

// Let's also check if Elementor plugin is active
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if ( is_plugin_active( 'elementor/elementor.php' ) ) {
    echo "Elementor is active.\\n";
} else {
    echo "Elementor is NOT active!\\n";
    activate_plugin( 'elementor/elementor.php' );
    echo "Activated Elementor.\\n";
}
"""

with open("fix_elementor_meta.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_elementor_meta.php", 'rb') as f:
        ftp.storbinary('STOR fix_elementor_meta.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_elementor_meta.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
