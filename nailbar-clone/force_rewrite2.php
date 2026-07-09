<?php
error_reporting(0);
require_once('wp-load.php');

global $wp_rewrite;
$rules = $wp_rewrite->wp_rewrite_rules();
echo "Generated rules count: " . count((array)$rules) . "\n";

if (!empty($rules)) {
    update_option('rewrite_rules', $rules);
    echo "Saved.\n";
    // Check if front page rule exists
    $front = array_filter($rules, function($q) { return strpos($q, 'page_id') !== false; });
    echo "Front page rules: " . count($front) . "\n";
} else {
    echo "No rules generated! Trying alternative...\n";
    $wp_rewrite->set_permalink_structure('/%postname%/');
    $wp_rewrite->flush_rules();
    $rules2 = get_option('rewrite_rules');
    echo "Rules after set_permalink: " . count((array)$rules2) . "\n";
}
