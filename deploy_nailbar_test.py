import ftplib

FTP_HOST = '85.232.237.103'
FTP_USER = 'antygravity@nailbar.com.pl'
FTP_PASS = 'Kurwa123$$$'

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd('public_html')
    print("Contents of public_html:")
    print(ftp.nlst())
    ftp.quit()
except Exception as e:
    print(f"Error: {e}")
