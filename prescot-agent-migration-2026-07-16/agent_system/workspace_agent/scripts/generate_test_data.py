import pandas as pd
from datetime import datetime, timedelta

# Tworzymy sztuczne dane klientów do testu
data = {
    'Firma': ['TechBud Sp. z o.o.', 'Piekarnia Jan Kowalski', 'Auto-Serwis Max', 'Hotel Blue', 'Eko-Warzywa'],
    'Ostatni_Zakup': [
        (datetime.now() - timedelta(days=120)).strftime('%Y-%m-%d'), # Ponad 90 dni temu
        (datetime.now() - timedelta(days=10)).strftime('%Y-%m-%d'),  # Niedawno
        (datetime.now() - timedelta(days=150)).strftime('%Y-%m-%d'), # Ponad 90 dni temu
        (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d'),   # Niedawno
        (datetime.now() - timedelta(days=200)).strftime('%Y-%m-%d')  # Ponad 90 dni temu
    ],
    'Produkt': ['Betoniarka X5', 'Mąka Żytnia 50kg', 'Olej Silnikowy 5L', 'Ręczniki Hotelowe', 'Nawóz Bio']
}

df = pd.DataFrame(data)
df.to_excel('test_sales_data.xlsx', index=False)
print("Sukces! Plik test_sales_data.xlsx pojawił się w folderze projektu.")