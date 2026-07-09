<?php
require_once('wp-load.php');
$post = get_post(168);
if ($post) {
    echo "ID: " . $post->ID . "\n";
    echo "Title: " . $post->post_title . "\n";
    echo "Status: " . $post->post_status . "\n";
    echo "Type: " . $post->post_type . "\n";
} else {
    echo "Page 168 not found!\n";
}
