import os
import glob
import re
import datetime

# Directories to search
dirs_to_search = [
    os.path.expanduser("~/.gemini/config/skills"),
    os.path.expanduser("~/my-ai-agents/.agent/skills"),
    os.path.expanduser("~/.gemini/config/plugins")
]

skill_files = []
for d in dirs_to_search:
    if "plugins" in d:
        skill_files.extend(glob.glob(os.path.join(d, "*", "skills", "*", "SKILL.md")))
    else:
        skill_files.extend(glob.glob(os.path.join(d, "*", "SKILL.md")))

# Remove duplicates
skill_files = list(set(skill_files))

skills_data = []

for filepath in skill_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract YAML frontmatter
        yaml_match = re.search(r'^---\s*(.*?)\s*---', content, re.DOTALL)
        
        name = "Unknown"
        description = "No description provided."
        
        if yaml_match:
            yaml_content = yaml_match.group(1)
            name_match = re.search(r'name:\s*(.+)', yaml_content)
            desc_match = re.search(r'description:\s*(.+)', yaml_content)
            
            if name_match:
                name = name_match.group(1).strip().strip("'").strip('"')
            if desc_match:
                description = desc_match.group(1).strip().strip("'").strip('"')
        else:
            # Fallback to directory name
            name = os.path.basename(os.path.dirname(filepath))
            
        # Extract the first paragraph after YAML or headers
        content_no_yaml = re.sub(r'^---\s*.*?\s*---', '', content, flags=re.DOTALL)
        content_lines = [line.strip() for line in content_no_yaml.split('\n') if line.strip() and not line.startswith('#')]
        
        details = content_lines[0] if content_lines else ""
        
        skills_data.append({
            'name': name,
            'description': description,
            'details': details[:200] + '...' if len(details) > 200 else details,
            'path': filepath
        })
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

# Sort alphabetically by name
skills_data.sort(key=lambda x: x['name'].lower())

# Generate Markdown
md_content = f"# Antigravity Skills Report\n\n"
md_content += f"**Generated:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n"
md_content += f"**Total Skills Found:** {len(skills_data)}\n\n"
md_content += "---\n\n"

current_letter = ""

for skill in skills_data:
    first_char = skill['name'][0].upper() if skill['name'] else '?'
    if first_char != current_letter:
        current_letter = first_char
        md_content += f"## {current_letter}\n\n"
        
    md_content += f"### {skill['name']}\n"
    md_content += f"**Path:** `{skill['path']}`\n\n"
    md_content += f"**Description:** {skill['description']}\n\n"
    # md_content += f"**Details:** {skill['details']}\n\n"
    md_content += "---\n\n"

out_md = os.path.expanduser("~/my-ai-agents/Antigravity_Skills_Report.md")
with open(out_md, 'w', encoding='utf-8') as f:
    f.write(md_content)

print(f"Generated Markdown report at {out_md} with {len(skills_data)} skills.")
