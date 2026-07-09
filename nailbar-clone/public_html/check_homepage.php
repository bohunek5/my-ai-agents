<?php
$host = 'localhost';
$user = 'serwer194525_nailbar';
$pass = 'KochamAntygravity2026$';
$dbname = 'serwer194525_nailbar';

$mysqli = new mysqli($host, $user, $pass, $dbname);

$mysqli->query("UPDATE wp_options SET option_value = '' WHERE option_name = 'permalink_structure'");
echo "Permalink structure cleared.<br>\n";
$mysqli->close();
?>
