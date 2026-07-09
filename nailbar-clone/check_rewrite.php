<?php
require_once('wp-load.php');
global $wpdb;

$rules = get_option('rewrite_rules');
if (!$rules) {
    echo "No rewrite_rules in database!\n";
} else {
    // Show first few rules
    $i = 0;
    foreach ($rules as $regex => $query) {
        echo $regex . " => " . $query . "\n";
        if (++$i > 20) {
            echo "... (and more)\n";
            break;
        }
    }
}
