<?php
echo "index.html date: " . date("Y-m-d H:i:s", filemtime('index.html')) . "\n";
echo "llms.txt content:\n";
echo substr(file_get_contents('llms.txt'), 0, 500);
?>
