<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$secret = get_option('ai1wm_secret_key');
if (!$secret) {
    $secret = wp_generate_password(12, false);
    update_option('ai1wm_secret_key', $secret);
}
echo $secret;
