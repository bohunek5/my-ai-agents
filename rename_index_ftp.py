import ftplib

FTP_HOST = '85.232.237.103'
FTP_USER = 'antygravity@nailbar.com.pl'
FTP_PASS = 'Kurwa123$$$'

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd('public_html')
    
    files = ftp.nlst()
    
    if 'index.php' in files:
        print("Renaming index.php to index.php.stara...")
        ftp.rename('index.php', 'index.php.stara')
        print("Successfully renamed.")
    else:
        print("index.php not found. Maybe already renamed?")
        
    ftp.quit()
except Exception as e:
    print(f"Error: {e}")
