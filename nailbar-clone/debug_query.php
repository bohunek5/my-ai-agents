<?php
require_once('wp-load.php');
global $wp, $wp_query;
$wp->parse_request();
$wp->query_posts();

echo "Query vars:\n";
print_r($wp->query_vars);
echo "\nQueried object: " . get_class($wp_query->queried_object) . "\n";
echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\n";
echo "page_on_front: " . get_option('page_on_front') . "\n";
echo "show_on_front: " . get_option('show_on_front') . "\n";
