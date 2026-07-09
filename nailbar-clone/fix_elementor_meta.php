<?php
require_once('wp-load.php');
$edit_mode = get_post_meta(168, '_elementor_edit_mode', true);
echo "Edit mode: " . $edit_mode . "\n";

if ($edit_mode !== 'builder') {
    update_post_meta(168, '_elementor_edit_mode', 'builder');
    echo "Set _elementor_edit_mode to 'builder'.\n";
}

// Let's also check if Elementor plugin is active
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if ( is_plugin_active( 'elementor/elementor.php' ) ) {
    echo "Elementor is active.\n";
} else {
    echo "Elementor is NOT active!\n";
    activate_plugin( 'elementor/elementor.php' );
    echo "Activated Elementor.\n";
}
