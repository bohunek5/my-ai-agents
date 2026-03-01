import pandas as pd
import numpy as np
import re
import os
import json
import sys
from datetime import datetime

# Prescot BI Analyzer Engine v1.0
# "Ollama First" Strategy Integrated

class PrescotBIAnalyzer:
    def __init__(self, data_path, output_format='markdown'):
        self.data_path = data_path
        self.output_format = output_format
        self.df = None
        self.report = []
        
        # Core Categories & Keywords
        self.categories = {
            'Sterownik LED': ['sterownik', 'pilot', 'odbiornik', 'kontroler', 'controller', 'miboxer', 'milight', 'rf', 'zigbee', 'dali', '0-10v'],
            'Zasilacz do LED': ['zasilacz', 'driver', 'power supply', 'psu', 'transformator', 'przetwornica'],
            'Profile LED': ['profil', 'alu', 'aluminium', 'klosz', 'zaślepka', 'uchwyt', 'klus', 'kluś'],
            'Taśma LED': ['taśma', 'tasma', 'strip', 'led strip', 'cob', 's-shape', 'rgb', 'cct']
        }
        # Rule: Sterownik > Zasilacz > Profil > Taśma
        self.category_priority = ['Sterownik LED', 'Zasilacz do LED', 'Profile LED', 'Taśma LED']
        
        # Custom Exceptions (Pre-populated based on known Prescot brands)
        self.exceptions = {
            'MiBoxer': 'Sterownik LED',
            'MiLight': 'Sterownik LED',
            'Scharfer': 'Zasilacz do LED',
            'Kluś': 'Profile LED',
            'Klus': 'Profile LED'
        }

    def log(self, message):
        print(f"[BI-AGENT] {message}")

    def normalize_column_names(self, columns):
        # Mapping rules with priority (Ordered dict logic)
        mapping_rules = {
            'ProductName': r'(produkt|product|indeks|index|sku|towar)',
            'date': r'(data|date|czas|moment|confirm)',
            'SalesRep': r'(handlowiec|salesrep|rep|osoba|pracownik|seller|^name$|nazwa handlowca)',
            'Customer': r'(klient|customer|kontrahent|odbiorca|firma|company)',
            'NetValue': r'(warto|netto|value|cena|price|net_value|total|sum)',
            'Quantity': r'(ilo|qty|amount|szt|quantity)',
            'year': r'(rok|year|year_)',
            'quarter': r'(kwarta|quarter|q_|kw_)'
        }
        
        normalized = []
        counts = {}
        for col in columns:
            c_low = str(col).lower().strip()
            # remove polish chars
            c_clean = c_low.replace('ą','a').replace('ć','c').replace('ę','e').replace('ł','l').replace('ń','n').replace('ó','o').replace('ś','s').replace('ź','z').replace('ż','z')
            
            target = col
            for t, pattern in mapping_rules.items():
                if re.search(pattern, c_clean):
                    target = t
                    break
            
            # Ensure unique names globally to avoid "duplicate keys" in pd operations
            # We use a clean target for the key
            clean_target = str(target)
            if clean_target in counts:
                counts[clean_target] += 1
                normalized.append(f"{clean_target}_{counts[clean_target]}")
            else:
                counts[clean_target] = 0
                normalized.append(clean_target)
                
        return normalized

    def load_data(self):
        ext = os.path.splitext(self.data_path)[1].lower()
        try:
            if ext == '.csv':
                # Try common delimiters
                for sep in [';', ',', '\t']:
                    try:
                        # low_memory=False to handle wide files and mixed types
                        self.df = pd.read_csv(self.data_path, sep=sep, low_memory=False)
                        if len(self.df.columns) > 1: break
                    except: continue
            elif ext in ['.xlsx', '.xls']:
                # Strategy for Excel: try sheets until we find data
                xl = pd.ExcelFile(self.data_path)
                sheets = xl.sheet_names
                for sheet in sheets:
                    temp_df = pd.read_excel(xl, sheet_name=sheet)
                    if not temp_df.empty and len(temp_df.columns) > 1:
                        self.df = temp_df
                        self.log(f"Załadowano dane z arkusza: {sheet}")
                        break
                if self.df is None: self.df = pd.read_excel(self.data_path) # Fallback
            else:
                raise ValueError(f"Unsupported format: {ext}")
            
            # Basic cleaning
            self.df.columns = self.normalize_column_names(self.df.columns)
            self.log(f"Wykryte kolumny: {list(self.df.columns)}")
            
            # Date handling & Year/Quarter Creation
            # Safety: specify column exactly to avoid "duplicate keys" if multiple columns named 'date' existed
            if 'date' in self.df.columns:
                date_data = self.df['date']
                if isinstance(date_data, pd.DataFrame): date_data = date_data.iloc[:, 0]
                self.df['date'] = pd.to_datetime(date_data, errors='coerce')
                
                # Create year/quarter if missing
                if 'year' not in self.df.columns: self.df['year'] = self.df['date'].dt.year
                if 'quarter' not in self.df.columns: self.df['quarter'] = self.df['date'].dt.quarter
            
            # Ensure critical columns exist (even if empty) to prevent crashes
            for col in ['year', 'quarter', 'SalesRep', 'Customer', 'ProductName', 'NetValue', 'Quantity']:
                if col not in self.df.columns:
                    self.df[col] = np.nan

            # Vectorized cleaning: convert numeric columns
            for col in ['year', 'quarter', 'NetValue', 'Quantity']:
                self.df[col] = pd.to_numeric(self.df[col], errors='coerce')

            # Forward fill for hierarchical data (only if we have meaningful rows)
            if not self.df.empty:
                for col in ['year', 'quarter', 'SalesRep', 'Customer']:
                    self.df[col] = self.df[col].ffill()
            
            # Final cleaning: Drop rows where all critical info is missing
            self.df = self.df.dropna(subset=['ProductName', 'Customer'], how='all')
            self.log(f"Załadowano {len(self.df)} wierszy.")
            return not self.df.empty
        except Exception as e:
            self.log(f"Błąd ładowania: {e}")
            import traceback
            traceback.print_exc()
            return False

    def categorize(self, row):
        name = str(row['ProductName']).lower()
        
        # Check exceptions first
        for brand, cat in self.exceptions.items():
            if brand.lower() in name:
                return cat, 'HIGH', f"exception: {brand}"
        
        # Priority keywords
        for cat in self.category_priority:
            keywords = self.categories[cat]
            if any(k in name for k in keywords):
                return cat, 'HIGH', f"keyword: {keywords[0]}"
        
        return 'Inne', 'LOW', 'no match'

    def run_analysis(self):
        if self.df is None or self.df.empty:
            self.log("Brak danych do analizy (tabela jest pusta).")
            return {}

        self.log("Rozpoczynam kategoryzację produktów...")
        
        # Wide Format Fix: Gather all columns that were categorized as ProductName
        product_cols = [c for c in self.df.columns if str(c).startswith('ProductName')]
        self.log(f"Wykryte kolumny produktów: {len(product_cols)}")

        # Create a simplified internal DF for analysis
        # If multiple product columns exist, we essentially "melt" them or use them to enrich the main record
        # For Prescot BI, if multiple columns contain products in one row, the customer bought them all in one order.
        
        def consolidate_categories(row):
            cats_found = []
            for col in product_cols:
                name = str(row[col]).lower()
                if not name or name == 'nan': continue
                cat, conf, reason = self.categorize({'ProductName': name})
                if cat != 'Inne':
                    cats_found.append((cat, conf, reason))
            
            if not cats_found:
                return 'Inne', 'LOW', 'no match'
            # Return the highest priority category found in the row
            for priority_cat in self.category_priority:
                for cat, conf, reason in cats_found:
                    if cat == priority_cat:
                        return cat, conf, reason
            return cats_found[0]

        res = self.df.apply(consolidate_categories, axis=1, result_type='expand')
        self.df['CategoryMain'] = res[0]
        self.df['CategoryConfidence'] = res[1]
        self.df['CategoryReason'] = res[2]

        # Determine limits
        max_year = self.df['year'].max()
        if pd.isna(max_year): max_year = datetime.now().year
        
        max_q_df = self.df[self.df['year'] == max_year]
        max_q = max_q_df['quarter'].max() if not max_q_df.empty else 1
        if pd.isna(max_q): max_q = 1
        
        self.log(f"Ostatni punkt danych: {max_year} Q{max_q}")

        # Metrics
        reps = self.df['SalesRep'].unique()
        # Filter out NaNs from reps to avoid empty slices crashing sort
        reps = [r for r in reps if pd.notna(r)]
        if not reps:
            reps = ['Nieznany']
            self.df['SalesRep'] = 'Nieznany'

        full_report = {}

        for rep in reps:
            rep_df = self.df[self.df['SalesRep'] == rep]
            if rep_df.empty: continue
            
            rep_report = {
                'QuickWins': self._module_cross_sell(rep_df),
                'Churn': self._module_churn(rep_df, max_year, max_q),
                'Drops': self._module_drops(rep_df, max_year, max_q),
                'Leaders': self._module_retention(rep_df)
            }
            full_report[rep] = rep_report

        return full_report

    def _module_cross_sell(self, df):
        # Matrix of gaps
        matrix = df.groupby(['Customer', 'CategoryMain']).size().unstack(fill_value=0)
        target_cats = ['Taśma LED', 'Zasilacz do LED', 'Profile LED', 'Sterownik LED']
        # Filter only main categories
        matrix = matrix.reindex(columns=target_cats, fill_value=0)
        
        # Count bought categories
        matrix['BoughtCount'] = (matrix[target_cats] > 0).sum(axis=1)
        
        # Quick Wins: 3/4 bought
        wins = matrix[matrix['BoughtCount'] == 3].copy()
        result = []
        for customer, row in wins.iterrows():
            missing = [c for c in target_cats if row[c] == 0][0]
            # Get volume/value for this customer
            cust_data = df[df['Customer'] == customer]
            total_val = cust_data['NetValue'].sum() if 'NetValue' in df.columns else 0
            
            # Simple suggestion logic
            suggestion = f"Brakuje: {missing}. "
            if missing == 'Zasilacz do LED': suggestion += "Proponuj zasilacze Scharfer pod moc taśm."
            elif missing == 'Sterownik LED': suggestion += "Proponuj systemy MiBoxer do komfortu sterowania."
            elif missing == 'Profile LED': suggestion += "Dobierz profile Kluś dla estetyki montażu."
            elif missing == 'Taśma LED': suggestion += "Dosprzedaj taśmy o wysokim CRI."

            result.append({
                'Customer': customer,
                'Missing': missing,
                'Value': total_val,
                'Suggestion': suggestion
            })
        
        return sorted(result, key=lambda x: x['Value'], reverse=True)[:30]

    def _module_churn(self, df, max_year, max_q):
        if df.empty: return {}
        
        # Active in first 2 years, inactive in last 2 quarters
        # Group by customer and calculate stats
        # We handle missing columns by ensuring they are in df via load_data
        
        try:
            customers = df.groupby('Customer').agg(
                first_year=('year', 'min'),
                last_year=('year', 'max'),
                last_q=('quarter', lambda x: x[df.loc[x.index, 'year'] == df.loc[x.index, 'year'].max()].max()),
                total_val=('NetValue', 'sum') if 'NetValue' in df.columns else ('ProductName', 'count'),
                main_cat=('CategoryMain', lambda x: x.value_counts().index[0] if not x.empty else 'Inne')
            )
        except Exception as e:
            self.log(f"Błąd agregacji churn: {e}")
            return {}

        if customers.empty: return {}
        
        # Ensure total_val exists (fallback if agg failed to name it)
        if 'total_val' not in customers.columns:
            customers['total_val'] = 0

        # Definition: 
        # 1. Was active before last year
        # 2. Not active in (max_year, max_q) and not active in (max_year, max_q-1)
        
        def is_recent(row, my, mq):
            if pd.isna(row['last_year']): return False
            if row['last_year'] < my:
                # If last activity was before current year, it's churn if gap is large
                if my - row['last_year'] > 1: return False
                # If last year, but Q4 and current is Q1 -> recent
                if mq <= 1 and row['last_q'] >= 3: return True
                return False
            if row['last_year'] == my:
                if row['last_q'] >= mq - 1: return True
            return False

        churn = customers[~customers.apply(lambda r: is_recent(r, max_year, max_q), axis=1)]
        
        # Safe sort
        if 'total_val' in churn.columns:
            churn = churn.sort_values(by='total_val', ascending=False)
        
        return churn.head(20).to_dict('index')

    def _module_drops(self, df, max_year, max_q):
        # LED Strips only by default
        strips = df[df['CategoryMain'] == 'Taśma LED']
        if strips.empty: return []
        
        yearly = strips.groupby(['Customer', 'year'])['NetValue' if 'NetValue' in df.columns else 'Quantity'].sum().unstack(fill_value=0)
        
        results = []
        for customer, row in yearly.iterrows():
            last_year_val = row.get(max_year, 0)
            best_year_val = row.max()
            if best_year_val > 0:
                drop_pct = (best_year_val - last_year_val) / best_year_val
                if drop_pct > 0.30 and last_year_val > 0: # Still active but dropped
                    results.append({
                        'Customer': customer,
                        'Drop': drop_pct,
                        'Peak': best_year_val,
                        'Current': last_year_val
                    })
        return sorted(results, key=lambda x: x['Drop'], reverse=True)[:15]

    def _module_retention(self, df):
        if df.empty: return {}
        
        # Continuity check: count consecutive quarters of activity
        def count_consecutive(group):
            try:
                # Vectorized numeric calculation: year*4 + quarter
                # Ensure they are numeric
                y = pd.to_numeric(group['year'], errors='coerce')
                q = pd.to_numeric(group['quarter'], errors='coerce')
                
                # Combine and get unique sorted quarters
                qs = sorted((y * 4 + q).dropna().unique())
                
                if not qs: return 0
                count = 1
                max_count = 1
                for i in range(len(qs)-1):
                    if qs[i+1] == qs[i] + 1:
                        count += 1
                    else:
                        max_count = max(max_count, count)
                        count = 1
                return max(max_count, count)
            except:
                return 0

        try:
            # Avoid apply if possible, or ensure result is Series
            # include_groups=False is for newer pandas
            leaders = df.groupby('Customer').apply(count_consecutive)
            
            # If leaders is a DataFrame (unlikely but safe check)
            if isinstance(leaders, pd.DataFrame):
                leaders = leaders.iloc[:, 0]
            
            # Clean and filter
            leaders = leaders[pd.to_numeric(leaders, errors='coerce').fillna(0) >= 4]
            return leaders.sort_values(ascending=False).to_dict()
        except Exception as e:
            self.log(f"Błąd w module retention: {e}")
            return {}

    def generate_markdown(self, report_data):
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        md = f"# 📊 Raport Analityczny Prescot BI\n"
        md += f"*Wygenerowano: {now} | Strategia: Ollama First*\n\n"
        
        for rep, data in report_data.items():
            md += f"## 👤 Handlowiec: {rep}\n"
            
            # Quick Wins
            md += "### 🎯 TOP 30 Quick Wins (Cross-sell)\n"
            if data['QuickWins']:
                md += "| Klient | Brakująca Kategoria | Sugestia Działania |\n"
                md += "| :--- | :--- | :--- |\n"
                for win in data['QuickWins']:
                    md += f"| **{win['Customer']}** | {win['Missing']} | {win['Suggestion']} |\n"
            else:
                md += "_Brak klientów spełniających kryteria 3/4._\n"
            
            # Churn
            md += "\n### ⚠️ Alarm: Utraceni Klienci (Churn)\n"
            if data['Churn']:
                md += "| Klient | Ostatni Zakup | Dominuje | Status |\n"
                md += "| :--- | :--- | :--- | :--- |\n"
                for cust, details in data['Churn'].items():
                    status = "🔥🔥 HIGH VALUE" if 'total_val' in details and details['total_val'] > 0 else "Normal"
                    md += f"| {cust} | {details['last_year']} Q{details['last_q']} | {details['main_cat']} | {status} |\n"
            else:
                md += "_Brak utraconych klientów w tym segmencie._\n"
            
            # Drops
            md += "\n### 📉 Duże Spadki (Taśma LED)\n"
            if data['Drops']:
                md += "| Klient | Spadek | Peak | Obecnie |\n"
                md += "| :--- | :--- | :--- | :--- |\n"
                for d in data['Drops']:
                    md += f"| {d['Customer']} | -{d['Drop']:.1%} | {d['Peak']:.0f} | {d['Current']:.0f} |\n"
            else:
                md += "_Brak znaczących spadków w kategorii Taśmy LED._\n"

            # Leaders
            md += "\n### 🏆 Klienccy Liderzy (Systematyczni)\n"
            if data['Leaders']:
                md += "| Klient | Ciągłość (Q) | Rekomendacja |\n"
                md += "| :--- | :--- | :--- |\n"
                for cust, q_count in data['Leaders'].items():
                    md += f"| {cust} | {q_count} kwartały | Utrzymać i dosprzedać (Cross-sell) |\n"
            
            md += "\n---\n"
        
        return md

    def generate_html(self, report_data):
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        html = f"""
        <!DOCTYPE html>
        <html lang="pl">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Prescot BI - Offline Dashboard</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
            <style>
                :root {{
                    --bg: #0f172a;
                    --card: #1e293b;
                    --text: #f8fafc;
                    --accent: #38bdf8;
                    --win: #22c55e;
                    --warn: #eab308;
                    --alert: #ef4444;
                }}
                body {{ font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }}
                .container {{ max-width: 1200px; margin: 0 auto; }}
                header {{ display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--card); padding-bottom: 20px; margin-bottom: 30px; }}
                h1 {{ margin: 0; color: var(--accent); font-weight: 800; }}
                .rep-section {{ background: var(--card); padding: 20px; border-radius: 12px; margin-bottom: 40px; border-left: 5px solid var(--accent); }}
                .grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }}
                @media (max-width: 768px) {{ .grid {{ grid-template-columns: 1fr; }} }}
                table {{ width: 100%; border-collapse: collapse; margin-top: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; overflow: hidden; }}
                th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); }}
                th {{ background: rgba(255,255,255,0.05); color: var(--accent); text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }}
                .badge {{ padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }}
                .badge-win {{ background: var(--win); color: white; }}
                .badge-warn {{ background: var(--warn); color: black; }}
                .badge-alert {{ background: var(--alert); color: white; }}
                .suggestion {{ font-size: 13px; color: #94a3b8; font-style: italic; }}
                .metric {{ font-weight: bold; color: var(--accent); }}
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h1>📊 PRESCOT BI <span style="font-weight: 300; font-size: 0.5em; opacity: 0.7;">OFFLINE DASHBOARD</span></h1>
                    <div style="text-align: right;">
                        <div style="font-size: 14px; opacity: 0.8;">Ostatnia aktualizacja: {now}</div>
                        <div style="font-size: 12px; color: var(--win);">● Tryb Lokalny (No Internet)</div>
                    </div>
                </header>
        """
        
        for rep, data in report_data.items():
            html += f"""
            <div class="rep-section">
                <h2 style="margin-top: 0;">👤 Handlowiec: {rep}</h2>
                <div class="grid">
                    <div>
                        <h3>🎯 Quick Wins (Cross-sell)</h3>
                        <table>
                            <thead><tr><th>Klient</th><th>Brakuje</th><th>Działanie</th></tr></thead>
                            <tbody>"""
            for win in data['QuickWins']:
                html += f"<tr><td><b>{win['Customer']}</b></td><td><span class='badge badge-win'>{win['Missing']}</span></td><td class='suggestion'>{win['Suggestion']}</td></tr>"
            
            html += """</tbody></table></div>
                    <div>
                        <h3>⚠️ Alarmy Churn & Spadki</h3>
                        <table>
                            <thead><tr><th>Klient</th><th>Problem</th><th>Status</th></tr></thead>
                            <tbody>"""
            for cust, details in data['Churn'].items():
                html += f"<tr><td>{cust}</td><td>Utrata (od {details['last_year']})</td><td><span class='badge badge-alert'>CHURN</span></td></tr>"
            for d in data['Drops']:
                html += f"<tr><td>{d['Customer']}</td><td>Spadek {d['Drop']:.0%}</td><td><span class='badge badge-warn'>REGRESJA</span></td></tr>"
            
            html += """</tbody></table></div></div>
                <div>
                   <h3>🏆 Systematyczni Liderzy</h3>
                   <div style="display: flex; gap: 10px; flex-wrap: wrap;">"""
            for cust, q_count in data['Leaders'].items():
                html += f"<div style='background: rgba(255,255,255,0.05); padding: 5px 10px; border-radius: 20px; font-size: 12px;'>{cust} <span class='metric'>({q_count}Q)</span></div>"
            
            html += """</div></div></div>"""
            
        html += """</div></body></html>"""
        return html

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Prescot BI Analyzer")
    parser.add_argument("paths", nargs="+", help="Ścieżki do plików danych")
    parser.add_argument("--json-output", help="Opcjonalna ścieżka do zapisu danych w formacie JSON dla portalu")
    
    args = parser.parse_args()
    
    # Common analyzer instance for the first path (or we could loop if needed)
    # For now, we use the first path to initialize, then process others if analyzer supports it.
    # Our analyzer v1.0 handles one path in __init__.
    
    success_count = 0
    all_data = []
    
    for path in args.paths:
        analyzer = PrescotBIAnalyzer(path)
        if analyzer.load_data():
            report = analyzer.run_analysis()
            if report:
                success_count += 1
                # If we want to export JSON for the portal, we need the raw DF or processed rows
                if args.json_output:
                    # Map back to portal format
                    # interface Sale { year, quarter, rep, company, product, sku, quantity, price, value }
                    temp_df = analyzer.df.copy()
                    # Keep only rows with relevant data
                    portal_df = temp_df[['year', 'quarter', 'SalesRep', 'Customer', 'ProductName', 'Quantity', 'NetValue']].copy()
                    portal_df.columns = ['year', 'quarter', 'rep', 'company', 'product', 'quantity', 'value']
                    portal_df['sku'] = portal_df['product'] # Placeholder or extract if possible
                    portal_df['price'] = portal_df['value'] / portal_df['quantity']
                    all_data.extend(portal_df.to_dict('records'))
            
            # Save standard reports for the FIRST file for backward compatibility
            if success_count == 1:
                md_output = analyzer.generate_markdown(report)
                with open("last_report.md", "w", encoding="utf-8") as f: f.write(md_output)
                html_output = analyzer.generate_html(report)
                with open("bi_dashboard.html", "w", encoding="utf-8") as f: f.write(html_output)

    if args.json_output and all_data:
        with open(args.json_output, "w", encoding="utf-8") as f:
            json.dump(all_data, f, ensure_ascii=False, indent=2)
        print(f"[SUKCES] Dane JSON dla portalu zapisane w: {args.json_output}")

    if success_count > 0:
        print(f"\n[SUKCES] Przetworzono {success_count} plików.")
        sys.exit(0)
    else:
        print("❌ Nie udało się załadować żadnego pliku danych.")
        sys.exit(1)
