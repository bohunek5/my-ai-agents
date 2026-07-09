<?php
add_action('parse_request', function($wp) {
    if ( isset($_GET['debug_query']) ) {
        echo "<b>parse_request query_vars:</b> <pre>" . print_r($wp->query_vars, true) . "</pre><br>";
        echo "<b>parse_request show_on_front:</b> " . var_export(get_option('show_on_front'), true) . "<br>";
        echo "<b>parse_request page_on_front:</b> " . var_export(get_option('page_on_front'), true) . "<br>";
    }
}, 99);

add_action('template_redirect', function() {
    global $wp_query, $wp;
    if ( isset($_GET['debug_query']) ) {
        echo "<h1>Debug Info</h1>";
        echo "<b>Matched Rule:</b> " . $wp->matched_rule . "<br>";
        echo "<b>Matched Query:</b> " . $wp->matched_query . "<br>";
        echo "<b>WP Request:</b> " . $wp->request . "<br>";
        echo "<b>PATH_INFO:</b> " . (isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : 'NOT SET') . "<br>";
        echo "<b>WP Request:</b> '" . $wp->request . "'<br>";
        echo "<b>wp_query->query:</b> <pre>" . print_r($wp_query->query, true) . "</pre><br>";
        echo "<b>Query Vars:</b> <pre>" . print_r($wp_query->query_vars, true) . "</pre><br>";
        echo "<b>Request (SQL):</b> " . $wp_query->request . "<br>";
        echo "<b>Found Posts:</b> " . $wp_query->found_posts . "<br>";
        echo "<b>is_404:</b> " . ($wp_query->is_404 ? 'Yes' : 'No') . "<br>";
        echo "<b>is_front_page:</b> " . ($wp_query->is_front_page() ? 'Yes' : 'No') . "<br>";
        
        global $wp_filter;
        echo "<b>'request' filters:</b> <pre>" . print_r(isset($wp_filter['request']) ? $wp_filter['request'] : 'None', true) . "</pre><br>";
        echo "<b>'pre_get_posts' filters:</b> <pre>" . print_r(isset($wp_filter['pre_get_posts']) ? $wp_filter['pre_get_posts'] : 'None', true) . "</pre><br>";
        
        exit;
    }
});
?>
