import ftplib

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

files_to_delete = [
    "check_options.php",
    "check_homepage.php",
    "fix_options.php",
    "flush.php",
    "test_query.php",
    "wp-content/mu-plugins/debug-404.php",
    "test_parse.php",
    "test_parse2.php",
    "test_php_cmp.php",
]

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    for f in files_to_delete:
        try:
            ftp.delete(f)
            print(f"Deleted {f}")
        except Exception as e:
            print(f"Failed to delete {f}: {e}")
            
    ftp.quit()
    print("Cleanup done.")
except Exception as e:
    print("FTP Error:", e)
