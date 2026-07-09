<?php
error_reporting(0);
define('WP_USE_THEMES', false);
require_once __DIR__ . '/wp-load.php';

global $wpdb, $wp_rewrite;

// Get current rules
$rules = get_option('rewrite_rules');
$rules = (array)$rules;

echo "Current rules count: " . count($rules) . "\n";
echo "'\$' rule exists: " . (isset($rules['$']) ? 'YES' : 'NO') . "\n";

// Add the '$' rule for front page (page_id=168)
$rules['$'] = 'index.php?&page_id=168';

// Save it back
update_option('rewrite_rules', $rules);
echo "Updated rules count: " . count($rules) . "\n";

// Verify
$updated = get_option('rewrite_rules');
echo "'\$' rule now: " . (isset($updated['$']) ? $updated['$'] : 'MISSING') . "\n";

echo "\nFront page is now mapped.\n";
