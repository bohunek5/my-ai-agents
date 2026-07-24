import ftplib

server = 'serwer2617918.home.pl'
user = 'antygravity@serwer2617918.home.pl'
password = 'Kurwa123$$$'

def main():
    try:
        print(f"Connecting to {server}...")
        ftp = ftplib.FTP(server)
        ftp.login(user, password)
        print("Connected!")
        
        print("Listing root:")
        ftp.dir()
        
        ftp.quit()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
