import ftplib
import sys
ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')
with open('/Users/karolbohdanowicz/my-ai-agents/htaccess.txt', 'wb') as f:
    ftp.retrbinary('RETR .htaccess', f.write)
ftp.quit()
