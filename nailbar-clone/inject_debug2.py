import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

# Inject debug right before wp() and after wp()
debug_header = """<?php
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
	
	// DEBUG injection
	if ( defined('WP_USE_THEMES') && WP_USE_THEMES ) {
	    ob_start();
	}

	// Load the theme template.
	require_once ABSPATH . WPINC . '/template-loader.php';
	
	if ( defined('WP_USE_THEMES') && WP_USE_THEMES ) {
	    $html = ob_get_clean();
	    // Inject debug before </head>
	    global $wp_query;
	    $debug = "<!-- WP_DEBUG: REQUEST_URI=" . $_SERVER['REQUEST_URI'] . " is_front_page=" . (is_front_page() ? '1' : '0') . " is_date=" . (is_date() ? '1' : '0') . " page_on_front=" . get_option('page_on_front') . " queried_object_id=" . get_queried_object_id() . " -->";
	    $html = str_replace('</head>', $debug . '</head>', $html);
	    echo $html;
	}

}
"""

with open("wp-blog-header-debug2.php", "w") as f:
    f.write(debug_header)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    # Upload as the actual wp-blog-header.php (temporarily)
    with open("wp-blog-header-debug2.php", 'rb') as f:
        ftp.storbinary('STOR wp-blog-header.php', f)
    
    ftp.quit()
    
    print("Debug wp-blog-header.php uploaded!")
    
    # Now fetch the actual homepage 
    req = urllib.request.Request("https://zeglarstwomazury.pl/", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    html = response.read().decode('utf-8', errors='ignore')
    
    # Extract debug comments
    import re
    comments = re.findall(r'<!-- WP_DEBUG:.*?-->', html)
    for c in comments:
        print(c)
    
    if not comments:
        print("No debug comments found. First 500 chars:")
        print(html[:500])
        
except Exception as e:
    print("Error:", e)
