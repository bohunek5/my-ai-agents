import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')
print("purge_lscache.php exists:", 'purge_lscache.php' in ftp.nlst())
ftp.quit()
