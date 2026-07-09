import urllib.request
import re

url = "https://client37851.idobooking.com/pl/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    # Find all hrefs
    links = re.findall(r'href="([^"]+)"', html)
    for l in set(links):
        if '-id' in l:
            print(l)
except Exception as e:
    print(e)
