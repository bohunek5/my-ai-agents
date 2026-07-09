<?php
error_reporting(0);
require_once __DIR__ . '/wp-load.php';

echo "ABSPATH: " . ABSPATH . "\n";
echo "WP_CONTENT_DIR: " . WP_CONTENT_DIR . "\n";
echo "home_url: " . home_url() . "\n";
echo "site_url: " . site_url() . "\n";

// Check what URL REQUEST maps to
global $wp;
echo "\nRequest: " . $wp->request . "\n";
echo "Matched rule: " . (property_exists($wp, 'matched_rule') ? $wp->matched_rule : 'n/a') . "\n";
echo "Matched query: " . (property_exists($wp, 'matched_query') ? $wp->matched_query : 'n/a') . "\n";
