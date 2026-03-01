import pandas as pd
import numpy as np
import os
import re
from datetime import datetime

class PrescotSalesIntelligence:
    def __init__(self):
        self.categories = {
            "Taśma LED": ["taśma", "tasma", "strip", "led strip", "cob", "s-shape", "rgb", "cct", "tasma led", "taśma led"],
            "Zasilacz do LED": ["zasilacz", "driver", "power supply", "psu", "transformator", "przetwornica"],
            "Profile LED": ["profil", "alu", "aluminium", "klosz", "zaślepka", "uchwyt", "prescot alu", "profil led"],
            "Sterownik LED": ["sterownik", "pilot", "odbiornik", "kontroler", "controller", "miboxer", "milight", "rf", "zigbee", "dali", "0-10v"]
        }
        self.priority = ["Sterownik LED", "Zasilacz do LED", "Profile LED", "Taśma LED"]
        self.columns_map = {
            'date': ['data', 'data sprzedaży', 'date', 'sales date', 'data_sprzedazy'],
            'sales_rep': ['handlowiec', 'salesrep', 'rep', 'sales person', 'sprzedawca'],
            'customer': ['klient', 'customer', 'nabywca', 'kontrahent', 'firma'],
            'product': ['produkt', 'product', 'nazwa produktu', 'index', 'sku', 'artykul'],
            'quantity': ['ilość', 'ilosc', 'quantity', 'qty', 'wolumen'],
            'value': ['wartość', 'wartosc', 'netvalue', 'value', 'kwota net', 'brutto']
        }

    def clean_headers(self, df):
        """Normalizacja nagłówków."""
        df.columns = [str(c).lower().strip() for c in df.columns]
        # Mapowanie kolumn
        final_map = {}
        for target, aliases in self.columns_map.items():
            for alias in aliases:
                if alias in df.columns:
                    final_map[alias] = target
                    break
        df = df.rename(columns=final_map)
        return df

    def categorize_product(self, product_name):
        """Dynamiczna kategoryzacja z priorytetami."""
        if pd.isna(product_name):
            return "Inne", "LOW", "missing name"
        
        name_lower = str(product_name).lower()
        
        # Sprawdzanie priorytetowe
        for category in self.priority:
            keywords = self.categories[category]
            if any(re.search(rf"\b{re.escape(kw)}", name_lower) for kw in keywords):
                return category, "HIGH", f"keyword: {keywords[0]}"
        
        # Fuzzy check (zawiera słowo)
        for category, keywords in self.categories.items():
            if any(kw in name_lower for kw in keywords):
                return category, "MED", f"contains: {keywords[0]}"
                
        return "Inne", "LOW", "no match"

    def process_data(self, file_path):
        """Główny proces BI."""
        if not os.path.exists(file_path):
            return f"Błąd: Plik {file_path} nie istnieje."

        # Wczytywanie (obsługa różnych formatów)
        ext = os.path.splitext(file_path)[1].lower()
        if ext == '.csv':
            df = pd.read_csv(file_path)
        elif ext in ['.xlsx', '.xls']:
            df = pd.read_excel(file_path)
        else:
            return "Nieobsługiwany format pliku."

        df = self.clean_headers(df)
        
        # Sprawdzanie wymaganych pól
        required = ['customer', 'product', 'sales_rep']
        missing = [r for r in required if r not in df.columns]
        if missing:
            return f"Brak krytycznych kolumn: {missing}"

        # Normalizacja dat
        if 'date' in df.columns:
            df['date'] = pd.to_datetime(df['date'], errors='coerce')
            df['year'] = df['date'].dt.year
            df['quarter'] = df['date'].dt.quarter
        
        # Forward fill
        df = df.ffill()

        # Kategoryzacja
        df[['CategoryMain', 'CategoryConfidence', 'CategoryReason']] = df['product'].apply(
            lambda x: pd.Series(self.categorize_product(x))
        )

        # Analiza
        return self.generate_intelligence_report(df)

    def generate_intelligence_report(self, df):
        """Generowanie modułów analitycznych i planu rotacji."""
        report = []
        
        # 1. Wykryci handlowcy
        reps = df['sales_rep'].unique()
        report.append(f"Otrzymałem dane. Wykryłem handlowców: {', '.join(reps)}")
        report.append("Rozpoczynam analizę BI (Cross-sell, Churn, Rotation)...\n")

        # Określenie okresów
        max_year = df['year'].max()
        
        # Moduł A: Cross-selling (Podstawa pod wytyczne)
        report.append("### MODUŁ A: CROSS-SELLING (Quick Wins)")
        for rep in reps:
            rep_df = df[df['sales_rep'] == rep]
            cust_matrix = rep_df.pivot_table(index='customer', columns='CategoryMain', values='product', aggfunc='count').fillna(0)
            
            led_cats = ["Taśma LED", "Zasilacz do LED", "Profile LED", "Sterownik LED"]
            found_cats = [c for c in led_cats if c in cust_matrix.columns]
            
            cust_matrix['count_bought'] = (cust_matrix[found_cats] > 0).sum(axis=1)
            quick_wins = cust_matrix[cust_matrix['count_bought'] >= 2] # Szerszy zakres dla rotacji
            
            report.append(f"\nHandlowiec: {rep}")
            for customer, row in quick_wins.head(20).iterrows():
                missing = [c for c in led_cats if c in cust_matrix.columns and row[c] == 0]
                if missing:
                    report.append(f"- KLIENT: {customer} -> BRAK: {', '.join(missing)}")

        return "\n".join(report)

    def generate_weekly_rotation(self, all_leads, used_ids_path):
        """
        Generuje plan na 7 dni (Pn-Nd) z rotacją 150 firm bez powtórzeń.
        """
        import json
        
        # Wczytaj historię użytych ID
        used_ids = []
        if os.path.exists(used_ids_path):
            with open(used_ids_path, 'r') as f:
                used_ids = json.load(f)
        
        # Filtruj dostępne leady (te których nie ma w historii)
        available_leads = [l for l in all_leads if l['id'] not in used_ids]
        
        # Jeśli skończyły się leady, zresetuj rotację
        if len(available_leads) < 21: # 7 dni * 3 firmy
            used_ids = []
            available_leads = all_leads
            print("INFO: Reset rotacji - wszystkie firmy zostały wykorzystane.")

        # Wybierz firmy do planu (3 dziennie * 7 dni = 21 firm)
        # Sortujemy po potencjale (uproszczone: te z dłuższą historią/starsze)
        plan_leads = available_leads[:21]
        newly_used = [l['id'] for l in plan_leads]
        
        # Zapisz nową historię
        with open(used_ids_path, 'w') as f:
            json.dump(used_ids + newly_used, f)
            
        # Rozdziel na dni
        days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
        final_plan = {}
        for i, day in enumerate(days):
            day_leads = plan_leads[i*3:(i+1)*3]
            final_plan[day] = [l['id'] for l in day_leads]
            
        return final_plan

        return "\n".join(report)

if __name__ == "__main__":
    # Testowy runner
    intel = PrescotSalesIntelligence()
    # print(intel.process_data("path_to_file.xlsx"))
    print("Agent Intelligence Mastermind (LED BI) jest gotowy do pracy.")
