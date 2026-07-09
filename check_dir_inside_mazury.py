import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    ftp.cwd('public_html/mazury.holiday/zeglarstwomazury.pl')
    lines = []
    ftp.dir('index.html', lines.append)
    print("Found in mazury.holiday/zeglarstwomazury.pl:", lines[0] if lines else "Not found")
except Exception as e:
    print("Error:", e)
ftp.quit()
