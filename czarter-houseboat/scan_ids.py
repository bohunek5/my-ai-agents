import requests
from bs4 import BeautifulSoup

for i in range(20, 50):
    url = f"https://client37851.idobooking.com/book-now/index.php?module=modal-room&id={i}"
    try:
        r = requests.get(url, timeout=5)
        if r.status_code == 200 and "<h4>" in r.text:
            soup = BeautifulSoup(r.text, 'html.parser')
            h4 = soup.find('h4')
            if h4:
                print(f"ID {i}: {h4.text.strip()}")
    except Exception as e:
        pass
