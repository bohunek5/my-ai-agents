<?php
error_reporting(0);
define('WP_USE_THEMES', true);
require_once __DIR__ . '/wp-load.php';

// Hook VERY early to check what happens
add_action('pre_get_posts', function($query) {
    if ($query->is_main_query()) {
        echo "===PRE_GET_POSTS===\n";
        echo "is_main_query: YES\n";
        echo "is_front_page: " . ($query->is_front_page() ? 'YES' : 'NO') . "\n";
        echo "is_home: " . ($query->is_home() ? 'YES' : 'NO') . "\n";
        echo "query_vars page_id: " . $query->get('page_id') . "\n";
    }
}, 1);

wp();

echo "\n===AFTER wp()===\n";
echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\n";
echo "queried_object_id: " . get_queried_object_id() . "\n";
