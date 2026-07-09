import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd("public_html/zeglarstwomazury.pl")
    
    files = []
    ftp.retrlines("NLST", files.append)
    for f in sorted(files):
        # Look for WordPress core files  
        if any(f.endswith(x) for x in ['.php', '.html']) and 'wp-' in f:
            print(f)
    
    # Check if wp-includes exists
    try:
        ftp.cwd("wp-includes")
        print("wp-includes/ EXISTS")
    except:
        print("wp-includes/ MISSING!")
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
