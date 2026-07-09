import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    # Read original wp-blog-header.php
    lines = []
    ftp.retrlines("RETR wp-blog-header.php", lines.append)
    orig = "\n".join(lines)
    print("Original wp-blog-header.php:")
    print(orig)
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
