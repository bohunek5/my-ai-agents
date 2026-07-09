import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');

$from1 = 'http://serwer194525.lh.pl/zeglarstwomazury.pl';
$to = 'https://zeglarstwomazury.pl';

if ( class_exists( '\\Elementor\\Utils' ) && method_exists( '\\Elementor\\Utils', 'replace_urls' ) ) {
    $result1 = \\Elementor\\Utils::replace_urls( $from1, $to );
    echo "Elementor Replace URLs: " . $result1 . "\\n";
} else {
    echo "Elementor\\Utils::replace_urls not found.\\n";
}

// Clear cache
if ( class_exists( '\\Elementor\\Plugin' ) ) {
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
    echo "Cache cleared.\\n";
}
"""

with open("elementor_replace.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("elementor_replace.php", 'rb') as f:
        ftp.storbinary('STOR elementor_replace.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/elementor_replace.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
