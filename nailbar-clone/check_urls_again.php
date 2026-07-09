<?php
require_once('wp-load.php');
global $wpdb;
$result = $wpdb->get_results("SELECT post_content FROM {$wpdb->posts} WHERE post_content LIKE '%nailbar.com.pl%' LIMIT 5");
if (empty($result)) {
    echo "No more nailbar.com.pl in post_content!\n";
} else {
    echo "Still found in post_content.\n";
}
