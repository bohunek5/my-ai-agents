import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');

$replacements = [
    'https://nailbar.com.pl' => 'https://zeglarstwomazury.pl',
    'http://nailbar.com.pl' => 'https://zeglarstwomazury.pl',
    'http://serwer194525.lh.pl/zeglarstwomazury.pl' => 'https://zeglarstwomazury.pl',
    'https://serwer194525.lh.pl/zeglarstwomazury.pl' => 'https://zeglarstwomazury.pl'
];

if ( class_exists( '\\Elementor\\Utils' ) && method_exists( '\\Elementor\\Utils', 'replace_urls' ) ) {
    foreach ($replacements as $from => $to) {
        $result = \\Elementor\\Utils::replace_urls( $from, $to );
        echo "Replaced $from -> $to: $result\\n";
    }
} else {
    echo "Elementor\\Utils::replace_urls not found.\\n";
}

// Clear cache
if ( class_exists( '\\Elementor\\Plugin' ) ) {
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
    echo "Cache cleared.\\n";
}
"""

with open("elementor_replace2.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("elementor_replace2.php", 'rb') as f:
        ftp.storbinary('STOR elementor_replace2.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/elementor_replace2.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
