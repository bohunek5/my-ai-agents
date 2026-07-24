import ftplib
import os

server = 'serwer2617918.home.pl'
user = 'antygravity@serwer2617918.home.pl'
password = 'Kurwa123$$$'
local_base = '/Users/karolbohdanowicz/Downloads/kopia mazuryaktywnie'

def download_dir(ftp, remote_dir, local_dir):
    print(f"Downloading remote dir {remote_dir} to {local_dir}...")
    os.makedirs(local_dir, exist_ok=True)
    ftp.cwd(remote_dir)
    
    items = []
    ftp.retrlines('LIST', lambda line: items.append(line))
    
    for item in items:
        # Parse LIST line:
        # drwxr-xr-x    2 3242702    homenet          4096 Jul  7 20:31 css
        # -rw-r--r--    1 3242702    homenet        207371 Jul  8 10:39 about.html
        parts = item.split()
        if len(parts) < 9:
            continue
        
        name = parts[-1]
        if name in ('.', '..'):
            continue
            
        is_dir = parts[0].startswith('d')
        local_path = os.path.join(local_dir, name)
        
        if is_dir:
            download_dir(ftp, name, local_path)
            ftp.cwd('..')  # Go back up
        else:
            print(f"Downloading file {name}...")
            with open(local_path, 'wb') as f:
                ftp.retrbinary(f"RETR {name}", f.write)

def main():
    try:
        print(f"Connecting to {server}...")
        ftp = ftplib.FTP(server)
        ftp.login(user, password)
        print("Connected!")
        
        download_dir(ftp, '.', local_base)
        
        ftp.quit()
        print("Backup finished successfully!")
    except Exception as e:
        print(f"Error during backup: {e}")

if __name__ == "__main__":
    main()
