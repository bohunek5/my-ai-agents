import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    ftp.cwd('public_html/zeglarstwomazury.pl/public')
    print("public folder exists!")
except Exception as e:
    print("No public folder:", e)
ftp.quit()
