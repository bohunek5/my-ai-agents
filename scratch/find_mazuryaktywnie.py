import ftplib

server = 'serwer194525.lh.pl'
user = 'serwer194525'
password = 'KochamAntygravity2026$'

def main():
    try:
        print(f"Connecting to {server}...")
        ftp = ftplib.FTP(server)
        ftp.login(user, password)
        print("Connected!")
        
        ftp.cwd('public_html/autoinstalator')
        print("\nListing public_html/autoinstalator:")
        ftp.dir()
        
        # Check subdirectories
        for item in ftp.nlst():
            print(f"\nChecking subdirectory: {item}")
            try:
                ftp.cwd(item)
                ftp.dir()
                # go back
                ftp.cwd('..')
            except Exception as e:
                print(f"Could not check {item}: {e}")
                
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
