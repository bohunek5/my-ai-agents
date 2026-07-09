<?php
$host = 'localhost';
$user = 'serwer194525_nailbar';
$pass = 'KochamAntygravity2026$';
$dbname = 'serwer194525_nailbar';

$mysqli = new mysqli($host, $user, $pass, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Clear upload_path (default behavior is to use wp-content/uploads)
$mysqli->query("UPDATE wp_options SET option_value = '' WHERE option_name = 'upload_path'");
echo "upload_path cleared.<br>";

// Clear rewrite_rules to fix 404s
$mysqli->query("UPDATE wp_options SET option_value = '' WHERE option_name = 'rewrite_rules'");
echo "rewrite_rules cleared.<br>";

// Set Site URL and Home explicitly
$url = 'http://serwer194525.lh.pl/zeglarstwomazury.pl';
$mysqli->query("UPDATE wp_options SET option_value = '$url' WHERE option_name IN ('siteurl', 'home')");
echo "siteurl and home updated.<br>";

$mysqli->close();
?>
