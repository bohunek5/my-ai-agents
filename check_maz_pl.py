import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
lines = []
try:
    ftp.dir('public_html/mazuryholiday.pl', lines.append)
    print(lines)
except Exception as e:
    print(e)
ftp.quit()
