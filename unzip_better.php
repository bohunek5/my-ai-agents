<?php
$output = shell_exec('unzip -o out.zip 2>&1');
echo "<pre>$output</pre>";
echo "DONE";
?>
