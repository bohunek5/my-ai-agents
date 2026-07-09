<?php
require_once('wp-load.php');
$new_url = 'https://zeglarstwomazury.pl';
update_option('siteurl', $new_url);
update_option('home', $new_url);

// Update Elementor CSS
if ( class_exists( '\Elementor\Plugin' ) ) {
    \Elementor\Plugin::$instance->files_manager->clear_cache();
}

echo "Updated URLs to: " . $new_url;
