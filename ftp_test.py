import ftplib

ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer', 'V_ZicPFY')
print(ftp.pwd())
ftp.retrlines('LIST')
ftp.quit()
