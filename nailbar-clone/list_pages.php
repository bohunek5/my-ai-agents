<?php
require_once('wp-load.php');
$pages = get_pages();
foreach ($pages as $page) {
    echo $page->ID . ": " . $page->post_title . "\n";
}
