import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    lines = []
    ftp.dir('/', lines.append)
    print('\n'.join(lines))
except Exception as e:
    print(e)
ftp.quit()
