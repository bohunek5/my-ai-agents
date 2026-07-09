import ftplib
import sys

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl/wp-content/plugins/ocean-portfolio"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    lines = []
    ftp.retrlines("RETR ocean-portfolio.php", lines.append)
    content = "\\n".join(lines)
    
    # Print around line 289
    split_content = content.split("\\n")
    start = max(0, 289 - 20)
    end = min(len(split_content), 289 + 20)
    for i in range(start, end):
        print(f"{i+1}: {split_content[i]}")
        
    ftp.quit()
except Exception as e:
    print("Error:", e)
