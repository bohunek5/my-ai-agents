import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
$data = get_post_meta(168, '_elementor_data', true);
if (empty($data)) {
    echo "No _elementor_data!\\n";
} else {
    $json = json_decode($data);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo "Valid JSON.\\n";
        echo "JSON length: " . strlen($data) . "\\n";
    } else {
        echo "Invalid JSON! " . json_last_error_msg() . "\\n";
        echo "Raw data: " . substr($data, 0, 100) . "...\\n";
    }
}
"""

with open("check_page_168_data.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("check_page_168_data.php", 'rb') as f:
        ftp.storbinary('STOR check_page_168_data.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/check_page_168_data.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
