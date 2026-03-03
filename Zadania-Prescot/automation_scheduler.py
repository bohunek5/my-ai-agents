
import json
import os
import time
import subprocess
import urllib.parse

def send_html_email_via_mac_file(subject, body_html, recipient):
    # Save HTML to a temporary file to avoid shell escaping issues
    temp_html_path = "/tmp/prescot_mail.html"
    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(body_html)
    
    # AppleScript reads the file directly using 'read' command
    apple_script = f'''
    set theHTML to read POSIX file "{temp_html_path}" as «class utf8»
    tell application "Mail"
        set newMessage to make new outgoing message with properties {{subject:"{subject}", visible:false}}
        tell newMessage
            make new to recipient with properties {{address:"{recipient}"}}
            set html content to theHTML
            send
        end tell
    end tell
    '''
    
    script_path = "/tmp/send_mail_robust.scpt"
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(apple_script)
        
    subprocess.run(['osascript', script_path])

def get_google_maps_link(company, city=""):
    query = f"{company} {city}".strip()
    return f"https://www.google.com/maps/search/{urllib.parse.quote(query)}"

def generate_pro_html(rep, day_key, day_data, clients_detailed, new_leads):
    rep_first_name = rep.split()[0]
    day_num = int(day_key.replace("day", ""))
    rep_idx = ["Dariusz Nita", "Anna Galor", "Anna Asztemborska", "Adam Garbowski", "Iwona Baczewska"].index(rep)
    
    greeting = f"Witaj <strong>{rep_first_name}</strong>. Poniżej konkretny plan operacyjny na dziś."
    if day_num > 1:
        greeting = f"Cześć <strong>{rep_first_name}</strong>. Jak Ci poszedł plan z poprzedniego dnia? Na dziś mamy kolejną listę celów:"

    comp_names = list(clients_detailed.keys())
    start_idx = (day_num * 3 + rep_idx * 7) % len(comp_names) if comp_names else 0
    my_clients = [comp_names[(start_idx + i) % len(comp_names)] for i in range(3)] if comp_names else []
    
    lead_start = (day_num * 2 + rep_idx * 11) % len(new_leads)
    active_leads = [new_leads[lead_start], new_leads[(lead_start + 1) % len(new_leads)]]

    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 0;">
        <div style="background: #000; color: #ffa500; padding: 30px; text-align: left; border-bottom: 5px solid #ffa500;">
            <h1 style="margin: 0; font-size: 26px; font-weight: 800;">PLAN OPERACYJNY: {rep.upper()}</h1>
            <p style="margin: 5px 0 0; color: #fff; font-size: 16px; text-transform: uppercase;">DZIEŃ {day_num} | {day_data['title'].upper()}</p>
        </div>
        
        <div style="padding: 25px;">
            <p style="font-size: 18px;">{greeting}</p>
            <p>Twój główny cel: <strong style="color: #d35400;">{day_data['task']}</strong></p>
            
            <h2 style="color: #000; background: #eee; padding: 12px; margin-top: 30px; border-left: 6px solid #ffa500;">I. STATYSTYKA I DOSPRZEDAŻ (3 FIRMY)</h2>
    """
    
    for c_name in my_clients:
        c_info = clients_detailed.get(c_name, {})
        prods = c_info.get("products", [])
        maps_url = get_google_maps_link(c_name)
        hist_str = " • ".join(prods) if prods else "Różne grupy produktowe"
        missing = "zasilacze Scharfer 7Y"
        if any("zasilacz" in p.lower() for p in prods): missing = "profile LED Kluś / Taśmy Premium"

        html += f"""
            <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #eee; background: #fafafa;">
                <h3 style="margin: 0; font-size: 20px;">{c_name} <a href="{maps_url}" style="font-size: 13px; color: #007bff;">[MAPA 📍]</a></h3>
                <p style="font-size: 13px; color: #666; margin: 10px 0;">HISTORIA: {hist_str}</p>
                <div style="background: #fff; padding: 15px; border: 1px solid #ffa500; border-radius: 4px;">
                    <strong>PLAN ROZMOWY:</strong> "Cześć, tu {rep_first_name} z Prescot. Przejrzałem historię zakupów – bierzecie od nas {prods[0] if prods else 'nasze systemy'}, ale brakuje Wam do kompletu {missing}. Przy dzisiejszej strategii oferuję zestaw systemowy z 7 letnią gwarancją. Robimy porządek z zasilaniem?"
                </div>
            </div>"""

    html += f"""<h2 style="color: #fff; background: #219150; padding: 12px; margin-top: 40px; border-left: 6px solid #000;">II. EKSPANSJA (2 NOWE WĘDKI)</h2>"""

    for l in active_leads:
        maps_url = get_google_maps_link(l['name'], l['city'])
        html += f"""
            <div style="margin-bottom: 30px; padding: 20px; border: 1px solid #eee; background: #f4fff4;">
                <h3 style="margin: 0; color: #155724;">{l['name']} ({l['city']}) <a href="{maps_url}" style="font-size: 13px; color: #007bff;">[MAPA 📍]</a></h3>
                <p style="font-size: 14px; margin: 10px 0;">KONTAKT: {l.get('person', 'Właściciel')} | TEL: <a href="tel:{l.get('phone','').replace(' ','')}">{l.get('phone','N/A')}</a></p>
                <div style="background: #fff; padding: 15px; border: 1px solid #219150; border-radius: 4px;">
                    <strong>PLAN ROZMOWY:</strong> "Dzień dobry, {rep_first_name} z firmy Prescot. Realizujecie Państwo projekty premium – u nas znajdziecie systemy zasilania z 7-letnią gwarancją, które eliminują awarie u klienta końcowego. Chcę podesłać specyfikację pod bieżące montaże. Na jaki mail mogę ją skierować?"
                </div>
            </div>"""

    html += """<p style="text-align: center; font-size: 22px; font-weight: bold; margin-top: 40px;">POWODZENIA! DO ROBOTY! 🚀</p></div></body></html>"""
    return html

def generate_final_summary(reps, days):
    html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 40px;">
        <div style="text-align: center; border-bottom: 4px solid #000; padding-bottom: 20px;">
            <h1 style="margin: 0;">RAPORT: KONIEC SERII PLANÓW</h1>
            <p style="color: #666;">DLA: KRZYSZTOF BARA</p>
        </div>
        <p>Panie Krzysztofie,</p>
        <p>Właśnie zakończyłem generowanie i wysyłkę pełnego cyklu planów operacyjnych (3+2) dla 5 handlowców na cały tydzień roboczy.</p>
        <p><strong>Zrealizowano:</strong> Poniedziałek - Piątek</p>
        <p>Wszystkie unikatowe listy celów zostały wysłane. System automatyzacji zostaje teraz wyłączony zgodnie z instrukcją.</p>
        <p style="font-weight: bold; margin-top: 30px;">Z poważaniem,<br>Prescot AI Automation</p>
    </body>
    </html>
    """
    return html

def main():
    dir_path = "/Users/karolbohdanowicz/my-ai-agents/Zadania-Prescot"
    with open(os.path.join(dir_path, "reps_clients_detailed.json"), "r") as f:
        reps_clients_all = json.load(f)
    with open(os.path.join(dir_path, "sales_strategy_plan.json"), "r") as f:
        strategy = json.load(f)
    
    new_leads = []
    with open("/Users/karolbohdanowicz/my-ai-agents/leads_prescot_premium.csv", "r") as f:
        lines = f.readlines()[1:] 
        for line in lines:
            if ";" in line:
                parts = line.strip().split(";")
                if len(parts) >= 8:
                    new_leads.append({"name": parts[0], "segment": parts[1], "city": parts[2], "phone": parts[5], "person": parts[7]})

    reps = ["Dariusz Nita", "Anna Galor", "Anna Asztemborska", "Adam Garbowski", "Iwona Baczewska"]
    days = ["day1", "day2", "day3", "day4", "day5"]
    
    print("STARTING ROBUST WEEKLY LOOP (3+2)...", flush=True)
    
    for day_key in days:
        day_data = strategy["week1"][day_key]
        for rep in reps:
            if os.path.exists(os.path.join(dir_path, "STOP_AUTOMATION")): return
            
            subject = f"PLAN DNIA: {rep.upper()} ({day_key.upper()})"
            html_content = generate_pro_html(rep, day_key, day_data, reps_clients_all.get(rep, {}), new_leads)
            
            print(f"[{time.strftime('%H:%M:%S')}] Sending Robust HTML for {rep} to Krzysztof", flush=True)
            send_html_email_via_mac_file(subject, html_content, "krzysztof.bara@prescot.pl")
            time.sleep(60)

    # Summary
    print("Sending Weekly Summary...", flush=True)
    summary = generate_final_summary(reps, days)
    send_html_email_via_mac_file("RAPORT: Zakończenie cyklu planowania na ten tydzień", summary, "krzysztof.bara@prescot.pl")

if __name__ == "__main__":
    main()
