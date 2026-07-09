import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/mazury.holiday')
import tempfile
with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR .htaccess', tf.write)
        tf.seek(0)
        print("CONTENT:", tf.read().decode('utf-8'))
    except Exception as e:
        print(e)
ftp.quit()
