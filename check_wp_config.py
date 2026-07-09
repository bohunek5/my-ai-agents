import ftplib
import tempfile
import sys

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635')

def print_file(filename):
    print(f"\n--- {filename} ---")
    with tempfile.NamedTemporaryFile() as tf:
        try:
            ftp.retrbinary(f'RETR {filename}', tf.write)
            tf.seek(0)
            print(tf.read().decode('utf-8'))
        except Exception as e:
            print(f"Could not read {filename}:", e)

print_file('wp-config.php')
print_file('.htaccess')
ftp.quit()
