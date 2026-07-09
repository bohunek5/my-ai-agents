<?php
require_once('wp-load.php');
global $wp_rewrite;

// Force rebuild rewrite rules
$wp_rewrite->flush_rules(true);
echo "Rewrite rules flushed.\n";

$rules = get_option('rewrite_rules');
if (!$rules) {
    echo "Still no rules! Checking why...\n";
    // Manually generate the rules
    $rules = $wp_rewrite->wp_rewrite_rules();
    echo "Generated rules count: " . count($rules) . "\n";
    if ($rules) {
        update_option('rewrite_rules', $rules);
        echo "Saved rules to database.\n";
    }
} else {
    echo "Rules in DB: " . count($rules) . "\n";
    // Show the front page rule
    foreach ($rules as $regex => $query) {
        if (strpos($query, 'page_id') !== false || $regex === '$') {
            echo $regex . " => " . $query . "\n";
        }
    }
}
