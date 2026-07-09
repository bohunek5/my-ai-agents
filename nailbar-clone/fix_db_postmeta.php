<?php
require_once('wp-load.php');
global $wpdb;

$postmeta = $wpdb->get_results("SELECT meta_id, meta_value FROM {$wpdb->postmeta} WHERE meta_value LIKE '%a:%' OR meta_value LIKE '%O:%'");

$fixed_count = 0;

foreach ($postmeta as $meta) {
    $val = $meta->meta_value;
    if (is_serialized($val)) {
        $test = @unserialize($val);
        if ($test === false && $val !== 'b:0;') {
            $fixed_val = preg_replace_callback(
                '/s:([0-9]+):"(.*?)";/s',
                function($matches) {
                    return 's:' . strlen($matches[2]) . ':"' . $matches[2] . '";';
                },
                $val
            );
            
            $test2 = @unserialize($fixed_val);
            if ($test2 !== false || $fixed_val === 'b:0;') {
                $wpdb->update(
                    $wpdb->postmeta,
                    array('meta_value' => $fixed_val),
                    array('meta_id' => $meta->meta_id)
                );
                $fixed_count++;
            }
        }
    }
}

echo "Total postmeta fixed: $fixed_count\n";

if ( class_exists( '\Elementor\Plugin' ) ) {
    \Elementor\Plugin::$instance->files_manager->clear_cache();
    echo "Elementor cache cleared.\n";
}
