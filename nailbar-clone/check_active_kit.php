<?php
require_once('wp-load.php');
$kit_id = get_option('elementor_active_kit');
echo "Active kit ID: " . $kit_id . "\n";

if ($kit_id) {
    $post = get_post($kit_id);
    if ($post) {
        echo "Kit status: " . $post->post_status . "\n";
        echo "Kit type: " . $post->post_type . "\n";
    } else {
        echo "Kit post not found!\n";
    }
}
