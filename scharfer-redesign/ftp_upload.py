import ftplib
import os
import sys

ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')

with open('out.zip', 'rb') as f:
    ftp.storbinary('STOR out.zip', f)

ftp.quit()
print("Upload complete")
