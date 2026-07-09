<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('memory_limit', '512M');
ini_set('max_execution_time', '300');

$host = 'localhost';
$user = 'serwer194525_nailbar';
$pass = 'KochamAntygravity2026$';
$dbname = 'serwer194525_nailbar';

$mysqli = new mysqli($host, $user, $pass, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$sqlFile = __DIR__ . '/wp-snapshots/20200505_nailbar_2420e0cb929cef5a7109_20200505151711_database.sql';

if (!file_exists($sqlFile)) {
    die("SQL file not found at: " . $sqlFile);
}

$query = file_get_contents($sqlFile);
if (empty($query)) {
    die("SQL file is empty or could not be read.");
}

echo "Starting import...<br>";

// Run the multi query
if ($mysqli->multi_query($query)) {
    do {
        if ($result = $mysqli->store_result()) {
            $result->free();
        }
    } while ($mysqli->more_results() && $mysqli->next_result());
    
    if ($mysqli->errno) {
        echo "Error in batch import: " . $mysqli->error . "<br>";
    } else {
        echo "Database imported successfully.<br>";
        
        // Update the site URL to the test domain
        $updateQuery = "UPDATE wp_options SET option_value = 'http://zeglarstwomazury.pl' WHERE option_name IN ('siteurl', 'home')";
        if ($mysqli->query($updateQuery)) {
            echo "Site URL updated to http://zeglarstwomazury.pl<br>";
        } else {
            echo "Failed to update Site URL: " . $mysqli->error . "<br>";
        }
    }
} else {
    echo "Error starting multi_query: " . $mysqli->error . "<br>";
}

$mysqli->close();
?>
