import requests
import json
import os

APIFY_TOKEN = "apify_api_pYI2s8mQkhrzYOviIr1p3cURhIh9tY0kDniD"

res = requests.get(f"https://api.apify.com/v2/actor-runs?token={APIFY_TOKEN}&limit=5")
if res.status_code == 200:
    data = res.json()
    for run in data.get('data', {}).get('items', []):
        print(run['actId'], run['status'], run['startedAt'])
else:
    print("Failed", res.text)
