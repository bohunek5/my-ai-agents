import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
with tempfile.NamedTemporaryFile(delete=False) as tf:
    ftp.retrbinary('RETR public_html/zeglarstwomazury.pl/ue/index.html', tf.write)
    tf_path = tf.name
ftp.quit()

with open(tf_path, 'r') as f:
    content = f.read()
    if 'styles.css?v=' in content:
        import re
        m = re.search(r'styles\.css\?v=[^"\'\s]+', content)
        print("ue/index.html has:", m.group(0) if m else "No match")
