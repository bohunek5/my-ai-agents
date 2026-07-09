<?php
// Before wp-load, let's just check the REQUEST_URI
error_reporting(E_ALL);
ini_set('display_errors', 1);

$_SERVER['REQUEST_URI'] = '/';
$_SERVER['HTTP_HOST'] = 'zeglarstwomazury.pl';

require_once('wp-load.php');

global $wp, $wp_query;

// Manually setup the request
$wp->parse_request('');
$wp->query_posts();
$wp->handle_404();
$wp->send_headers();

echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\n";
echo "show_on_front: " . get_option('show_on_front') . "\n";
echo "page_on_front: " . get_option('page_on_front') . "\n";
echo "\nQuery vars: ";
print_r($wp_query->query_vars);
