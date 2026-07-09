<?php
require_once('wp-load.php');
$data = get_post_meta(168, '_elementor_data', true);
if (empty($data)) {
    echo "No _elementor_data!\n";
} else {
    $json = json_decode($data);
    if (json_last_error() === JSON_ERROR_NONE) {
        echo "Valid JSON.\n";
        echo "JSON length: " . strlen($data) . "\n";
    } else {
        echo "Invalid JSON! " . json_last_error_msg() . "\n";
        echo "Raw data: " . substr($data, 0, 100) . "...\n";
    }
}
