import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    print("Checking wordpress160635:")
    lines = []
    ftp.dir('public_html/autoinstalator/zeglarstwomazury.pl/wordpress160635/index.txt', lines.append)
    print(lines)
except Exception as e:
    pass

try:
    print("Checking zeglarstwomazury.pl:")
    lines = []
    ftp.dir('public_html/zeglarstwomazury.pl/index.txt', lines.append)
    print(lines)
except Exception as e:
    pass
ftp.quit()
