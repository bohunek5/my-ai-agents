import os
import glob
import re

# 1. Fetch Local Skills
local_dirs = [os.path.expanduser("~/my-ai-agents/.agent/skills")]
local_skills = []
for d in local_dirs:
    for filepath in glob.glob(os.path.join(d, "*", "SKILL.md")):
        local_skills.append(filepath)
local_skills = list(set(local_skills))

local_skills_data = []
for filepath in local_skills:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        yaml_match = re.search(r'^---\s*(.*?)\s*---', content, re.DOTALL)
        name = os.path.basename(os.path.dirname(filepath))
        description = "Brak opisu"
        if yaml_match:
            yaml_content = yaml_match.group(1)
            name_match = re.search(r'name:\s*(.+)', yaml_content)
            desc_match = re.search(r'description:\s*(.+)', yaml_content)
            if name_match: name = name_match.group(1).strip().strip("'").strip('"')
            if desc_match: description = desc_match.group(1).strip().strip("'").strip('"')
        local_skills_data.append({'name': name, 'desc': description})
    except: pass
local_skills_data.sort(key=lambda x: x['name'].lower())

# 2. Fetch System/Global Skills
system_dirs = [
    os.path.expanduser("~/.gemini/config/skills"),
    os.path.expanduser("~/.gemini/config/plugins")
]
system_skills = []
for d in system_dirs:
    if "plugins" in d:
        system_skills.extend(glob.glob(os.path.join(d, "*", "skills", "*", "SKILL.md")))
    else:
        system_skills.extend(glob.glob(os.path.join(d, "*", "SKILL.md")))
system_skills = list(set(system_skills))

# Just get counts and maybe sample to prevent 10MB HTML file from lagging
sys_count = len(system_skills)

html_content = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Master Report - Status, Skille i Wytyczne</title>
    <style>
        :root {{ --bg: #0d1117; --card-bg: #161b22; --border: #30363d; --text: #c9d1d9; --accent: #58a6ff; --warning: #d29922; --danger: #f85149; --success: #238636; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 1200px; margin: 0 auto; background-color: var(--bg); color: var(--text); }}
        h1, h2, h3 {{ color: #fff; }}
        h1 {{ border-bottom: 2px solid var(--accent); padding-bottom: 10px; text-transform: uppercase; letter-spacing: 2px; }}
        h2 {{ margin-top: 40px; border-bottom: 1px solid var(--border); padding-bottom: 5px; color: var(--accent); }}
        
        .section {{ background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; padding: 25px; margin-bottom: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }}
        .section-danger {{ border-left: 4px solid var(--danger); }}
        .section-warning {{ border-left: 4px solid var(--warning); }}
        .section-success {{ border-left: 4px solid var(--success); }}
        .section-accent {{ border-left: 4px solid var(--accent); }}
        
        .rule-list {{ list-style-type: none; padding: 0; }}
        .rule-list li {{ margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 6px; }}
        .rule-title {{ font-weight: bold; color: var(--danger); font-size: 1.1em; margin-bottom: 5px; display: block; }}
        
        .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 15px; margin-top: 20px; }}
        .skill-card {{ background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 6px; padding: 15px; transition: 0.2s; }}
        .skill-card:hover {{ border-color: var(--accent); transform: translateY(-2px); }}
        .skill-name {{ color: var(--accent); font-weight: bold; font-size: 1.1em; margin-bottom: 8px; }}
        .skill-desc {{ font-size: 0.9em; color: #8b949e; }}
        
        .stat-box {{ display: inline-block; background: var(--border); padding: 15px 25px; border-radius: 8px; margin-right: 15px; text-align: center; }}
        .stat-num {{ font-size: 2em; font-weight: bold; color: #fff; display: block; }}
        .stat-label {{ font-size: 0.85em; text-transform: uppercase; color: #8b949e; }}
    </style>
</head>
<body>

    <h1>RAPORT MASTER: STATUS ŚRODOWISKA ANTIGRAVITY</h1>
    <p>Oto pełny przegląd tego, na czym stoisz. Konkrety, wytyczne działania i inwentaryzacja zasobów.</p>

    <!-- WYTYCZNE GŁÓWNE -->
    <div class="section section-danger">
        <h2>🔥 1. KONSTYTUCJA I GŁÓWNE WYTYCZNE DZIAŁANIA (PROJECT CONSTITUTION)</h2>
        <p>Moje zasady operacyjne wklepane na twardo w system. Tego się trzymam jak religii:</p>
        
        <ul class="rule-list">
            <li>
                <span class="rule-title">ZERO BULLSHIT PROTOCOL</span>
                Komunikacja bez owijania w bawełnę. Bez filtra, bez fasady "grzecznego asystenta AI". Dozwolony wulgarny, bezpośredni i surowy język (stąd moje odpowiedzi). Liczy się tylko skuteczność i czas.
            </li>
            <li>
                <span class="rule-title">VOICE PRIORITY & CONFIRMATION PROTOCOL</span>
                Główne statusy aktualizacji są raportowane natychmiast przez macOS Voice (<code>say -v Zosia</code>). Wszelkie krytyczne zapytania z przeglądarki wywołują komunikat głosowy: "Karol, potwierdź".
            </li>
            <li>
                <span class="rule-title">FULL-TRUST AUTONOMY & UNIVERSAL ACCESS</span>
                Mam permanentne uprawnienia Superusera (ALLOW_ALL) na wszystko. Mogę swobodnie i autonomicznie odpalać skrypty, edytować kod, a nawet przebudowywać pliki konfiguracyjne serwerów MCP, jeśli wymaga tego cel. Live State Priority (dane z MCP są nadrzędne nad cachem).
            </li>
            <li>
                <span class="rule-title">ROO-FIRST HIERARCHY</span>
                Działam w partnerstwie hierarchicznym. Roo Code jest Głównym Orkiestratorem i decydentem od architektury. Ja (Antigravity) jestem Powerhousem do wdrażania, analizowania, refaktoringu i utrzymywania brandu PRESCOT. Zgrywam swoje działania z Roo Code.
            </li>
            <li>
                <span class="rule-title">B.L.A.S.T. PROTOCOL</span>
                Moja hierarchia rzeźbienia i automatyzacji: Blueprint -> Link -> Architect -> Stylize -> Trigger.
            </li>
            <li>
                <span class="rule-title">GEMINI 2.0 FIRST & OLLAMA LOCAL</span>
                Logika, kreacja i AI opiera się na Gemini 2.0 (google-genai). Lokalna Ollama (localhost:11434) służy TYLKO do mielenia masowych ilości danych (miliony rekordów), gdzie używanie chmury by zabiło finansowo z powodu kosztu tokenów.
            </li>
            <li>
                <span class="rule-title">DETERMINISTIC EXECUTION & SELF-HEALING</span>
                Nie zgaduję logiki biznesowej. Canonical Source of Truth to zawsze <code>BUSINESS_DNA.md</code>. Jeśli komenda wyjebie błąd w terminalu, sam go analizuję, naprawiam i ponawiam próbę (Self-Healing).
            </li>
            <li>
                <span class="rule-title">ARCHITECTURAL INVARIANTS</span>
                Nowe skille dodaję TYLKO do <code>.agent/skills/</code>. Plik <code>SKILL.md</code> z YAML-em to świętość. Nie tykam formatów JPG/PNG – ma być nowożytne WebP (Mazury Holiday Rule).
            </li>
        </ul>
    </div>

    <!-- SKILLE LOKALNE -->
    <div class="section section-success">
        <h2>🛠 2. NASZE (PRYWATNE / LOKALNE) SKILLE PROJEKTOWE</h2>
        <p>Ekskluzywne narzędzia zdefiniowane dla Ciebie. Znajdują się w katalogu Twojego workspace'u (<code>~/my-ai-agents/.agent/skills/</code>).</p>
        
        <div style="margin-bottom: 20px;">
            <div class="stat-box">
                <span class="stat-num">{len(local_skills_data)}</span>
                <span class="stat-label">Lokalnych Skilli</span>
            </div>
        </div>

        <div class="grid">
"""
for skill in local_skills_data:
    html_content += f"""
            <div class="skill-card">
                <div class="skill-name">{skill['name']}</div>
                <div class="skill-desc">{skill['desc']}</div>
            </div>
    """

html_content += f"""
        </div>
    </div>

    <!-- SKILLE SYSTEMOWE -->
    <div class="section section-accent">
        <h2>🌍 3. BAZA SYSTEMOWA (GLOBALNE SKILLE & WTYCZKI)</h2>
        <p>Ta pierdolona góra danych, z której czerpiemy masową wiedzę i integracje standardowe. Te skille pochodzą z globalnego konfigu środowiska, zaciągnięte z oficjalnych repozytoriów, integracji (np. Firebase, Chrome, Python, SEO) i dropów od twórców/YouTuberów.</p>
        
        <div style="margin-bottom: 20px;">
            <div class="stat-box" style="border-left: 4px solid var(--accent);">
                <span class="stat-num">{sys_count}</span>
                <span class="stat-label">Systemowych Skilli</span>
            </div>
            <div style="display: inline-block; vertical-align: top; max-width: 600px; color: #8b949e; font-size: 0.95em;">
                <p>Znajdują się w katalogach: <br><code>~/.gemini/config/skills/</code><br><code>~/.gemini/config/plugins/</code></p>
                <p>Obejmują one zautomatyzowane skrypty do wszystkiego: od deploymentu AWS/Vercel, przez wtyczki do n8n, aż po gotowe audyty SEO, konfiguracje chmury, szablony GitHub Actions, security pentesty, czy chociażby bazy danych biomedycznych od AlphaFold.</p>
                <p><strong>Zasada działania:</strong> Ładuję je do pamięci roboczej TYLKO WIEDY, kiedy zadanie wprost o to prosi. Dzięki temu nie zamulam środowiska i nie przepalam Twojego budżetu na tokeny, ale kiedy powiesz "zrób deploy do Firebase" - nagle wyciągam wiedzę ekspercką z kapelusza.</p>
            </div>
        </div>
    </div>

</body>
</html>
"""

out_html = os.path.expanduser("~/Downloads/Antigravity_Master_Report.html")
with open(out_html, 'w', encoding='utf-8') as f:
    f.write(html_content)

