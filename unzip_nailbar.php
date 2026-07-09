<?php
$zip = new ZipArchive;
$res = $zip->open('nailbar_to_deploy.zip');
if ($res === TRUE) {
  $zip->extractTo('./');
  $zip->close();
  echo 'ok';
} else {
  echo 'failed';
}
?>
