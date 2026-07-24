import ftplib
import os

ftp = ftplib.FTP(os.environ['FTP_SERVER'])
ftp.login(os.environ['FTP_USERNAME'], os.environ['FTP_PASSWORD'])
ftp.cwd(os.environ.get('FTP_SERVER_DIR', '/'))

print("Uploading llms.txt...")
with open(os.environ.get('LLMS_PATH', 'llms.txt'), 'rb') as f:
    ftp.storbinary('STOR llms.txt', f)
print("Uploaded llms.txt")

ftp.quit()
