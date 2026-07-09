import ftplib
import tempfile
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635')
lines = []
ftp.dir(lines.append)
for l in lines: print(l)

with tempfile.NamedTemporaryFile() as tf:
    try:
        ftp.retrbinary('RETR index.php', tf.write)
        tf.seek(0)
        print("\n--- index.php ---")
        print(tf.read().decode('utf-8'))
    except Exception as e:
        print("Could not read index.php:", e)

ftp.quit()
