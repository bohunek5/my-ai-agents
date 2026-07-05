with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update the header-inner
import re

header_inner_start = html.find('<div class="header-inner">')
header_inner_end = html.find('</header>')

header_section = html[header_inner_start:header_inner_end]

# Remove the existing language dropdown wrapper
lang_div_regex = re.compile(r'<div style="flex: 1; display: flex; justify-content: center;">\s*<div class="language-dropdown" style="position: relative;">.*?</div>\s*</div>', re.DOTALL)
header_section = lang_div_regex.sub('', header_section)

# Now, update the header-actions to include the language dropdown
# We want it between "Zakup detaliczny" and "Współpraca hurtowa"
# We also want it to look "delikatniejsze" and "dalej od kontakt odsuniete"

lang_dropdown_html = """
                <!-- Language Dropdown -->
                <div class="language-dropdown" style="position: relative; margin-right: 1.5rem; margin-left: 0.5rem;">
                    <button class="lang-btn" id="lang-current-btn" style="opacity: 0.7; font-size: 1rem; padding: 0.2rem; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: opacity 0.2s;">
                        <span style="font-size: 1.1rem;">🇵🇱</span> <span style="font-size: 0.85rem; font-weight: 500;">PL</span> <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style="opacity: 0.5;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                    <div class="lang-menu" id="lang-dropdown">
                        <button data-lang="pl" style="font-size: 1rem; display: flex; align-items: center; gap: 6px;"><span style="font-size: 1.1rem;">🇵🇱</span> PL</button>
                        <button data-lang="en" style="font-size: 1rem; display: flex; align-items: center; gap: 6px;"><span style="font-size: 1.1rem;">🇬🇧</span> EN</button>
                        <button data-lang="de" style="font-size: 1rem; display: flex; align-items: center; gap: 6px;"><span style="font-size: 1.1rem;">🇩🇪</span> DE</button>
                        <button data-lang="lt" style="font-size: 1rem; display: flex; align-items: center; gap: 6px;"><span style="font-size: 1.1rem;">🇱🇹</span> LT</button>
                    </div>
                </div>
"""

# Find where to insert it: after the closing </a> of "Zakup detaliczny"
retail_link_end = header_section.find('</a>\n                <!-- Sticky CTA for CRO -->')
if retail_link_end != -1:
    header_section = header_section[:retail_link_end + 4] + '\n' + lang_dropdown_html + header_section[retail_link_end + 4:]

# Also change the CTA button text to "Kontakt" as requested
header_section = header_section.replace('Współpraca hurtowa', 'Kontakt')

html = html[:header_inner_start] + header_section + html[header_inner_end:]

# Update the mobile menu language dropdown to match the new format
mobile_lang_regex = re.compile(r'<div class="language-dropdown" style="position: relative;">\s*<button class="lang-btn" id="lang-current-btn".*?</div>\s*</div>', re.DOTALL)
html = mobile_lang_regex.sub(lang_dropdown_html, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html")
