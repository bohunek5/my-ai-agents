<?php
require_once('wp-load.php');

$from1 = 'http://serwer194525.lh.pl/zeglarstwomazury.pl';
$to = 'https://zeglarstwomazury.pl';

if ( class_exists( '\Elementor\Utils' ) && method_exists( '\Elementor\Utils', 'replace_urls' ) ) {
    $result1 = \Elementor\Utils::replace_urls( $from1, $to );
    echo "Elementor Replace URLs: " . $result1 . "\n";
} else {
    echo "Elementor\Utils::replace_urls not found.\n";
}

// Clear cache
if ( class_exists( '\Elementor\Plugin' ) ) {
    \Elementor\Plugin::$instance->files_manager->clear_cache();
    echo "Cache cleared.\n";
}
