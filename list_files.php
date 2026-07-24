<?php
$files = scandir('./');
foreach ($files as $file) {
    if (is_file($file)) {
        echo $file . " - " . date("F d Y H:i:s.", filemtime($file)) . "\n";
    }
}
?>
