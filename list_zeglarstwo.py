import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')
lines = []
ftp.dir('purge_lscache.php', lines.append)
print(lines)
ftp.quit()
