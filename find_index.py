import ftplib
ftp = ftplib.FTP('serwer194525.lh.pl')
ftp.login('serwer194525', 'KochamAntygravity2026$')

found = []

def traverse(path):
    try:
        lines = []
        ftp.dir(path, lines.append)
        for line in lines:
            parts = line.split(None, 8)
            if len(parts) < 9: continue
            name = parts[-1]
            size = parts[4]
            is_dir = line.startswith('d')
            if is_dir and name not in ('.', '..'):
                traverse(path + '/' + name)
            elif name == 'index.html':
                found.append(f"{size} {path}/{name}")
    except:
        pass

traverse('public_html')
for f in found:
    print(f)
ftp.quit()
