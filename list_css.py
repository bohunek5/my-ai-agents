import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635')
lines = []
ftp.dir(lines.append)
for l in lines:
    if '.css' in l or 'styles' in l:
        print(l)
ftp.quit()
