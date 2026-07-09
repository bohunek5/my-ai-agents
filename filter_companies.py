import json
import re

with open("/Users/karolbohdanowicz/my-ai-agents/new_companies_to_scrape.json", "r", encoding="utf-8") as f:
    companies = json.load(f)

keywords = ["led", "lux", "lum", "świat", "ośw", "elektr", "hurt", "volt", "ener", "tech", "instal", "kabel"]
best_companies = []
other_companies = []

for c in companies:
    name = c.get("nazwy", {}).get("pelna", "").lower()
    if any(k in name for k in keywords):
        best_companies.append(c)
    else:
        other_companies.append(c)

print(f"Total: {len(companies)}")
print(f"Best matched by name: {len(best_companies)}")

# Save best for further processing
with open("/Users/karolbohdanowicz/my-ai-agents/best_companies.json", "w", encoding="utf-8") as f:
    json.dump(best_companies, f, ensure_ascii=False, indent=2)
