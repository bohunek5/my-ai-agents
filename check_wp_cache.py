import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
try:
    ftp.cwd('public_html/zeglarstwomazury.pl/wp-content')
    lines = []
    ftp.dir(lines.append)
    for l in lines:
        print(l)
except Exception as e:
    print("Error:", e)
ftp.quit()
