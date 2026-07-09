import ftplib
import sys
ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')
with open('/Users/karolbohdanowicz/my-ai-agents/test_scharfer.txt', 'wb') as f:
    f.write(b"HELLO")
with open('/Users/karolbohdanowicz/my-ai-agents/test_scharfer.txt', 'rb') as f:
    ftp.storbinary('STOR test_scharfer.txt', f)
ftp.quit()
