import urllib.request
import re

url = "https://client37851.idobooking.com/pl/oferta/Apartament-typu-Studio/32"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Success loading page!")
    # Check if there's any JSON state
    state = re.search(r'window\.__INITIAL_STATE__\s*=\s*(\{.*?\});', html, re.DOTALL)
    if state:
        import json
        with open('ido_state.json', 'w') as f:
            f.write(state.group(1))
        print("Found __INITIAL_STATE__!")
except Exception as e:
    print("Error:", e)
