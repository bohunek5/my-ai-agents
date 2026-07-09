import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    # Check where AI1WM stores its backups
    try:
        ftp.cwd("public_html/zeglarstwomazury.pl/wp-content/ai1wm-backups")
        files = []
        ftp.retrlines("NLST", files.append)
        print("ai1wm-backups dir exists, contents:", files[:5])
    except:
        print("ai1wm-backups not found")
    
    # Check AI1WM plugin is active
    try:
        ftp.cwd("public_html/zeglarstwomazury.pl/wp-content/plugins/all-in-one-wp-migration")
        print("AI1WM plugin directory EXISTS")
    except:
        print("AI1WM plugin NOT found")
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
