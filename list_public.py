import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html')
lines = []
ftp.dir(lines.append)
for l in lines: print(l)
ftp.quit()
