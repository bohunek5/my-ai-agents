import ftplib
import os

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

def upload_file(ftp, local_path, remote_path):
    print(f"Uploading {local_path} to {remote_path}...")
    try:
        with open(local_path, 'rb') as f:
            ftp.storbinary(f'STOR {remote_path}', f)
        print(f"Success: {remote_path}")
    except Exception as e:
        print(f"Failed to upload {local_path}: {e}")

try:
    print("Connecting to FTP...")
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    
    base_dir = "/Users/karolbohdanowicz/my-ai-agents/nailbar-clone/public_html"
    
    upload_file(ftp, f"{base_dir}/wp-config.php", "wp-config.php")
    upload_file(ftp, f"{base_dir}/wp-content/plugins/nextend-smart-slider3-pro/Nextend/Framework/Pattern/SingletonTrait.php", "wp-content/plugins/nextend-smart-slider3-pro/Nextend/Framework/Pattern/SingletonTrait.php")
    upload_file(ftp, f"{base_dir}/wp-content/plugins/gt3-photo-video-gallery/core/block/traits/trait-clear-attributes.php", "wp-content/plugins/gt3-photo-video-gallery/core/block/traits/trait-clear-attributes.php")
    upload_file(ftp, f"{base_dir}/fix_options.php", "fix_options.php")
    upload_file(ftp, f"{base_dir}/.htaccess", ".htaccess")
    upload_file(ftp, f"{base_dir}/check_homepage.php", "check_homepage.php")
    upload_file(ftp, f"{base_dir}/flush.php", "flush.php")
    upload_file(ftp, f"{base_dir}/test_query.php", "test_query.php")
    upload_file(ftp, f"{base_dir}/wp-content/mu-plugins/debug-404.php", "wp-content/mu-plugins/debug-404.php")
    upload_file(ftp, f"{base_dir}/check_options.php", "check_options.php")
    upload_file(ftp, f"{base_dir}/wp-includes/class-wp-query.php", "wp-includes/class-wp-query.php")
    
    # Try to make wp-snapshots dir
    try:
        ftp.mkd("wp-snapshots")
    except error_perm as e:
        print(f"Dir wp-snapshots might already exist: {e}")
        
    try:
        ftp.mkd("wp-content/mu-plugins")
    except error_perm as e:
        print(f"Dir mu-plugins might already exist: {e}")
        
    upload_file(ftp, f"{base_dir}/wp-snapshots/20200505_nailbar_2420e0cb929cef5a7109_20200505151711_database.sql", "wp-snapshots/20200505_nailbar_2420e0cb929cef5a7109_20200505151711_database.sql")
    
    ftp.quit()
    print("Done uploading important files.")
except Exception as e:
    print("FTP Error:", e)
