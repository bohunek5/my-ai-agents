import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"

def find_file(ftp, path, filename):
    try:
        items = []
        ftp.cwd(path)
        ftp.retrlines('LIST', items.append)
        for item in items:
            parts = item.split()
            if len(parts) < 9:
                continue
            name = " ".join(parts[8:])
            if name in ('.', '..'):
                continue
            
            full_path = f"{path}/{name}"
            if item.startswith('d'):
                find_file(ftp, full_path, filename)
            elif name == filename:
                print(f"FOUND: {full_path}")
    except Exception as e:
        print(f"Error in {path}: {e}")

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    find_file(ftp, '/public_html', 'wp-login.php')
    ftp.quit()
except Exception as e:
    print("FTP Error:", e)
