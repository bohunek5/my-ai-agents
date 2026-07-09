<?php
error_reporting(0);
require_once('wp-load.php');
global $wpdb;
$permalink = get_option('permalink_structure');
echo "Permalink structure: '" . $permalink . "'\n";

$rules = get_option('rewrite_rules');
echo "Rules count: " . count((array)$rules) . "\n";

// Check for front page entries
if (!empty($rules)) {
    foreach ((array)$rules as $regex => $query) {
        if ($regex === '$' || strpos($query, 'page_id') !== false) {
            echo "  Rule: '$regex' => '$query'\n";
        }
    }
}
