import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    lines = []
    ftp.retrlines("RETR .htaccess", lines.append)
    print("\n".join(lines))
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
