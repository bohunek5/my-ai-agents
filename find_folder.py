import ftplib
import io
import time

ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html')

lines = []
ftp.dir(lines.append)
dirs = ['.']
for l in lines:
    parts = l.split()
    if len(parts) >= 9 and parts[0].startswith('d'):
        name = parts[-1]
        if name not in ['.', '..']:
            dirs.append(name)

for d in dirs:
    path = f"{d}/test_find_me.txt" if d != '.' else "test_find_me.txt"
    try:
        ftp.storbinary(f'STOR {path}', io.BytesIO(f'FOUND_IN_{d}'.encode('utf-8')))
        # print(f"Created in {d}")
    except Exception as e:
        pass
        
ftp.quit()
