import os

with open('build_site.py', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Remove EU items from top menu if they were added.
# In patch_apple_style.py, we might have added them, but let's check `menu_items_pl` and similar.
# Wait, actually the top menu contains standard links. Let's see what the current menu generation looks like.
# I will use a regex to remove any <a> tag in the nav that links to fundusze, except if it's the main menu item, or wait...
# "oraz na belkach menu ma tego nie byc" -> remove Fundusze UE from the menu completely? 
# "niech nie beda tak na belce tylko dopiero po kliknieciu w belke dofinansowania" -> wait, "nacisniecie teog przenisie na podstrone fundusze ue oraz na belkach menu ma tego nie byc"
# "tego" = "unijnymi rzeczami" (EU logos). 
# Ah! In the current top menu, maybe we have EU logos? 
# "to co masz plik stopka z unijnymi rzeczami to ma byc na podstronach nad stopka wszedzie i nacisniecie teog przenisie na podstrone fundusze ue"
# This means: put the stopka_loga.png at the bottom above the footer, wrap it in an <a> tag linking to fundusze.html, and remove it from wherever it currently is (maybe it's currently on the menu bar).

def apply_footer_banner(html_content, lang, page):
    prefix = "" if page == "index" else "../"
    fundusze_url = f"{prefix}fundusze.html" if lang == 'pl' else f"{prefix}{lang}/fundusze.html"
    if page == "index" and lang != "pl":
        fundusze_url = f"{lang}/fundusze.html"
        
    banner_html = f'''
    <!-- EU BANNER -->
    <div style="background: #ffffff; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; margin-top: 40px;">
        <a href="{fundusze_url}" style="display: inline-block; transition: opacity 0.2s; text-decoration: none;">
            <img src="{prefix}images/assets/stopka_loga.png" alt="Fundusze Europejskie" style="max-width: 100%; height: auto; max-height: 80px;">
            <p style="font-family: -apple-system, sans-serif; font-size: 13px; color: #64748b; margin-top: 10px;">Kliknij, aby dowiedzieć się więcej o dofinansowaniu</p>
        </a>
    </div>
    <!-- END EU BANNER -->
    '''
    # We should insert banner_html right before the <footer> tag
    # The original footer is <footer class="footer-area"> or similar. Let's find it.
    if '<footer' in html_content:
        return html_content.replace('<footer', banner_html + '\n<footer')
    else:
        # Fallback to before </body>
        return html_content.replace('</body>', banner_html + '\n</body>')

# I will patch build_site.py so that right before writing out the HTML, it applies the banner.
# There is a loop in build_site.py: `with open(filepath, 'w', encoding='utf-8') as f: f.write(html_content)`
# I can insert the banner injection there.

injection_code = '''
            # INJECT EU BANNER ABOVE FOOTER
            prefix_val = "" if page == "index" and lang == "pl" else ("../" if page != "index" else "")
            fundusze_url = f"fundusze.html" if lang == 'pl' else f"fundusze.html"
            if page != "index": fundusze_url = f"../{fundusze_url}" if lang == 'pl' else f"../{lang}/fundusze.html"
            elif lang != 'pl': fundusze_url = f"{lang}/fundusze.html"
            
            banner_html = f\'\'\'
            <!-- EU BANNER -->
            <div style="background: #ffffff; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0; margin-top: 40px;">
                <a href="{fundusze_url}" style="display: inline-block; transition: opacity 0.2s; text-decoration: none;">
                    <img src="{prefix_val}images/assets/stopka_loga.png" alt="Fundusze Europejskie" style="max-width: 100%; height: auto; max-height: 80px;">
                    <p style="font-family: -apple-system, sans-serif; font-size: 13px; color: #64748b; margin-top: 10px;">Dowiedz się więcej o dofinansowaniu UE</p>
                </a>
            </div>
            <!-- END EU BANNER -->
            \'\'\'
            if '<footer' in html_content:
                html_content = html_content.replace('<footer', banner_html + '\\n<footer')
            else:
                html_content = html_content.replace('</body>', banner_html + '\\n</body>')
            
            # REMOVE EU LOGOS FROM MENU OR BELKA if they exist
            # If there's an img with stopka_loga.png in the header, we can try to strip it out, but it's probably better to just leave it if it's not there, or strip it if it is.
            import re
            html_content = re.sub(r'<div[^>]*>\\s*<img[^>]*stopka_loga\\.png[^>]*>\\s*</div>', '', html_content, flags=re.IGNORECASE)

            # Fix WCAG script if needed
            # "strona przyjazna wszystkim"
'''

# Find the loop writing the files.
write_line = "with open(filepath, 'w', encoding='utf-8') as f:"
if write_line in text:
    text = text.replace(write_line, injection_code + '\n            ' + write_line)

with open('build_site.py', 'w', encoding='utf-8') as f:
    f.write(text)

print("Patched build_site.py with EU banner injection.")
