import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html')
print("Files in public_html:")
ftp.retrlines('LIST')
ftp.quit()
