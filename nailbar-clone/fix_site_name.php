<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$old_name = get_option('blogname');
$old_desc = get_option('blogdescription');
echo "Old name: $old_name\n";
echo "Old desc: $old_desc\n";

update_option('blogdescription', 'Salon paznokci i urody');
echo "Description updated!\n";
