import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR public_html/mazury.holiday/index.html', tf.write)
        tf.seek(0)
        print("Size:", len(tf.read()))
    except Exception as e:
        print(e)
ftp.quit()
