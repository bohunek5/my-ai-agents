import re

filepath = "/Users/karolbohdanowicz/my-ai-agents/mazury-holiday/src/data/stranda-apartments.ts"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace keys
content = content.replace("'C Studio': {", "'c-studio': {")
content = content.replace("id: 'C Studio',", "id: 'c-studio',")

content = content.replace("'C z jedną sypialnią': {", "'c-z-jedna-sypialnia': {")
content = content.replace("id: 'C z jedną sypialnią',", "id: 'c-z-jedna-sypialnia',")

content = content.replace("'C z dwoma sypialniami': {", "'c-z-dwoma-sypialniami': {")
content = content.replace("id: 'C z dwoma sypialniami',", "id: 'c-z-dwoma-sypialniami',")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("IDs replaced in stranda-apartments.ts")
