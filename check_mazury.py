import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    ftp.cwd('public_html/mazury.holiday')
    print("Files in mazury.holiday:", ftp.nlst())
except Exception as e:
    print(e)
ftp.quit()
