import ftplib
import sys

def try_login(user, pwd):
    try:
        ftp = ftplib.FTP('wordpress2411241.home.pl')
        ftp.login(user, pwd)
        print(f"Success with {user}")
        print(ftp.pwd())
        ftp.retrlines('LIST')
        ftp.quit()
        sys.exit(0)
    except Exception as e:
        print(f"Failed {user}: {e}")

try_login('wwwscharfer', 'V_ZicPFY')
try_login('wwwscharfer@wordpress2411241.home.pl', 'V_ZicPFY')
try_login('wordpress2411241', 'V_ZicPFY')
