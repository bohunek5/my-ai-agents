import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/scharfer.com.pl')
lines = []
ftp.dir(lines.append)
print("scharfer.com.pl contents:")
for l in lines: print(l)

with tempfile.NamedTemporaryFile(delete=False) as tf:
    try:
        ftp.retrbinary('RETR purge_lscache.php', tf.write)
        print("purge_lscache.php exists in scharfer.com.pl!")
    except Exception as e:
        pass
ftp.quit()
