import re

with open('build_site.py', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update logo styling to be Apple style
old_custom_menu_css = """    .site-logo-text {
        white-space: nowrap !important;
    }
</style>"""

new_custom_menu_css = """    .site-logo-text {
        white-space: nowrap !important;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
        font-weight: 800;
        font-size: 24px;
        letter-spacing: -0.5px;
        color: #0f172a;
    }
    .logo-sub {
        color: #046bd2;
        font-weight: 600;
    }
    /* Modern Top Menu */
    @media (min-width: 922px) {
        .elementskit-navbar-nav > li > a {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            font-weight: 500 !important;
            color: #334155 !important;
            transition: color 0.2s ease !important;
        }
        .elementskit-navbar-nav > li > a:hover {
            color: #046bd2 !important;
        }
    }
</style>"""

content = content.replace(old_custom_menu_css, new_custom_menu_css)

# Write the modified content back
with open('build_site.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("Applied logo and top menu styling!")
