<?php
set_time_limit(0);
ignore_user_abort(true);
ini_set('memory_limit', '512M');

define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration/all-in-one-wp-migration.php';
require_once WP_CONTENT_DIR . '/plugins/all-in-one-wp-migration-unlimited-extension/all-in-one-wp-migration-unlimited-extension.php';

$archive = 'nailbar.com.pl-20200505-062543-uadrv7.wpress';

// Simulate what AI1WM's import controller does
// It uses the 'ai1wm_import' option as persistent state between AJAX calls

// Step 1: Read the package.json from the wpress file to get site info
$wpress_path = AI1WM_BACKUPS_PATH . '/' . $archive;
$extractor = new Ai1wm_Extractor($wpress_path);

if (!$extractor->is_valid()) {
    die("Invalid archive!\n");
}

echo "Archive is valid.\n";
echo "Extracting package.json...\n";
flush();

// Extract just package.json to temp dir
$temp_dir = sys_get_temp_dir() . '/ai1wm_import_' . uniqid();
mkdir($temp_dir, 0755, true);

$written = 0;
$offset = 0;
$extractor->extract_by_files_array($temp_dir, array('package.json'), array(), array(), $written, $offset);
$extractor->close();

$pkg_file = $temp_dir . '/package.json';
if (file_exists($pkg_file)) {
    $pkg = json_decode(file_get_contents($pkg_file), true);
    echo "Source site: " . $pkg['siteurl'] . "\n";
    echo "Source db: " . $pkg['db_name'] . "\n";
    echo "WP version: " . $pkg['wp_version'] . "\n";
    flush();
    
    // Cleanup
    unlink($pkg_file);
    rmdir($temp_dir);
    
    // Now set up the actual import via the WP Admin AJAX mechanism
    // The key insight: AI1WM reads from 'ai1wm_import' option
    $storage_id = uniqid('ai1wm_', true);
    $storage_path = AI1WM_STORAGE_PATH . '/' . $storage_id;
    mkdir($storage_path, 0755, true);
    
    // Copy the wpress to storage
    echo "\nLinking archive to storage...\n";
    copy($wpress_path, $storage_path . '/' . $archive);
    echo "Done. Storage: $storage_id\n";
    flush();
    
    // Save state for AJAX import
    $import_state = array(
        'archive'   => $archive,
        'storage'   => $storage_id,
        'priority'  => 10,
        'status'    => array(),
        'secret_key' => get_option('ai1wm_secret_key'),
    );
    update_option('ai1wm_import', $import_state);
    
    echo "\nImport state saved.\n";
    echo "To complete import, login to WP admin and go to:\n";
    echo "https://zeglarstwomazury.pl/wp-admin/admin.php?page=ai1wm_import\n";
    echo "\nOR run the import steps now...\n";
    flush();
    
    // Run import steps
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
    
    $params = $import_state;
    foreach ($steps as $step_class) {
        echo "Step: $step_class ";
        flush();
        try {
            do {
                $params = call_user_func(array($step_class, 'execute'), $params);
                if (!empty($params['completed'])) {
                    echo ".";
                    flush();
                }
            } while (!empty($params['completed']));
            echo " OK\n";
            flush();
        } catch (Exception $e) {
            echo " ERROR: " . $e->getMessage() . "\n";
            flush();
            break;
        }
    }
    echo "\n\nIMPORT COMPLETE!\n";
    
} else {
    echo "Failed to extract package.json\n";
}
