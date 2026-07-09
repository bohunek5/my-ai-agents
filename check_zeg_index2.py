import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')
lines = []
ftp.dir('index.html', lines.append)
print(lines[0] if lines else "Not found")

with tempfile.NamedTemporaryFile(delete=False) as tf:
    try:
        ftp.retrbinary('RETR index.html', tf.write)
        tf_path = tf.name
    except Exception as e:
        print("RETR failed:", e)
ftp.quit()

try:
    with open(tf_path, 'r') as f:
        content = f.read()
        print("v=3 in ftp file:", 'v=3' in content)
        print("v=20260607-2146 in ftp file:", 'v=20260607-2146' in content)
except:
    pass
