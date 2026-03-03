import pandas as pd
import numpy as np
import datetime
import os

FILE_PATH = '/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot/all2022-2026.xlsx'

def categorize(product_name):
    if not isinstance(product_name, str):
        return None
    name = product_name.lower()
    
    if 'taśma' in name:
        return 'Taśma'
    if 'profil' in name:
        return 'Profil'
    if 'zasilacz' in name:
        return 'Zasilacz'
    if any(k in name for k in ['sterownik', 'pilot', 'czujnik', 'włącznik', 'moduł', 'kontroler', 'dimmer']):
        return 'Sterownik'
    return None

def main():
    print("🚀 Loading data...")
    # Load columns: 0: Year, 1: Quarter, 2: Handlowiec/Context, 3: Client, 4: Product, 5: Code, 6: Value
    df = pd.read_excel(FILE_PATH)
    
    # Rename columns for clarity
    df.columns = ['YearLevel', 'QuarterLevel', 'HandlowiecLevel', 'Client', 'Product', 'SKU', 'Value']
    
    print("⏳ Processing hierarchy...")
    # Hierarchical cleaning: propagation
    df['YearLevel'] = df['YearLevel'].ffill()
    df['QuarterLevel'] = df['QuarterLevel'].ffill()
    df['Client'] = df['Client'].ffill()
    
    # Clean rows: keep only product level data
    # Product and SKU should not be null
    main_df = df.dropna(subset=['Product', 'SKU']).copy()
    
    # Filter for last 365 days (approx by Quarters)
    # Today: 2026-03-02
    # Include Years 2025 (late) and 2026
    # Let's filter Quarters: 2025Q2, 2025Q3, 2025Q4, 2026Q1
    
    def is_last_year_proxy(row):
        q = str(row['QuarterLevel']).strip()
        y = str(row['YearLevel']).strip()
        if '2026' in y:
            return True
        if '2025' in y:
            # We want Q2, Q3, Q4 of 2025
            if any(k in q for k in ['Kwartał 2', 'Kwartał 3', 'Kwartał 4']):
                return True
        return False

    recent_df = main_df[main_df.apply(is_last_year_proxy, axis=1)].copy()
    print(f"📊 Recent records count: {len(recent_df)}")
    
    # Apply categorization
    recent_df['Category'] = recent_df['Product'].apply(categorize)
    
    # Filter to only the 4 target categories
    target_cats = ['Taśma', 'Zasilacz', 'Profil', 'Sterownik']
    final_df = recent_df[recent_df['Category'].isin(target_cats)].copy()
    
    # 1. Total revenue per category (last year context)
    cat_revenue = final_df.groupby('Category')['Value'].sum().sort_values(ascending=False)
    top_category = cat_revenue.index[0]
    top_revenue = cat_revenue.iloc[0]
    
    print("\n--- Summary Revenue (Last 365 days context) ---")
    print(cat_revenue.to_string())
    print(f"\nWinning Category: {top_category} with revenue: {top_revenue}")
    
    # 2. Client Matrix
    client_pivot = final_df.pivot_table(index='Client', columns='Category', values='Value', aggfunc='sum').fillna(0)
    
    # a) Clients 100% (buy all 4 categories)
    buy_all = client_pivot[(client_pivot > 0).all(axis=1)].index.tolist()
    
    # b) Cross-selling opportunity:
    # Buy other categories but NOT the Top category
    other_cats = [c for c in target_cats if c != top_category]
    gap_clients = client_pivot[
        (client_pivot[top_category] == 0) & 
        ((client_pivot[other_cats] > 0).any(axis=1))
    ].index.tolist()
    
    print(f"\n--- Analysis Results ---")
    print(f"Total 100% Clients (all 4 categories): {len(buy_all)}")
    print(f"Total GAP Clients (buy others but NOT {top_category}): {len(gap_clients)}")
    
    # Save results to a report file
    with open('/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot/sales_report_result.txt', 'w') as f:
        f.write(f"--- SALES ANALYSIS REPORT (from {datetime.datetime.now().strftime('%Y-%m-%d')}) ---\n\n")
        f.write(f"Objective 1: Categories Revenue (365 days back context):\n")
        f.write(cat_revenue.to_string() + "\n\n")
        f.write(f"Winning Category (Top Revenue): {top_category}\n\n")
        
        f.write(f"Objective 2: 100% Clients (buying Profil, Taśma, Zasilacz, Sterownik):\n")
        f.write(f"Count: {len(buy_all)}\n")
        f.write("Samples: " + ", ".join(buy_all[:20]) + ("..." if len(buy_all) > 20 else "") + "\n\n")
        
        f.write(f"Objective 3: CROSS-SELLING OPPORTUNITY (GAP CLIENTS)\n")
        f.write(f"Clients who buy other equipment but do NOT buy {top_category}:\n")
        f.write(f"Count: {len(gap_clients)}\n")
        f.write("Full List of GAP Clients:\n")
        for c in gap_clients:
            f.write(f"- {c}\n")

    print("\n✅ Report saved to Zadania-Prescot/sales_report_result.txt")

if __name__ == "__main__":
    main()
