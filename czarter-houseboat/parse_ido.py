import urllib.request
import re

url = "https://client37851.idobooking.com/"
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'<a[^>]*href="[^"]*ob\[(\d+)\][^"]*"[^>]*>(.*?)</a>', html)
    print("Found offers:")
    for id, name in matches:
        if "Stranda" in name or "Apartament" in name:
            name_clean = re.sub(r'<[^>]+>', '', name).strip()
            print(f"ID: {id} - {name_clean}")
except Exception as e:
    print("Error:", e)
