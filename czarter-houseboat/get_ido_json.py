import urllib.request
import json
import urllib.parse

# IdoBooking uses an internal JSON API for its search results. Let's try to query it.
# Another way: grab the sitemap.xml!
url = "https://client37851.idobooking.com/sitemap.xml"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        xml = response.read().decode('utf-8')
        
    import re
    matches = re.findall(r'<loc>(https://client37851\.idobooking\.com/pl/.*?-id(\d+)/?)</loc>', xml)
    for loc, idd in sorted(matches, key=lambda x: int(x[1])):
        name = loc.split('/')[-2]
        print(f"ID {idd}: {name}")

except Exception as e:
    print(e)
