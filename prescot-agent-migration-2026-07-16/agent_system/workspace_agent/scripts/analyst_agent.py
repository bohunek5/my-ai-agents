import pandas as pd
from datetime import datetime
import json
import os

def run_analyst_task(input_file, output_file):
    print(f"Analyst: Reading {input_file}...")
    try:
        df = pd.read_excel(input_file)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # Ensure date format
    df['Ostatni_Zakup'] = pd.to_datetime(df['Ostatni_Zakup'])
    
    current_date = datetime.now()
    churn_threshold_days = 90
    
    leads = []
    
    print("Analyst: Analyzing data for churn risks...")
    for index, row in df.iterrows():
        last_purchase = row['Ostatni_Zakup']
        days_since = (current_date - last_purchase).days
        
        if days_since > churn_threshold_days:
            lead = {
                'Company': row['Firma'],
                'DaysSincePurchase': days_since,
                'LastPurchaseDate': last_purchase.strftime('%Y-%m-%d'),
                'FavoriteProduct': row['Produkt'] # In a real scenario, we'd group by and count
            }
            leads.append(lead)

    # Save results
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(leads, f, indent=4, ensure_ascii=False)
    
    print(f"Analyst: Found {len(leads)} companies at risk. Saved to {output_file}")

if __name__ == "__main__":
    input_path = 'test_sales_data.xlsx'
    output_path = 'output/analyst_result.json'
    run_analyst_task(input_path, output_path)
