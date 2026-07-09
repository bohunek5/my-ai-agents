<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

// Disable nextend-smart-slider3-pro plugin
$active_plugins = get_option('active_plugins');
$key = array_search('nextend-smart-slider3-pro/nextend-smart-slider3-pro.php', $active_plugins);
if ($key !== false) {
    unset($active_plugins[$key]);
    $active_plugins = array_values($active_plugins);
    update_option('active_plugins', $active_plugins);
    echo "Smart Slider 3 Pro DISABLED!\n";
} else {
    echo "Not found in active plugins. Checking...\n";
    foreach ($active_plugins as $p) {
        if (strpos($p, 'slider') !== false || strpos($p, 'nextend') !== false) {
            echo "Found: $p\n";
        }
    }
}
echo "Done.\n";
