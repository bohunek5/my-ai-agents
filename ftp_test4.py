import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/scharfer.com.pl')
try:
    with open('/Users/karolbohdanowicz/my-ai-agents/htaccess_scharfer', 'wb') as f:
        ftp.retrbinary('RETR .htaccess', f.write)
except:
    pass
ftp.quit()
