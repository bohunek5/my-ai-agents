import ftplib
import tempfile
import os

HOST = 'serwer194525.lh.pl'
USER = 'serwer194525'
PASS = 'KochamAntygravity2026$'
REMOTE_DIR = 'public_html/zeglarstwomazury.pl'

ftp = ftplib.FTP(HOST)
ftp.login(USER, PASS)
ftp.cwd(REMOTE_DIR)

with tempfile.NamedTemporaryFile(delete=False) as tf:
    ftp.retrbinary('RETR .htaccess', tf.write)
    tf_path = tf.name

with open(tf_path, 'r') as f:
    content = f.read()

if '<FilesMatch "\.(html|htm)$">' not in content:
    append_str = """
<FilesMatch "\.(html|htm)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
</FilesMatch>
"""
    content = append_str + content

with open(tf_path, 'w') as f:
    f.write(content)

with open(tf_path, 'rb') as f:
    ftp.storbinary('STOR .htaccess', f)

ftp.quit()
os.remove(tf_path)
print("Cache rules added to .htaccess")
