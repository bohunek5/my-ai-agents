import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('serwer194525.lh.pl', username='serwer194525', password='KochamAntygravity2026$')
sftp = ssh.open_sftp()
with sftp.open('public_html/zeglarstwomazury.pl/.htaccess') as f:
    print(f.read().decode())
sftp.close()
ssh.close()
