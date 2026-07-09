import ftplib
import os

FTP_HOST = '85.232.237.103'
FTP_USER = 'antygravity@nailbar.com.pl'
FTP_PASS = 'Kurwa123$$$'
LOCAL_DIR = '/Users/karolbohdanowicz/my-ai-agents/NAILBAR'
REMOTE_DIR = 'public_html'

def upload_dir(ftp, local_path, remote_path):
    print(f"Uploading directory: {local_path} -> {remote_path}")
    
    # Try to create remote directory
    try:
        ftp.mkd(remote_path)
    except ftplib.error_perm:
        pass # Directory likely exists
        
    ftp.cwd(remote_path)
    
    for item in os.listdir(local_path):
        if item in ['.DS_Store', 'node_modules', 'tmp', '.git', 'scratch']:
            continue
            
        l_item = os.path.join(local_path, item)
        if os.path.isfile(l_item):
            print(f"Uploading file: {l_item}")
            with open(l_item, 'rb') as f:
                ftp.storbinary(f'STOR {item}', f)
        elif os.path.isdir(l_item):
            upload_dir(ftp, l_item, item)
            
    ftp.cwd('..')

try:
    print(f"Connecting to FTP {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    # Upload everything from NAILBAR_DEPLOY to public_html
    ftp.cwd('/')
    upload_dir(ftp, LOCAL_DIR, REMOTE_DIR)
    
    ftp.quit()
    print("Upload completed successfully!")
except Exception as e:
    print(f"Error during upload: {e}")
