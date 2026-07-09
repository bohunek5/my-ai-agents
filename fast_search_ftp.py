import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html')

def search(d):
    try:
        lines = []
        ftp.dir(d, lines.append)
        for l in lines:
            parts = l.split()
            if len(parts) >= 9:
                name = parts[-1]
                size = parts[4]
                if name in ('.', '..'): continue
                p = f"{d}/{name}"
                if parts[0].startswith('d'):
                    if name not in ['wp-admin', 'wp-includes', 'node_modules', '.git', 'wp-content', 'vendor']:
                        search(p)
                elif name == 'index.html':
                    with tempfile.NamedTemporaryFile() as tf:
                        try:
                            ftp.retrbinary(f'RETR {p}', tf.write)
                            tf.seek(0)
                            content = tf.read().decode('utf-8', errors='ignore')
                            if 'v=3' in content:
                                print(f"FOUND MATCH: {p}")
                        except:
                            pass
    except:
        pass

search('.')
ftp.quit()
