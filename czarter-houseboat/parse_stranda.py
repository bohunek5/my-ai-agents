import urllib.request
import re

url = "https://client37851.idobooking.com/apartamenty-gizycko-stranda"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'<div[^>]*class="[^"]*object_name[^"]*"[^>]*>(.*?)</div>', html, re.IGNORECASE | re.DOTALL)
    for m in matches:
        print(re.sub(r'<[^>]+>', '', m).strip())
except Exception as e:
    print("Error:", e)
