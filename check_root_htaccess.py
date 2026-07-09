import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html')

with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR .htaccess', tf.write)
        tf.seek(0)
        print("--- public_html/.htaccess ---")
        print(tf.read().decode('utf-8'))
    except Exception as e:
        print("No .htaccess found in public_html:", e)
ftp.quit()
