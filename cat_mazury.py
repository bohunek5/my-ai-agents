import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/mazury.holiday')

with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR index.html', tf.write)
        tf.seek(0)
        print(tf.read()[:500].decode('utf-8'))
    except Exception as e:
        print(e)
ftp.quit()
