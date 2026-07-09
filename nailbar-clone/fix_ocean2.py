import ftplib
import urllib.request

FTP_HOST = "serwer194525.lh.pl"
FTP_USER = "serwer194525"
FTP_PASS = "KochamAntygravity2026$"
FTP_DIR = "public_html/zeglarstwomazury.pl"

code = """<?php
require_once('wp-load.php');
// The issue is that get_theme_mod('op_portfolio_filter_typo_font_family') is returning an array/object instead of string
// Let's clear the problematic theme mods
remove_theme_mod('op_portfolio_filter_typo_font_family');
remove_theme_mod('op_portfolio_title_typo_font_family');
remove_theme_mod('op_portfolio_category_typo_font_family');
echo "OceanWP Portfolio fonts theme mods removed.\\n";
"""

with open("fix_ocean2.php", "w") as f:
    f.write(code)

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    ftp.cwd(FTP_DIR)
    with open("fix_ocean2.php", 'rb') as f:
        ftp.storbinary('STOR fix_ocean2.php', f)
    ftp.quit()
    
    req = urllib.request.Request("https://zeglarstwomazury.pl/fix_ocean2.php", headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print(response.read().decode('utf-8'))
except Exception as e:
    print("Error:", e)
