<?php
$host = 'localhost';
$user = 'serwer194525_nailbar';
$pass = 'KochamAntygravity2026$';
$dbname = 'serwer194525_nailbar';

$mysqli = new mysqli($host, $user, $pass, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$updateQuery = "UPDATE wp_options SET option_value = 'http://serwer194525.lh.pl/zeglarstwomazury.pl' WHERE option_name IN ('siteurl', 'home')";
if ($mysqli->query($updateQuery)) {
    echo "Site URL updated to http://serwer194525.lh.pl/zeglarstwomazury.pl<br>";
} else {
    echo "Failed to update Site URL: " . $mysqli->error . "<br>";
}
$mysqli->close();
?>
