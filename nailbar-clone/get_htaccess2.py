import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    with open('htaccess_test.txt', 'wb') as f:
        ftp.retrbinary('RETR public_html/mazury.holiday/.htaccess', f.write)
    ftp.quit()
except Exception as e:
    print("Error:", e)
