import ftplib
import io
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')

dirs = [
    'public_html',
    'public_html/mazury.holiday',
    'public_html/zeglarstwomazury.pl',
    'public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635'
]

# Fetch all top level dirs
lines = []
ftp.dir('public_html', lines.append)
for line in lines:
    if line.startswith('d'):
        name = line.split(maxsplit=8)[-1]
        if name not in ['.', '..'] and f'public_html/{name}' not in dirs:
            dirs.append(f'public_html/{name}')

for d in dirs:
    try:
        ftp.cwd('/' + d)
        code = f"<?php echo 'ROOT: {d}'; ?>".encode('utf-8')
        ftp.storbinary('STOR find_me_root.php', io.BytesIO(code))
    except Exception as e:
        pass

ftp.quit()

try:
    req = urllib.request.Request('https://mazuryholiday.pl/find_me_root.php')
    with urllib.request.urlopen(req, context=ctx) as r:
        print(r.read().decode('utf-8'))
except Exception as e:
    print("Curl failed:", e)

