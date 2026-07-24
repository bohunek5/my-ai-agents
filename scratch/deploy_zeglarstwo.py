import ftplib
import os

FTP_HOST = 'serwer194525.lh.pl'
FTP_USER = 'serwer194525'
FTP_PASS = 'KochamAntygravity2026$'
FTP_DIR = 'public_html/zeglarstwomazury.pl'
LOCAL_DIR = '/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline'

def main():
    print("Connecting to FTP...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    
    try:
        ftp.cwd(FTP_DIR)
    except:
        print(f"Could not change directory to {FTP_DIR}")
        return
        
    print(f"Uploading to {FTP_DIR}...")
    
    # Let's clear the old nailbar files optionally, but STOR overwrites.
    # We will just upload over them.
    
    for root, dirs, files in os.walk(LOCAL_DIR):
        if '.git' in root or 'node_modules' in root or 'src' in root or 'dist' in root:
            continue
            
        rel_path = os.path.relpath(root, LOCAL_DIR)
        if rel_path == '.':
            remote_root = ''
        else:
            remote_root = rel_path.replace('\\', '/')
            # Create directory if it doesn't exist
            dirs_to_create = remote_root.split('/')
            current_path = ""
            for d in dirs_to_create:
                if current_path == "":
                    current_path = d
                else:
                    current_path += "/" + d
                try:
                    ftp.mkd(current_path)
                except ftplib.error_perm:
                    pass
                
        for file in files:
            if file == '.DS_Store':
                continue
            if root == LOCAL_DIR and (file.endswith('.py') or file.endswith('.json') or file.endswith('.js') or file.startswith('old_') or file.startswith('index_') or file.startswith('shop_')):
                # Keep index.html, shop.html etc. but avoid index_xxx.html or old_index.html
                if file not in ['index.html', 'shop.html', 'blog.html', 'cart.html', 'checkout.html', 'contact.html', 'product.html', 'admin.html']:
                    continue
                
            local_file_path = os.path.join(root, file)
            if remote_root:
                remote_file_path = f"{remote_root}/{file}"
            else:
                remote_file_path = file
                
            print(f"Uploading {remote_file_path}...")
            try:
                with open(local_file_path, 'rb') as f:
                    ftp.storbinary(f'STOR {remote_file_path}', f)
            except Exception as e:
                print(f"Failed to upload {remote_file_path}: {e}")
                
    ftp.quit()
    print("Deployment complete.")

if __name__ == '__main__':
    main()
