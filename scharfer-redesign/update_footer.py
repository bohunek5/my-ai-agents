import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_footer = """    <!-- Footer -->
    <footer class="site-footer" style="background-color: #ffffff; padding: 2rem 0; border-top: 1px solid #eaeaea; font-family: var(--f-main);">
        <div class="footer-inner" style="max-width: var(--max-width); margin: 0 auto; padding: 0 var(--spacing-lg); display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 2rem;">
            
            <div class="footer-col brand-col" style="flex: 1; min-width: 300px; display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; align-items:center; gap:20px;">
                    <img src="logo_scharfer.png" alt="Scharfer - Zasilacze LED" class="footer-logo" style="max-height: 32px; margin: 0;">
                    <div style="font-size:12px; font-weight:600; color:#111; text-transform:uppercase; border-left: 2px solid #eaeaea; padding-left: 15px;">
                        <span style="display:block; font-size:9px; color:#777; margin-bottom:2px;">Oficjalny dystrybutor</span>
                        <a href="https://prescot.com.pl" target="_blank">
                            <img src="PRESCOT_logo.png" alt="PRESCOT LED" style="height: 16px; margin-top: 2px;">
                        </a>
                    </div>
                </div>
                <div style="color: #6B7280; font-size: 0.85rem; line-height: 1.5; margin-top: 5px;">
                    <strong>Prescot Sp. z o.o.</strong><br>
                    ul. Wileńska 1, 11-500 Giżycko<br>
                    NIP: 8451939947
                </div>
            </div>

            <div class="footer-col email-col" style="flex: 1; min-width: 250px;">
                <span style="display: block; color: #6B7280; font-size: 0.85rem; margin-bottom: 0.4rem;">Kontakt (Dystrybutor):</span>
                <a href="mailto:biuro@prescot.pl" style="color: var(--c-heading); font-size: 1.15rem; font-weight: 600; text-decoration: none;">biuro@prescot.pl</a>
                <span style="display:block; margin-top:5px; font-weight:500; color:#444; font-size: 0.95rem;">tel. +48 87 428 11 34</span>
            </div>

            <div class="footer-col links-col" style="flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 8px;">
                <a href="#" style="color: #6B7280; text-decoration: none; font-size: 0.9rem; transition: color 0.2s;" onmouseover="this.style.color='var(--c-primary)'" onmouseout="this.style.color='#6B7280'">Regulamin</a>
                <a href="#" style="color: #6B7280; text-decoration: none; font-size: 0.9rem; transition: color 0.2s;" onmouseover="this.style.color='var(--c-primary)'" onmouseout="this.style.color='#6B7280'">RODO</a>
                <a href="https://prescot.pl" target="_blank" style="color: var(--c-heading); font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; margin-top: 5px;" onmouseover="this.style.color='var(--c-primary)'" onmouseout="this.style.color='var(--c-heading)'">Poznaj PRESCOT LED &rarr;</a>
            </div>

        </div>
    </footer>"""

footer_pattern = re.compile(r'<!-- Footer -->\s*<footer class="site-footer">.*?</footer>', re.DOTALL)
html = footer_pattern.sub(new_footer, html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated footer")
