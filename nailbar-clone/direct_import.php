<?php
set_time_limit(0);
ignore_user_abort(true);
ini_set('memory_limit', '512M');

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

$wpress = WP_CONTENT_DIR . '/ai1wm-backups/nailbar.com.pl-20200505-062543-uadrv7.wpress';

if (!file_exists($wpress)) {
    die("Backup not found!\n");
}

echo "Backup found: " . round(filesize($wpress)/1024/1024) . " MB\n";
flush();

// Load AI1WM
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration/all-in-one-wp-migration.php';

// Check classes
echo "Ai1wm_Main exists: " . (class_exists('Ai1wm_Main') ? 'YES' : 'NO') . "\n";

// Use AI1WM's storage and import classes
if (class_exists('Ai1wm_Main')) {
    // Set up import params  
    update_option('ai1wm_import', array(
        'archive' => basename($wpress),
        'status'  => array(),
    ));
    
    echo "Import queued! Check WP Admin > All-in-One WP Migration > Import\n";
    echo "Or visit: https://zeglarstwomazury.pl/wp-admin/admin.php?page=ai1wm_import\n";
} else {
    echo "Could not load AI1WM classes\n";
}
