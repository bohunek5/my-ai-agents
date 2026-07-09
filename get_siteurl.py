import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635')

code = b"""<?php
require_once('wp-load.php');
echo "SITEURL: " . get_option('siteurl') . "\n";
echo "HOME: " . get_option('home') . "\n";
?>"""

import io
ftp.storbinary('STOR check_url.php', io.BytesIO(code))
ftp.quit()

import urllib.request
try:
    print(urllib.request.urlopen('https://zeglarstwomazury.pl/check_url.php').read().decode('utf-8'))
except Exception as e:
    print(e)
