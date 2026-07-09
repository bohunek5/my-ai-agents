import os
import re

SVG_PATH = "/Users/karolbohdanowicz/Downloads/PRESCOT_logo_biale+kolor-01.svg"
ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

with open(SVG_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Crop viewBox to the bounding box of the actual logo paths
# Bounding box is X from 180 to 660, Y from 265 to 330.
# Width: 480, Height: 65.
cropped_content = re.sub(
    r'viewBox="[^"]+"',
    'viewBox="180 265 480 65"',
    content
)
# Also strip out the internal height/width styles that Illustrator puts in style
cropped_content = re.sub(
    r'style="enable-background:new 0 0 841.9 595.3;"',
    '',
    cropped_content
)

# 2. Create the LIGHT background version (Dark text + Orange LED)
# Replace st0 {fill:#FFFFFF;} with st0 {fill:#111827;}
dark_logo = re.sub(
    r'\.st0\{fill:#FFFFFF;\}',
    '.st0{fill:#111827;}',
    cropped_content
)
with open(os.path.join(ASSETS_DIR, "logo_dark.svg"), "w", encoding="utf-8") as f:
    f.write(dark_logo)

# 3. Create the DARK background version (White text + Orange LED)
light_logo = re.sub(
    r'\.st0\{fill:#FFFFFF;\}',
    '.st0{fill:#FFFFFF;}',
    cropped_content
)
with open(os.path.join(ASSETS_DIR, "logo_light.svg"), "w", encoding="utf-8") as f:
    f.write(light_logo)

print("Created cropped logo_dark.svg and logo_light.svg successfully.")
