import ftplib

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')

# Delete NailBar HTML
try:
    ftp.delete('index.html')
    print("Deleted index.html from public_html/zeglarstwomazury.pl")
except Exception as e:
    pass

try:
    ftp.delete('index_real.html')
except Exception:
    pass

try:
    ftp.delete('styles.css')
    ftp.delete('app.js')
except Exception:
    pass

# Restore WP index.php
try:
    ftp.rename('_index.php_backup', 'index.php')
    print("Restored index.php from _index.php_backup")
except Exception as e:
    print(e)

ftp.quit()
