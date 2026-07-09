<?php
require_once('wp-load.php');
global $wpdb;

// 1. Delete the cached rewrite_rules so WordPress rebuilds them fresh
delete_option('rewrite_rules');
echo "1. rewrite_rules deleted.\n";

// 2. Force-delete object cache for options
wp_cache_flush();
echo "2. Object cache flushed.\n";

// 3. Confirm the front page options are set correctly
$wpdb->query("UPDATE {$wpdb->options} SET option_value = 'page' WHERE option_name = 'show_on_front'");
$wpdb->query("UPDATE {$wpdb->options} SET option_value = '168' WHERE option_name = 'page_on_front'");
echo "3. Front page options updated.\n";

// 4. Flush rewrite rules properly
flush_rewrite_rules(true);
echo "4. Rewrite rules flushed (hard).\n";
