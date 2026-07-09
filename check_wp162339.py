import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/serwer194525.lh.pl/wordpress162339')
with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR index.html', tf.write)
        tf.seek(0)
        content = tf.read().decode('utf-8')
        print("Size:", len(content))
        print(content[:100])
    except Exception as e:
        print(e)
ftp.quit()
