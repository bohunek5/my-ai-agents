<?php
error_reporting(0);
require_once('wp-load.php');

// Check active plugins
$plugins = get_option('active_plugins');
echo "Active plugins:\n";
foreach ($plugins as $p) {
    echo "  - $p\n";
}

echo "\nActive theme: " . get_option('stylesheet') . "\n";
echo "Template: " . get_option('template') . "\n";
