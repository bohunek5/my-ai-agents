import pandas as pd
import os
import datetime

# --- Configuration ---
FILE_PATH = '/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot/all2022-2026.xlsx'
DOWNLOADS_DIR = os.path.expanduser('~/Downloads')
OUTPUT_FILE = os.path.join(DOWNLOADS_DIR, f'RAPORT_SPRZEDAZY_SEGMENTACJA_{datetime.date.today()}.xlsx')

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
    print("🚀 Preparing complex report...")
    
    # 1. Loading data
    df = pd.read_excel(FILE_PATH)
    df.columns = ['YearLevel', 'QuarterLevel', 'HandlowiecLevel', 'Client', 'Product', 'SKU', 'Value']
    
    # 2. Cleaning & Propagation
    df['YearLevel'] = df['YearLevel'].ffill()
    df['QuarterLevel'] = df['QuarterLevel'].ffill()
    df['Client'] = df['Client'].ffill()
    
    # 3. Filter only product rows
    main_df = df.dropna(subset=['Product', 'SKU']).copy()
    
    # 4. Define 'Last Year' context based on current data
    # Context: 2025Q2, Q3, Q4 and 2026Q1
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
    
    # 5. Analysis
    cat_revenue = final_df.groupby('Category')['Value'].sum().sort_values(ascending=False).reset_index()
    top_category = cat_revenue.iloc[0]['Category']
    
    # Client Matrix
    client_pivot = final_df.pivot_table(index='Client', columns='Category', values='Value', aggfunc='sum').fillna(0)
    
    # a) Clients 100%
    buy_all_mask = (client_pivot > 0).all(axis=1)
    df_100_percent = client_pivot[buy_all_mask].reset_index()
    
    # b) Gap Clients (Misses Top Category)
    other_cats = [c for c in target_cats if c != top_category]
    gap_mask = (client_pivot[top_category] == 0) & ((client_pivot[other_cats] > 0).any(axis=1))
    df_gap = client_pivot[gap_mask].reset_index()
    
    # 6. Export to Excel with multiple sheets
    print(f"📊 Creating Excel file: {OUTPUT_FILE}")
    with pd.ExcelWriter(OUTPUT_FILE, engine='xlsxwriter') as writer:
        # Sheet 1: Summary
        summary_text = pd.DataFrame({
            "Metryka": ["Data Raportu", "Analizowany Okres", "Najważniejsza Kategoria (TOP)", "Liczba Klientów 100%", "Liczba Klientów do Cross-sell"],
            "Wartość": [
                str(datetime.date.today()), 
                "Ostatni Pełny Rok (Q2/2025 - Q1/2026)", 
                top_category, 
                len(df_100_percent), 
                len(df_gap)
            ]
        })
        summary_text.to_excel(writer, sheet_name='PODSUMOWANIE', index=False)
        cat_revenue.to_excel(writer, sheet_name='PODSUMOWANIE', startrow=7, index=False)
        
        # Sheet 2: 100% Clients
        df_100_percent.to_excel(writer, sheet_name='KLIENCI_100_PROCENT', index=False)
        
        # Sheet 3: Cross Sell Gap
        df_gap.to_excel(writer, sheet_name='CROSS_SELL_DO_ZROBIENIA', index=False)
        
        # Apply formatting
        workbook = writer.book
        header_format = workbook.add_format({'bold': True, 'bg_color': '#D7E4BC', 'border': 1})
        for sheet in writer.sheets.values():
            sheet.set_column('A:Z', 25)
            
    print("✅ Excel report is ready in Downloads!")

if __name__ == "__main__":
    main()
