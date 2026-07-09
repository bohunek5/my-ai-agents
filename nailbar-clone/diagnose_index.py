import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

# This file simulates exactly what index.php does + debug output
code = """<?php
error_reporting(E_ALL & ~E_NOTICE);
define('WP_USE_THEMES', true);
require __DIR__ . '/wp-blog-header.php';
"""

# But we need to intercept wp-blog-header.php to trace it
# So instead, let's modify wp-blog-header.php temporarily
blog_header = """<?php
/**
 * Loads the WordPress environment and template.
 *
 * @package WordPress
 */

if ( ! isset( $wp_did_header ) ) {

	$wp_did_header = true;

	// Load the WordPress library.
	require_once __DIR__ . '/wp-load.php';

	// Set up the WordPress query.
	wp();
	
    // DEBUG: Print before template
    echo "<!-- REQUEST_URI=" . $_SERVER['REQUEST_URI'] . " -->";
    global $wp_query;
    echo "<!-- is_front_page=" . (is_front_page() ? '1' : '0') . " -->";
    echo "<!-- is_date=" . (is_date() ? '1' : '0') . " -->";
    echo "<!-- page_on_front=" . get_option('page_on_front') . " -->";
    echo "<!-- show_on_front=" . get_option('show_on_front') . " -->";
    echo "<!-- queried_object_id=" . get_queried_object_id() . " -->";

	// Load the active theme's functions.php file.
	require_once ABSPATH . WPINC . '/template-loader.php';

}
"""

with open("wp-blog-header-debug.php", "w") as f:
    f.write(blog_header)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    # Backup original
    try:
        orig = []
        ftp.retrlines("RETR wp-blog-header.php", orig.append)
        with open("wp-blog-header-orig.php", "w") as f:
            f.write("\n".join(orig))
    except:
        pass
    
    # Upload debug version
    with open("wp-blog-header-debug.php", 'rb') as f:
        ftp.storbinary('STOR wp-blog-header-debug.php', f)
    
    ftp.quit()
    
    print("Debug file uploaded. Fetching homepage...")
    req = urllib.request.Request("https://zeglarstwomazury.pl/wp-blog-header-debug.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8', errors='ignore')
    
    # Extract debug comments
    import re
    comments = re.findall(r'<!--.*?-->', html[:2000])
    for c in comments:
        print(c)
        
except Exception as e:
    print("Error:", e)
