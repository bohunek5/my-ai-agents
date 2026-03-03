import pandas as pd
import os
import datetime

# --- Configuration ---
FILE_PATH = '/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot/all2022-2026.xlsx'
DOWNLOADS_DIR = os.path.expanduser('~/Downloads')
OUTPUT_FILE = os.path.join(DOWNLOADS_DIR, f'EKSTRA_RAPORT_KLIENTOW_{datetime.date.today()}.xlsx')

def categorize(product_name):
    if not isinstance(product_name, str):
        return None
    name = product_name.lower()
    if 'taśma' in name: return 'Taśma'
    if 'profil' in name: return 'Profil'
    if 'zasilacz' in name: return 'Zasilacz'
    if any(k in name for k in ['sterownik', 'pilot', 'czujnik', 'włącznik', 'moduł', 'kontroler', 'dimmer']):
        return 'Sterownik'
    return None

def main():
    print("🚀 Preparing extra detailed report...")
    
    # 1. Loading data
    df = pd.read_excel(FILE_PATH)
    df.columns = ['YearLevel', 'QuarterLevel', 'Handlowiec', 'Client', 'Product', 'SKU', 'Value']
    
    # 2. Cleaning & Propagation
    df['YearLevel'] = df['YearLevel'].ffill()
    df['QuarterLevel'] = df['QuarterLevel'].ffill()
    df['Client'] = df['Client'].ffill()
    # Try to clean Handlowiec from "Razem" rows or propagate
    df['Handlowiec'] = df['Handlowiec'].astype(str).replace('nan', None)
    df['Handlowiec'] = df['Handlowiec'].ffill()
    
    # 3. Filter only product rows
    main_df = df.dropna(subset=['Product', 'SKU']).copy()
    
    # 4. Filter for recent period (Last 12 months context: 2025Q2 - 2026Q1)
    def is_recent(row):
        y = str(row['YearLevel'])
        q = str(row['QuarterLevel'])
        if '2026' in y: return True
        if '2025' in y and any(k in q for k in ['2', '3', '4']): return True
        return False
        
    recent_df = main_df[main_df.apply(is_recent, axis=1)].copy()
    recent_df['Category'] = recent_df['Product'].apply(categorize)
    
    target_cats = ['Taśma', 'Zasilacz', 'Profil', 'Sterownik']
    final_df = recent_df[recent_df['Category'].isin(target_cats)].copy()
    
    # Mapping Client to Handlowiec (take first/most frequent)
    # We'll use this later to re-add Handlowiec column after pivot
    client_handlowiec_map = final_df.groupby('Client')['Handlowiec'].first()

    # 5. Pivot Analysis
    client_pivot = final_df.pivot_table(index='Client', columns='Category', values='Value', aggfunc='sum').fillna(0)
    
    # Add Total column
    client_pivot['Suma_Razem'] = client_pivot.sum(axis=1)
    
    # Add Handlowiec column back
    client_pivot = client_pivot.join(client_handlowiec_map)
    
    # Reorder columns to have Handlowiec and Suma_Razem at the start/end
    cols_order = ['Handlowiec'] + target_cats + ['Suma_Razem']
    client_pivot = client_pivot[cols_order]

    # --- Segmentation ---
    # a) Clients 100% (buy all 4 categories)
    buy_all_mask = (client_pivot[target_cats] > 0).all(axis=1)
    df_100 = client_pivot[buy_all_mask].sort_values(by='Suma_Razem', ascending=False)
    
    # Add Total row for 100%
    if not df_100.empty:
        total_row = df_100[target_cats + ['Suma_Razem']].sum()
        df_100.loc['RAZEM / SUMA'] = total_row
        df_100.at['RAZEM / SUMA', 'Handlowiec'] = '---'

    # b) Gap Clients (Misses Top Category - Taśma)
    top_category = final_df.groupby('Category')['Value'].sum().idxmax()
    other_cats = [c for c in target_cats if c != top_category]
    gap_mask = (client_pivot[top_category] == 0) & ((client_pivot[other_cats] > 0).any(axis=1))
    df_gap = client_pivot[gap_mask].sort_values(by='Suma_Razem', ascending=False)
    
    # Add Total row for Gap
    if not df_gap.empty:
        total_row = df_gap[target_cats + ['Suma_Razem']].sum()
        df_gap.loc['RAZEM / SUMA'] = total_row
        df_gap.at['RAZEM / SUMA', 'Handlowiec'] = '---'

    # 6. Export to Excel
    print(f"📊 Generating Excel: {OUTPUT_FILE}")
    with pd.ExcelWriter(OUTPUT_FILE, engine='xlsxwriter') as writer:
        df_100.to_excel(writer, sheet_name='Klienci_KOMPLETNI_100')
        df_gap.to_excel(writer, sheet_name='OKAZJE_CROSS_SELL')
        
        # Add summary sheet
        summary = pd.DataFrame({
            "Metryka": ["Data Wygenerowania", "Analizowany Okres", "Najważniejszy Brak (GAP)", "Liczba Klientów 100%", "Liczba Klientów GAP"],
            "Wartość": [str(datetime.date.today()), "Q2/2025 - Q1/2026", top_category, len(df_100)-1 if not df_100.empty else 0, len(df_gap)-1 if not df_gap.empty else 0]
        })
        summary.to_excel(writer, sheet_name='PODSUMOWANIE', index=False)
        
        # Formatting
        workbook = writer.book
        money_format = workbook.add_format({'num_format': '#,##0.00'})
        header_format = workbook.add_format({'bold': True, 'bg_color': '#D7E4BC', 'border': 1})
        highlight = workbook.add_format({'bold': True, 'bg_color': '#FFEB9C'})

        for sheet_name in ['Klienci_KOMPLETNI_100', 'OKAZJE_CROSS_SELL']:
            ws = writer.sheets[sheet_name]
            ws.set_column('A:A', 40) # Client names
            ws.set_column('B:B', 20) # Handlowiec
            ws.set_column('C:G', 15, money_format) # Numbers
            
    print(f"✅ Finished! Check Downloads for: {os.path.basename(OUTPUT_FILE)}")

if __name__ == "__main__":
    main()
