import ftplib
import os
import requests
import time

FTP_HOST = '85.232.237.103'
FTP_USER = 'antygravity@nailbar.com.pl'
FTP_PASS = 'Kurwa123$$$'
ZIP_FILE = '/Users/karolbohdanowicz/my-ai-agents/nailbar_to_deploy.zip'
REMOTE_DIR = 'public_html'

try:
    print(f"Connecting to FTP {FTP_HOST}...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(REMOTE_DIR)
    
    # Upload PHP script
    print("Uploading unzip.php...")
    with open('/Users/karolbohdanowicz/my-ai-agents/unzip_nailbar.php', 'rb') as f:
        ftp.storbinary('STOR unzip.php', f)
        
    print(f"Uploading {ZIP_FILE}...")
    with open(ZIP_FILE, 'rb') as f:
        ftp.storbinary('STOR nailbar_to_deploy.zip', f)
        
    ftp.quit()
    print("Upload completed! Triggering extraction...")
    
    # Trigger unzip
    response = requests.get('http://nailbar.com.pl/unzip.php')
    print(f"Extraction response: {response.text}")
    
except Exception as e:
    print(f"Error during upload: {e}")
