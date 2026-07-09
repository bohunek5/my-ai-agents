import ftplib
import io
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')
code = b"""<?php
require_once('wp-load.php');
echo "SITEURL: " . get_option('siteurl') . "\n";
echo "HOME: " . get_option('home') . "\n";
?>"""
ftp.storbinary('STOR check_url.php', io.BytesIO(code))
ftp.quit()

import urllib.request
try:
    print(urllib.request.urlopen('https://mazuryholiday.pl/check_url.php').read().decode('utf-8'))
except Exception as e:
    print(e)
