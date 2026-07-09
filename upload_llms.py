import ftplib

ftp = ftplib.FTP('wordpress2411241.home.pl')
ftp.login('wwwscharfer@scharfer.com.pl', 'V_ZicPFY')
ftp.cwd('autoinstalator/wordpressbeginners')

print("Uploading llms.txt...")
with open('/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/public/llms.txt', 'rb') as f:
    ftp.storbinary('STOR llms.txt', f)
print("Uploaded llms.txt")

ftp.quit()
