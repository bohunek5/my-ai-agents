import re

content = open("src/data/stranda-apartments.ts", "r").read()
# Replace `    }\n\n    '` with `    },\n\n    '`
content = re.sub(r"    \}\n\n    '", r"    },\n\n    '", content)
content = re.sub(r"    \}\n    '", r"    },\n    '", content)

open("src/data/stranda-apartments.ts", "w").write(content)
