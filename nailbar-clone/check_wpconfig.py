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
    ftp.retrlines("RETR wp-config.php", lines.append)
    content = "\n".join(lines)
    
    # Look for SITEURL or WP_HOME overrides
    for i, line in enumerate(content.split("\n")):
        if any(kw in line for kw in ['SITEURL', 'WP_HOME', 'WP_SITEURL', 'table_prefix', 'DB_NAME']):
            print(f"{i+1}: {line}")
    
    ftp.quit()
except Exception as e:
    print("Error:", e)
