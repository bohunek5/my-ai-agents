<?php
error_reporting(0);
require_once('wp-load.php');
global $wpdb;

// classic-editor might be overriding the editor for ALL pages including front page
// Disable classic-editor plugin
$active_plugins = get_option('active_plugins');
$key = array_search('classic-editor/classic-editor.php', $active_plugins);
if ($key !== false) {
    unset($active_plugins[$key]);
    $active_plugins = array_values($active_plugins);
    update_option('active_plugins', $active_plugins);
    echo "Classic Editor deactivated.\n";
} else {
    echo "Classic Editor was not active.\n";
}

// Also check if ocean-portfolio has a conflict
echo "Done.\n";
