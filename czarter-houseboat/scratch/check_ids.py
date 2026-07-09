import re

content = open("src/data/stranda-apartments.ts", "r").read()
ids = re.findall(r"id:\s*'([^']+)'", content)
print("Existing IDs:", ids)

folders = ["A305", "A306", "B102", "B103", "B202", "B304", "B305", "B401", "B402", "B404", "C_Studio", "C205", "C301", "C304", "C402", "C404"]
for f in folders:
    f_id = "c-studio" if f == "C_Studio" else f
    if f_id not in ids:
        print("Missing ID:", f_id)
