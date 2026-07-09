import ftplib
ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')
with open('unzip_better.php', 'wb') as f:
    ftp.retrbinary('RETR unzip_better.php', f.write)
ftp.quit()
