import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    lines = []
    ftp.dir('public_html/mazury.holiday', lines.append)
    print('\n'.join(lines))
except Exception as e:
    pass
ftp.quit()
