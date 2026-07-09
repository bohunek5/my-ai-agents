<?php
error_reporting(0);
$_SERVER['REQUEST_URI'] = '/';

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

global $wp_rewrite;

// Check what rewrite rules look like
$rules = $wp_rewrite->wp_rewrite_rules();
echo "Generated rules on the fly: " . count($rules) . "\n";

// DB rules
$db_rules = get_option('rewrite_rules');
echo "DB rules: " . count((array)$db_rules) . "\n";

// Now manually test if '' matches anything
echo "\nTesting REQUEST='/' (stripped to ''):\n";
$request = '/';
$pathinfo = $request;
// WordPress strips leading slash
$pathinfo = ltrim($pathinfo, '/');
echo "Stripped request: '$pathinfo'\n";

// Check each rule
if (!empty($db_rules)) {
    foreach ((array)$db_rules as $regex => $query) {
        if (preg_match("#^$regex#", $pathinfo, $matches)) {
            echo "MATCHED: '$regex' => '$query'\n";
            break;
        }
    }
} else {
    echo "No DB rules to match against!\n";
}
