import re

# 1. Update style.css
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Change min-height to 100vh
css = css.replace('.hero {\n    position: relative;\n    min-height: 90vh;\n', '.hero {\n    position: relative;\n    min-height: 100vh;\n')

# Add CSS for scroll down and back to top
if '.scroll-down-arrow' not in css:
    additional_css = """

/* Scroll Down Arrow */
.scroll-down-arrow {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: var(--c-primary);
    font-size: 2rem;
    animation: bounce 2s infinite;
    cursor: pointer;
    z-index: 5;
    opacity: 0.8;
}

.scroll-down-arrow:hover {
    opacity: 1;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0) translateX(-50%);
    }
    40% {
        transform: translateY(-20px) translateX(-50%);
    }
    60% {
        transform: translateY(-10px) translateX(-50%);
    }
}

/* Scroll To Top Button */
.scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: var(--c-primary);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 100;
}

.scroll-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    background-color: #c90000;
    transform: translateY(-3px);
}
"""
    css += additional_css

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the two trust items
trust_remove_pattern = re.compile(r'                            <div class="trust-item">\s*<span class="trust-val">100%</span>\s*<span class="trust-lbl">Praca pod obciążeniem</span>\s*</div>.*?<div class="trust-item" style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding-left: 15px; border-left: 1px solid rgba\(0,0,0,0\.1\);">\s*<img src="assets/ce_rohs\.png" alt="CE and RoHS certificates" style="height: 35px; width: auto; object-fit: contain;">\s*</div>', re.DOTALL)
html = trust_remove_pattern.sub('', html)

# Add scroll down arrow to hero
scroll_down_html = """
                    </div>
                </div>
                <div class="scroll-down-arrow" onclick="document.querySelector('.applications-section').scrollIntoView({behavior: 'smooth'})">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </div>
            </div>"""
html = html.replace('                    </div>\n                </div>\n            </div>', scroll_down_html)

# Add scroll to top button before closing body
scroll_to_top_html = """    <!-- Scroll To Top -->
    <div class="scroll-to-top" id="scrollToTop" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </div>

    <!-- Scripts -->"""
if 'class="scroll-to-top"' not in html:
    html = html.replace('    <!-- Scripts -->', scroll_to_top_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

# 3. Update main.js
with open('main.js', 'r', encoding='utf-8') as f:
    js = f.read()

if 'scrollToTop' not in js:
    js_addition = """
// Scroll to top button logic
document.addEventListener('scroll', () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});
"""
    js += js_addition

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("UI updates complete")
