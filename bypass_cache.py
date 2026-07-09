import ftplib
import io
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')

# Rename index.html to index_real.html
try:
    ftp.rename('index.html', 'index_real.html')
except Exception as e:
    print("Rename error:", e)

# Create index.php
php_code = b"<?php\nheader('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');\nheader('Cache-Control: post-check=0, pre-check=0', false);\nheader('Pragma: no-cache');\ninclude 'index_real.html';\n?>"
ftp.storbinary('STOR index.php', io.BytesIO(php_code))

ftp.quit()
