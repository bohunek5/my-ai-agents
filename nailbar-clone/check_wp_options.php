<?php
require_once('wp-load.php');
global $wpdb;

// Check siteurl and home options
$siteurl = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'siteurl'");
$home = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'home'");
$show_on_front = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'show_on_front'");
$page_on_front = $wpdb->get_var("SELECT option_value FROM {$wpdb->options} WHERE option_name = 'page_on_front'");

echo "siteurl: $siteurl\n";
echo "home: $home\n";
echo "show_on_front: $show_on_front\n";
echo "page_on_front: $page_on_front\n";
