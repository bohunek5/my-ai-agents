import ftplib
import urllib.request

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635')

# Rename index.php back
try:
    ftp.delete('index.html')
    print("Deleted index.html (NailBar)")
except Exception as e:
    print("Could not delete index.html:", e)

try:
    ftp.rename('_index.php', 'index.php')
    print("Renamed _index.php to index.php (Restored WP)")
except Exception as e:
    print("Could not rename index.php:", e)

ftp.quit()

# Purge cache
try:
    urllib.request.urlopen('https://mazuryholiday.pl/purge_lscache.php')
    print("Purged cache for mazuryholiday.pl")
except Exception as e:
    print("Cache purge error:", e)

