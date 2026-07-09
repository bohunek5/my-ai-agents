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
    
    files = ftp.nlst()
    if 'error_log' in files:
        print("Found error_log! Downloading...")
        with open("error_log", "wb") as f:
            ftp.retrbinary("RETR error_log", f.write)
    else:
        print("No error_log found in the root.")
        
    ftp.quit()
except Exception as e:
    print("Error:", e)
