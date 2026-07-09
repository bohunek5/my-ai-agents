import urllib.request
import re
import json

def get_offer_links():
    url = "https://client37851.idobooking.com/"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        links = re.findall(r'<a[^>]*href="([^"]*ob\[(\d+)\][^"]*)"', html)
        for link, ido in links:
            if ido in ['32', '43', '44']:
                print(f"ID {ido}: {link}")
    except Exception as e:
        print("Err:", e)

get_offer_links()
