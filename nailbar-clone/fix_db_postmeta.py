import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;

$postmeta = $wpdb->get_results("SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE meta_value LIKE '%a:%' OR meta_value LIKE '%O:%'");

$fixed_count = 0;

foreach ($postmeta as $meta) {
    $val = $meta->meta_value;
    if (is_serialized($val)) {
        $test = @unserialize($val);
        if ($test === false && $val !== 'b:0;') {
            $fixed_val = preg_replace_callback(
                '/s:([0-9]+):"(.*?)";/s',
                function($matches) {
                    return 's:' . strlen($matches[2]) . ':"' . $matches[2] . '";';
                },
                $val
            );
            
            $test2 = @unserialize($fixed_val);
            if ($test2 !== false || $fixed_val === 'b:0;') {
                $wpdb->update(
                    $wpdb->postmeta,
                    array('meta_value' => $fixed_val),
                    array('meta_id' => $meta->meta_id)
                );
                $fixed_count++;
            }
        }
    }
}

echo "Total postmeta fixed: $fixed_count\\n";

if ( class_exists( '\\Elementor\\Plugin' ) ) {
    \\Elementor\\Plugin::$instance->files_manager->clear_cache();
    echo "Elementor cache cleared.\\n";
}
"""

with open("fix_db_postmeta.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_db_postmeta.php", 'rb') as f:
        ftp.storbinary('STOR fix_db_postmeta.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_db_postmeta.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
