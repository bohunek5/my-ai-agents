<?php
require_once('wp-load.php');
$query = new WP_Query(array('page_id' => 168, 'post_type' => 'page'));
echo "SQL: " . $query->request . "<br>";
echo "Query for page 168 found: " . $query->found_posts . " posts.<br>";
if ($query->have_posts()) {
    while($query->have_posts()) {
        $query->the_post();
        echo "Title: " . get_the_title() . "<br>";
    }
}
?>
