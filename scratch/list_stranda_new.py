import ftplib
FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
ftp = ftplib.FTP(FTP_HOST)
ftp.login(FTP_USER, FTP_PASS)
lines = []
try:
    ftp.dir("public_html/autoinstalator/serwer194525.lh.pl/wordpress162339/images/apartments/stranda_new", lines.append)
    for line in lines: print(line)
except Exception as e:
    print(e)
ftp.quit()
