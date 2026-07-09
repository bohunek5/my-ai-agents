<?php
// Direct debug - check what happens when we call wp() with REQUEST_URI='/'
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/wp-content/mytest-errors.log');

$_SERVER['REQUEST_URI'] = '/';

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

wp();

global $wp, $wp_query;
echo "Request: '" . $wp->request . "'\n";
echo "is_front_page: " . (is_front_page() ? 'YES' : 'NO') . "\n";
echo "is_date: " . (is_date() ? 'YES' : 'NO') . "\n";
echo "Matched rule: " . (isset($wp->matched_rule) ? $wp->matched_rule : 'none') . "\n";
echo "Matched query: " . (isset($wp->matched_query) ? $wp->matched_query : 'none') . "\n";
