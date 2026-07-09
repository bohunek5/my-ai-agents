<?php
require_once('wp-load.php');
global $wpdb;
$result = $wpdb->get_results("SELECT post_content FROM {$wpdb->posts} WHERE post_content LIKE '%http%' LIMIT 5");
foreach ($result as $row) {
    preg_match_all('/https?:\/\/[^"\'\s]+/', $row->post_content, $matches);
    if (!empty($matches[0])) {
        print_r(array_slice(array_unique($matches[0]), 0, 5));
    }
}
