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
        
        print("Listing root:")
        ftp.dir()
        
        if 'public_html' in ftp.nlst():
            print("\nListing public_html:")
            ftp.cwd('public_html')
            ftp.dir()
            
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
