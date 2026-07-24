import ftplib
FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
REMOTE_DIR = "public_html/autoinstalator/serwer194525.lh.pl/wordpress162339/images"

ftp = ftplib.FTP(FTP_HOST)
ftp.login(FTP_USER, FTP_PASS)
ftp.cwd(REMOTE_DIR)

print("--- skorupki ---")
lines = []
ftp.dir("skorupki", lines.append)
for line in lines[:5]: print(line)

print("--- fuleda ---")
lines = []
ftp.dir("fuleda", lines.append)
for line in lines[:5]: print(line)

ftp.quit()
