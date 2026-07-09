import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    # List the actual public_html/zeglarstwomazury.pl to confirm it's the correct location
    print("=== public_html/zeglarstwomazury.pl ===")
    ftp.cwd("public_html/zeglarstwomazury.pl")
    files = []
    ftp.retrlines("NLST", files.append)
    for f in sorted(files)[:30]:
        print(f)
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
