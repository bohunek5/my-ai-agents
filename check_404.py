import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/mazury.holiday')
with tempfile.NamedTemporaryFile(delete=False) as tf:
    ftp.retrbinary('RETR 404.html', tf.write)
    tf_path = tf.name
ftp.quit()

with open(tf_path, 'r') as f:
    print(f.read()[:200])
