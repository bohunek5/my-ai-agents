import ftplib
import io
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')
ftp.cwd('public_html/zeglarstwomazury.pl')
ftp.storbinary('STOR test.txt', io.BytesIO(b'THIS_IS_A_TEST'))
ftp.quit()
