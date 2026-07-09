import ftplib

try:
    ftp = ftplib.FTP('serwer194525.lh.pl')
    ftp.login('serwer194525', 'KochamAntygravity2026$')
    print('Connected.')
    ftp.cwd('public_html')
    print(ftp.nlst())
    ftp.quit()
except Exception as e:
    print(f'Error: {e}')
