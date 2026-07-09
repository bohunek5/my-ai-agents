<?php
set_time_limit(0);
ignore_user_abort(true);
ini_set('memory_limit', '512M');

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration/all-in-one-wp-migration.php';
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration-unlimited-extension/all-in-one-wp-migration-unlimited-extension.php';

$archive = 'nailbar.com.pl-20200505-062543-uadrv7.wpress';
$storage_id = uniqid();

// Build proper params with 'storage' key
$params = array(
    'archive'             => $archive,
    'storage'             => $storage_id,
    'priority'            => 10,
    'secret_key'          => get_option('ai1wm_secret_key'),
    'ai1wm_manual_restore' => true,  // Use backup path, not storage path
);

echo "Import params ready. Storage: $storage_id\n";
echo "Backup file: " . ai1wm_backup_path($params) . "\n";
echo "Exists: " . (file_exists(ai1wm_backup_path($params)) ? 'YES' : 'NO') . "\n";
flush();

// Steps to run
$steps = array(
    'Ai1wm_Import_Validate',
    'Ai1wm_Import_Blogs',
    'Ai1wm_Import_Confirm',
    'Ai1wm_Import_Enumerate',
    'Ai1wm_Import_Content',
    'Ai1wm_Import_Mu_Plugins',
    'Ai1wm_Import_Database',
    'Ai1wm_Import_Plugins',
    'Ai1wm_Import_Done',
    'Ai1wm_Import_Clean',
);

foreach ($steps as $step_class) {
    echo "\nStep: $step_class ";
    flush();
    try {
        $params = call_user_func(array($step_class, 'execute'), $params);
        echo "OK";
        flush();
        // Check for retry/continue flag
        if (!empty($params['completed'])) {
            echo " (needs more iterations)";
        }
    } catch (Ai1wm_Import_Retry_Exception $e) {
        echo "RETRY needed: " . $e->getMessage();
    } catch (Exception $e) {
        echo "ERROR: " . $e->getMessage();
        break;
    }
}

echo "\n\nDone!\n";
