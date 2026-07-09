import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    with tempfile.NamedTemporaryFile(delete=False) as tf:
        ftp.retrbinary('RETR public_html/mazury.holiday/.htaccess', tf.write)
        tf_path = tf.name
    with open(tf_path, 'r') as f:
        print(f.read())
except Exception as e:
    print("Error:", e)
ftp.quit()
