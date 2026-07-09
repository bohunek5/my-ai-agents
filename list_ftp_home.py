import ftplib
ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')
ftp.retrlines('LIST index.html')
ftp.quit()
