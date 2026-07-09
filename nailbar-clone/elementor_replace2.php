<?php
require_once('wp-load.php');

$replacements = [
    'https://nailbar.com.pl' => 'https://zeglarstwomazury.pl',
    'http://nailbar.com.pl' => 'https://zeglarstwomazury.pl',
    'http://serwer194525.lh.pl/zeglarstwomazury.pl' => 'https://zeglarstwomazury.pl',
    'https://serwer194525.lh.pl/zeglarstwomazury.pl' => 'https://zeglarstwomazury.pl'
];

if ( class_exists( '\Elementor\Utils' ) && method_exists( '\Elementor\Utils', 'replace_urls' ) ) {
    foreach ($replacements as $from => $to) {
        $result = \Elementor\Utils::replace_urls( $from, $to );
        echo "Replaced $from -> $to: $result\n";
    }
} else {
    echo "Elementor\Utils::replace_urls not found.\n";
}

// Clear cache
if ( class_exists( '\Elementor\Plugin' ) ) {
    \Elementor\Plugin::$instance->files_manager->clear_cache();
    echo "Cache cleared.\n";
}
