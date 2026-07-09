<?php
require_once('wp-load.php');
// Update the ocean-portfolio plugin or just disable the buggy function for a moment if it's breaking Elementor
// Actually let's just make sure the page template is correctly assigned
update_post_meta(168, '_wp_page_template', 'elementor_header_footer');
echo "Page template updated.\n";

// Let's force elementor data to be un-escaped if it was double serialized
$elementor_data = get_post_meta(168, '_elementor_data', true);
if (is_string($elementor_data)) {
    // Looks fine
    echo "Elementor data is present.\n";
} else {
    echo "Elementor data missing or corrupted.\n";
}
