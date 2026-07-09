import paramiko
import sys

transport = paramiko.Transport(('wordpress2411241.home.pl', 22))
try:
    transport.connect(username='wwwscharfer', password='V_ZicPFY')
    print("SSH/SFTP Connected successfully!")
    sftp = paramiko.SFTPClient.from_transport(transport)
    print(sftp.listdir('.'))
    sftp.close()
except Exception as e:
    print(f"Failed: {e}")
finally:
    transport.close()
