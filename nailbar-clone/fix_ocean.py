import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
// Update the ocean-portfolio plugin or just disable the buggy function for a moment if it's breaking Elementor
// Actually let's just make sure the page template is correctly assigned
update_post_meta(168, '_wp_page_template', 'elementor_header_footer');
echo "Page template updated.\\n";

// Let's force elementor data to be un-escaped if it was double serialized
$elementor_data = get_post_meta(168, '_elementor_data', true);
if (is_string($elementor_data)) {
    // Looks fine
    echo "Elementor data is present.\\n";
} else {
    echo "Elementor data missing or corrupted.\\n";
}
"""

with open("fix_ocean.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_ocean.php", 'rb') as f:
        ftp.storbinary('STOR fix_ocean.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_ocean.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
