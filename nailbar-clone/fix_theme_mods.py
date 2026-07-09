import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
global $wpdb;

$options = $wpdb->get_results("SELECT option_name, option_value FROM {$wpdb->options} WHERE option_name LIKE 'theme_mods_%'");

$fixed_count = 0;

foreach ($options as $opt) {
    $val = $opt->option_value;
    if (is_serialized($val)) {
        $test = @unserialize($val);
        if ($test === false) {
            // Fix string lengths
            $fixed_val = preg_replace_callback(
                '/s:([0-9]+):"(.*?)";/s',
                function($matches) {
                    return 's:' . strlen($matches[2]) . ':"' . $matches[2] . '";';
                },
                $val
            );
            
            $test2 = @unserialize($fixed_val);
            if ($test2 !== false) {
                $wpdb->update(
                    $wpdb->options,
                    array('option_value' => $fixed_val),
                    array('option_name' => $opt->option_name)
                );
                $fixed_count++;
                echo "Fixed theme_mods: " . $opt->option_name . "\\n";
            } else {
                echo "Failed to fix theme_mods: " . $opt->option_name . "\\n";
            }
        } else {
            echo "theme_mods " . $opt->option_name . " is OK.\\n";
        }
    }
}

echo "Total theme_mods fixed: $fixed_count\\n";
"""

with open("fix_theme_mods.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_theme_mods.php", 'rb') as f:
        ftp.storbinary('STOR fix_theme_mods.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_theme_mods.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
