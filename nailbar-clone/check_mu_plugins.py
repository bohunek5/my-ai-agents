import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl/wp-content"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    files = []
    ftp.retrlines("NLST", files.append)
    print("wp-content contents:")
    for f in sorted(files):
        print(f"  {f}")
    
    # Check for mu-plugins
    try:
        ftp.cwd("mu-plugins")
        mu_files = []
        ftp.retrlines("NLST", mu_files.append)
        print("\nmu-plugins:")
        for f in sorted(mu_files):
            print(f"  {f}")
    except:
        print("\nNo mu-plugins directory.")
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
