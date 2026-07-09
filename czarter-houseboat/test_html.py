from bs4 import BeautifulSoup
with open('/Users/karolbohdanowicz/.gemini/antigravity-ide/brain/e4fbf0e4-1c5d-44cd-bbe7-b35dd3131007/scratch/page.html', 'r') as f:
    soup = BeautifulSoup(f, 'html.parser')
    for div in soup.find_all('div', class_='room-name-container'):
        print(div.text.strip())
