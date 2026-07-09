import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    # List AI1WM plugin folder
    ftp.cwd("public_html/zeglarstwomazury.pl/wp-content/plugins/all-in-one-wp-migration")
    files = []
    ftp.retrlines("NLST", files.append)
    print("AI1WM plugin files:", sorted(files))
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
