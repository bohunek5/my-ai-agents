import os
import glob
import re

dirs_to_search = [
    os.path.expanduser("~/my-ai-agents/.agent/skills")
]

skill_files = []
for d in dirs_to_search:
    skill_files.extend(glob.glob(os.path.join(d, "*", "SKILL.md")))

skill_files = list(set(skill_files))
skills_data = []

for filepath in skill_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        yaml_match = re.search(r'^---\s*(.*?)\s*---', content, re.DOTALL)
        name = "Unknown"
        description = "Brak opisu"
        
        if yaml_match:
            yaml_content = yaml_match.group(1)
            name_match = re.search(r'name:\s*(.+)', yaml_content)
            desc_match = re.search(r'description:\s*(.+)', yaml_content)
            
            if name_match:
                name = name_match.group(1).strip().strip("'").strip('"')
            if desc_match:
                description = desc_match.group(1).strip().strip("'").strip('"')
        else:
            name = os.path.basename(os.path.dirname(filepath))
            
        skills_data.append({
            'name': name,
            'description': description,
            'path': filepath
        })
    except Exception as e:
        pass

skills_data.sort(key=lambda x: x['name'].lower())

html_content = f'''
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lokalne Skille Projektu (My AI Agents)</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 1200px; margin: 0 auto; background-color: #0d1117; color: #c9d1d9; }}
        h1 {{ border-bottom: 1px solid #30363d; padding-bottom: 10px; color: #fff; }}
        h2 {{ color: #58a6ff; margin-top: 40px; border-bottom: 1px solid #30363d; padding-bottom: 5px; }}
        .skill-card {{ background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 15px; margin-bottom: 15px; transition: 0.2s; }}
        .skill-card:hover {{ border-color: #58a6ff; }}
        .skill-name {{ font-size: 1.2em; font-weight: bold; color: #79c0ff; margin-bottom: 5px; }}
        .skill-path {{ font-family: monospace; font-size: 0.85em; color: #8b949e; margin-bottom: 10px; word-break: break-all; }}
        .skill-desc {{ color: #c9d1d9; }}
        .stats {{ background: #238636; color: white; padding: 10px 20px; border-radius: 6px; display: inline-block; margin-bottom: 20px; font-weight: bold; }}
        .blast-protocol {{ background: #1f2328; border: 1px solid #d29922; border-left: 4px solid #d29922; border-radius: 6px; padding: 15px; margin-bottom: 30px; }}
        .blast-protocol h3 {{ margin-top: 0; color: #e3b341; }}
    </style>
</head>
<body>
    <h1>Twoje Prywatne Skille (Workspace)</h1>
    
    <div class="blast-protocol">
        <h3>B.L.A.S.T. Protocol włączony!</h3>
        <p>Protokół z konstytucji (GEMINI.md) jest załadowany. Hierarchia: <strong>Blueprint -> Link -> Architect -> Stylize -> Trigger</strong>.</p>
    </div>

    <div class="stats">Lokalne, Twoje skille: {len(skills_data)}</div>
'''

for skill in skills_data:
    html_content += f'''
    <div class="skill-card">
        <div class="skill-name">{skill['name']}</div>
        <div class="skill-path">{skill['path']}</div>
        <div class="skill-desc">{skill['description']}</div>
    </div>
    '''

html_content += '''
</body>
</html>
'''

out_html = os.path.expanduser("~/Downloads/Lokalne_Skille_Raport.html")
with open(out_html, 'w', encoding='utf-8') as f:
    f.write(html_content)
