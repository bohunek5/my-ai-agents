import re

input_file = '/Users/karolbohdanowicz/Downloads/TASMY.html'
output_file = '/Users/karolbohdanowicz/Downloads/TASMY_poprawione.html'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove uniqueness and duplicate badges
content = re.sub(r'<span class="uniqueness-badge[^>]*>.*?</span>', '', content, flags=re.DOTALL)
content = re.sub(r'<span class="duplicate-badge[^>]*>.*?</span>', '', content, flags=re.DOTALL)

# 2. Fix units spacing (e.g. 8 mm -> 8mm, 3000 K -> 3000K)
# Units to fix: mm, cm, m, K, V, W, W/m, lm, lm/m, lm/W
# \d+([.,]\d+)? matches numbers like 8, 4.8, 4,8
content = re.sub(r'(\d+(?:[.,]\d+)?)\s+(mm|cm|m|K|V|W|W/m|lm|lm/m|lm/W)(?!\w)', r'\1\2', content)

# 3. Fix IP spacing (e.g. IP 65 -> IP65)
content = re.sub(r'\bIP\s+(\d{2})\b', r'IP\1', content)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Saved to TASMY_poprawione.html")
