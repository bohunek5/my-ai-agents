<?php
require_once('wp-load.php');
echo "show_on_front: " . var_export(get_option('show_on_front'), true) . "<br>";
echo "page_on_front: " . var_export(get_option('page_on_front'), true) . "<br>";
echo "page_for_posts: " . var_export(get_option('page_for_posts'), true) . "<br>";
echo "siteurl: " . var_export(get_option('siteurl'), true) . "<br>";
echo "home: " . var_export(get_option('home'), true) . "<br>";
echo "active_plugins: " . var_export(get_option('active_plugins'), true) . "<br>";
echo "rewrite_rules is empty: " . (empty(get_option('rewrite_rules')) ? 'Yes' : 'No') . "<br>";
echo "permalink_structure: " . var_export(get_option('permalink_structure'), true) . "<br>";
?>
