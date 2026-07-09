<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$db_rules = get_option('rewrite_rules');
$pathinfo = '';  // empty string = request for '/'

echo "Testing empty string against all rules:\n";
$matched = false;
foreach ((array)$db_rules as $regex => $query) {
    if (preg_match("#^$regex#", $pathinfo, $matches)) {
        echo "MATCHED: '$regex' => '$query'\n";
        $matched = true;
        break;
    }
}
if (!$matched) {
    echo "No match found!\n";
    // Show first 5 rules
    $i = 0;
    foreach ((array)$db_rules as $regex => $query) {
        echo "  Rule: '" . substr($regex, 0, 60) . "' => '" . substr($query, 0, 60) . "'\n";
        if (++$i >= 5) break;
    }
}
