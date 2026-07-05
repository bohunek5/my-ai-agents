import os
import shutil
import re

CLONE_HTML_PATH = "/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/index.html"
DOWNLOADS_HTML_PATH = "/Users/karolbohdanowicz/Downloads/Katalog_Akcesoriow_PRESCOT_2026.html"

CLONE_ASSETS_DIR = "/Users/karolbohdanowicz/my-ai-agents/prescot-akcesoria-klon/assets"
DOWNLOADS_ASSETS_DIR = "/Users/karolbohdanowicz/Downloads/assets"

os.makedirs(DOWNLOADS_ASSETS_DIR, exist_ok=True)

# 1. Copy assets to Downloads directory
src_k2018 = os.path.join(CLONE_ASSETS_DIR, "k2018")
dst_k2018 = os.path.join(DOWNLOADS_ASSETS_DIR, "k2018")
if os.path.exists(src_k2018):
    shutil.copytree(src_k2018, dst_k2018, dirs_exist_ok=True)

for i in range(1, 5):
    f = f"p13_{i}.png"
    src = os.path.join(CLONE_ASSETS_DIR, f)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(DOWNLOADS_ASSETS_DIR, f))

for logo in ["logo_dark.svg", "logo_light.svg"]:
    src = os.path.join(CLONE_ASSETS_DIR, logo)
    if os.path.exists(src):
        shutil.copy(src, os.path.join(DOWNLOADS_ASSETS_DIR, logo))

src_cover = os.path.join(CLONE_ASSETS_DIR, "cover.png")
if os.path.exists(src_cover):
    shutil.copy(src_cover, os.path.join(DOWNLOADS_ASSETS_DIR, "cover.png"))

# 2. Define the product database
# Removed Page 8 (Złączki Instalacyjne) and Page 10 (WAGO)
catalog_structure = [
    {
        "id": "zlaczki-do-tasm-led",
        "category": "Złączki do taśm LED",
        "series": "ZŁĄCZKI DO TAŚM LED / SERIA BASIC",
        "page": 1,
        "tables": [
            {
                "headers": ["", "Nr katalogowy", "Zakończenie", "Połączenie", "Zakończenie", "Przewód"],
                "rows": [
                    ["assets/k2018/basic_mono_1.png", "ZL-MONO-8MM-TP", "8mm", "14cm", "-", "2x0.35"],
                    ["assets/k2018/basic_mono_2.png", "ZL-MONO-8MM-TPT", "8mm", "14cm", "8mm", "2x0.35"],
                    ["assets/k2018/basic_mono_3.png", "ZL-MONO-8MM-TT", "8mm", "-", "8mm", "-"],
                    ["assets/k2018/basic_mono_4.png", "ZL-MONO-8MM-TZ-G2.1", "8mm", "15cm", "Gniazdo 5.5/2.1", "2x0.35"],
                    ["assets/k2018/basic_mono_4.png", "ZL-MONO-8MM-TZ-G2.5", "8mm", "15cm", "Gniazdo 5.5/2.5", "2x0.35"],
                    ["assets/k2018/basic_mono_1.png", "ZL-MONO-10MM-TP", "10mm", "14cm", "-", "2x0.35"],
                    ["assets/k2018/basic_mono_2.png", "ZL-MONO-10MM-TPT", "10mm", "14cm", "10mm", "2x0.35"],
                    ["assets/k2018/basic_mono_3.png", "ZL-MONO-10MM-TT", "10mm", "-", "10mm", "-"],
                    ["assets/k2018/basic_mono_4.png", "ZL-MONO-10MM-TZ-G2.1", "10mm", "15cm", "Gniazdo 5.5/2.1", "2x0.35"],
                    ["assets/k2018/basic_mono_4.png", "ZL-MONO-10MM-TZ-G2.5", "10mm", "15cm", "Gniazdo 5.5/2.5", "2x0.35"],
                    ["assets/k2018/basic_rgb_1.png", "ZL-RGB-10MM-TP", "10mm", "14cm", "-", "4x0.35"],
                    ["assets/k2018/basic_rgb_2.png", "ZL-RGB-10MM-TPT", "10mm", "14cm", "10mm", "4x0.35"],
                    ["assets/k2018/basic_rgb_3.png", "ZL-RGB-10MM-TT", "10mm", "-", "10mm", "-"],
                    ["assets/k2018/basic_mono_4.png", "ZL-RGB-10MM-TZ-G2.1", "10mm", "15cm", "Gniazdo 5.5/2.1", "4x0.35"],
                    ["assets/k2018/basic_rgbw_1.png", "ZL-RGBW-10MM-TP", "10mm", "14cm", "-", "5x0.35"],
                    ["assets/k2018/basic_rgbw_2.png", "ZL-RGBW-10MM-TPT", "10mm", "14cm", "10mm", "5x0.35"],
                    ["assets/k2018/basic_rgbw_3.png", "ZL-RGBW-10MM-TT", "10mm", "-", "10mm", "-"],
                    ["assets/k2018/basic_rgbw_1.png", "ZL-RGBW-12MM-TP", "12mm", "14cm", "-", "5x0.35"],
                    ["assets/k2018/basic_rgbw_2.png", "ZL-RGBW-12MM-TPT", "12mm", "14cm", "12mm", "5x0.35"],
                    ["assets/k2018/basic_rgbw_3.png", "ZL-RGBW-12MM-TT", "12mm", "-", "12mm", "-"],
                    ["assets/k2018/basic_mono_4.png", "ZL-RGBW-12MM-TZ-G2.1", "12mm", "15cm", "Gniazdo 5.5/2.1", "5x0.35"]
                ]
            }
        ]
    },
    {
        "id": "zlaczki-seria-hipp",
        "category": "Złączki do taśm LED",
        "series": "ZŁĄCZKI DO TAŚM LED / SERIA HIPP",
        "page": 2,
        "tables": [
            {
                "headers": ["", "Nr katalogowy", "Zakończenie", "Zakończenie", "Zastosowanie"],
                "rows": [
                    ["assets/k2018/hipp_mono_tp.png", "PR-ZLH8-TP", "8mm", "max 2x0.50", "Do połączenia taśmy bez żelu z przewodem"],
                    ["assets/k2018/hipp_mono_tp.png", "PR-ZLH10-TP", "10mm", "max 2x0.50", "Do połączenia taśmy bez żelu z przewodem"],
                    ["assets/k2018/hipp_mono_tt.png", "PR-ZLH8-TT", "8mm", "8mm", "Do połączenia dwóch taśm bez żelu"],
                    ["assets/k2018/hipp_mono_tt.png", "PR-ZLH10-TT", "10mm", "10mm", "Do połączenia dwóch taśm bez żelu"],
                    ["assets/k2018/hipp_rgb_tp.png", "PR-ZLH10-RGB-TP", "10mm", "max 4x0.50", "Do połączenia taśmy bez żelu z przewodem"],
                    ["assets/k2018/hipp_rgb_tp.png", "PR-ZLH12-RGBW-TP", "12mm", "max 5x0.50", "Do połączenia taśmy bez żelu z przewodem"],
                    ["assets/k2018/hipp_rgb_tt.png", "PR-ZLH10-RGB-TT", "10mm", "10mm", "Do połączenia dwóch taśm bez żelu"],
                    ["assets/k2018/hipp_rgb_tt.png", "PR-ZLH12-RGBW-TT", "12mm", "12mm", "Do połączenia dwóch taśm bez żelu"],
                    ["assets/k2018/hipp_w_tp.png", "PR-ZLH8W-TP", "8mm", "max 2x0.50", "Do połączenia taśmy w żelu z przewodem"],
                    ["assets/k2018/hipp_w_tp.png", "PR-ZLH10W-TP", "10mm", "max 2x0.50", "Do połączenia taśmy w żelu z przewodem"],
                    ["assets/k2018/hipp_w_tt.png", "PR-ZLH8W-TT", "8mm", "8mm", "Do połączenia dwóch taśm w żelu"],
                    ["assets/k2018/hipp_w_tt.png", "PR-ZLH10W-TT", "10mm", "10mm", "Do połączenia dwóch taśm w żelu"],
                    ["assets/k2018/hipp_rgb_tp.png", "PR-ZLH10W-RGB-TP", "10mm", "max 4x0.50", "Do połączenia taśmy w żelu z przewodem"],
                    ["assets/k2018/hipp_rgb_tp.png", "PR-ZLH12W-RGBW-TP", "12mm", "max 5x0.50", "Do połączenia taśmy w żelu z przewodem"],
                    ["assets/k2018/hipp_rgb_tt.png", "PR-ZLH10W-RGB-TT", "10mm", "10mm", "Do połączenia dwóch taśm w żelu"],
                    ["assets/k2018/hipp_rgb_tt.png", "PR-ZLH12W-RGBW-TT", "12mm", "12mm", "Do połączenia dwóch taśm w żelu"]
                ]
            }
        ]
    },
    {
        "id": "zlaczki-seria-pcb",
        "category": "Złączki do taśm LED",
        "series": "ZŁĄCZKI DO TAŚM LED / SERIA PCB",
        "page": 3,
        "tables": [
            {
                "headers": ["", "Nr katalogowy", "Zakończenie", "Model", "Zastosowanie"],
                "rows": [
                    ["assets/k2018/pcb_mono_1.png", "PR-ZL8L-PCB-MONO", "8mm", "L", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_mono_2.png", "PR-ZL8T-PCB-MONO", "8mm", "T", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_mono_3.png", "PR-ZL8X-PCB-MONO", "8mm", "X", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_mono_1.png", "PR-ZL10L-PCB-MONO", "10mm", "L", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_mono_2.png", "PR-ZL10T-PCB-MONO", "10mm", "T", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_mono_3.png", "PR-ZL10X-PCB-MONO", "10mm", "X", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_1.png", "PR-ZL10L-PCB-RGB", "10mm", "L", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_2.png", "PR-ZL10T-PCB-RGB", "10mm", "T", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_3.png", "PR-ZL10X-PCB-RGB", "10mm", "X", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_1.png", "PR-ZL10L-PCB-RGBW", "10mm", "L", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_2.png", "PR-ZL10T-PCB-RGBW", "10mm", "T", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_3.png", "PR-ZL10X-PCB-RGBW", "10mm", "X", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_1.png", "PR-ZL12L-PCB-RGBW", "12mm", "L", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_2.png", "PR-ZL12T-PCB-RGBW", "12mm", "T", "Do połączenia taśm bez żelu"],
                    ["assets/k2018/pcb_rgb_3.png", "PR-ZL12X-PCB-RGBW", "12mm", "X", "Do połączenia taśm bez żelu"]
                ]
            }
        ]
    },
    {
        "id": "zasilanie-i-rozgalezniki-dc",
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "KABLE DC / WTYKI I ROZGAŁĘŹNIKI",
        "page": 4,
        "tables": [
            {
                "title": "Wtyki DC z przewodem",
                "headers": ["", "Numer katalogowy", "Zakończenie", "Połączenie", "Zakończenie", "Przewód", "Kolor"],
                "rows": [
                    ["assets/k2018/wt_dc_1.png", "WT-DC-5.5/2.1+15", "5.5/2.1", "15cm", "-", "2x0.35", "biały"],
                    ["assets/k2018/wt_dc_2.png", "WT-DC-5.5/2.1+15CZ", "5.5/2.1", "15cm", "-", "2x0.35", "czarny"],
                    ["assets/k2018/wt_dc_1.png", "WT-DC-5.5/2.5+15", "5.5/2.5", "15cm", "-", "2x0.35", "biały"],
                    ["assets/k2018/wt_dc_2.png", "WT-DC-5.5/2.5+15CZ", "5.5/2.5", "15cm", "-", "2x0.35", "czarny"],
                    ["assets/k2018/wt_dc_3.png", "WT-DC-5.5/2.1+150", "5.5/2.1", "150cm", "-", "2x0.35", "biały"],
                    ["assets/k2018/wt_dc_4.png", "WT-DC-5.5/2.1+150CZ", "5.5/2.1", "150cm", "-", "2x0.35", "czarny"],
                    ["assets/k2018/wt_dc_3.png", "WT-DC-5.5/2.5+150", "5.5/2.5", "150cm", "-", "2x0.35", "biały"],
                    ["assets/k2018/wt_dc_4.png", "WT-DC-5.5/2.5+150CZ", "5.5/2.5", "150cm", "-", "2x0.35", "czarny"]
                ]
            },
            {
                "title": "Przewody i rozgałęźniki DC",
                "headers": ["", "Numer katalogowy", "Zakończenie", "Połączenie", "Zakończenie", "Przewód", "Kolor"],
                "rows": [
                    ["assets/k2018/roz_dc_1.png", "ROZ-DC-5.5/2.1-2X1CZ", "5.5/2.1 x2", "24cm", "5.5/2.1", "2x0.35/2x0.50", "czarny"],
                    ["assets/k2018/roz_dc_2.png", "ROZ-DC-5.5/2.1-3X1CZ", "5.5/2.1 x3", "24cm", "5.5/2.1", "2x0.35/2x0.50", "czarny"],
                    ["assets/k2018/roz_dc_3.png", "ROZ-DC-5.5/2.1-4X1CZ", "5.5/2.1 x4", "24cm", "5.5/2.1", "2x0.35/2x0.50", "czarny"],
                    ["assets/k2018/roz_dc_4.png", "ROZ-DC-5.5/2.1-5XCZ", "5.5/2.1 x5", "24cm", "5.5/2.1", "2x0.35/2x0.50", "czarny"],
                    ["assets/k2018/roz_dc_5.png", "ROZ-DC-5.5/2.1-6XCZ", "5.5/2.1 x6", "24cm", "5.5/2.1", "2x0.35/2x0.50", "czarny"],
                    ["assets/k2018/roz_dc_6.png", "DC-DC-150_5.5/2.1", "5.5/2.1", "150cm", "5.5/2.1", "2x0.35", "czarny"]
                ]
            }
        ]
    },
    {
        "id": "zlacza-zip-i-rgb",
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "ZŁĄCZA DC HERMETYCZNE I RGB",
        "page": 5,
        "tables": [
            {
                "headers": ["", "Numer katalogowy", "Zakończenie", "Połączenie", "Zakończenie", "Przewód"],
                "rows": [
                    ["assets/k2018/zip_female.png", "LED-ZIP-Ż", "5.5/2.1", "15cm", "-", "2x0.50"],
                    ["assets/k2018/zip_male.png", "LED-ZIP-M", "5.5/2.1", "15cm", "-", "2x0.50"],
                    ["assets/k2018/zip_rgb_female.png", "LED-ZIP-Ż-RGB", "4 pin", "15cm", "-", "4x0.50"],
                    ["assets/k2018/zip_rgb_male.png", "LED-ZIP-M-RGB", "4 pin", "15cm", "-", "4x0.50"],
                    ["assets/k2018/zip_rgb_female.png", "LED-ZIP-Ż-RGBW", "5 pin", "15cm", "-", "5x0.50"],
                    ["assets/k2018/zip_rgb_male.png", "LED-ZIP-M-RGBW", "5 pin", "15cm", "-", "5x0.50"],
                    ["assets/k2018/rgb_gn.png", "GN-RGB-4PIN15", "4 pin", "15cm", "-", "4x0.35"],
                    ["assets/k2018/rgb_wtyk_cz.png", "WTYK-RGB-4PIN15", "4 pin", "15cm", "-", "4x0.35"],
                    ["assets/k2018/rgb_wtyk_cz.png", "WTYK-RGB-4PIN-B", "4 pin", "-", "-", "4x0.35"],
                    ["assets/k2018/rgb_wtyk_cz.png", "WTYK-RGB-4PIN-CZ", "4 pin", "-", "-", "4x0.35"]
                ]
            }
        ]
    },
    {
        "id": "wtyki-i-gniazda-dc",
        "category": "Zasilanie i Rozgałęźniki DC",
        "series": "WTYKI I GNIAZDA DC",
        "page": 6,
        "tables": [
            {
                "title": "Wtyki DC",
                "headers": ["", "Numer katalogowy", "Zakończenie", "Montaż"],
                "rows": [
                    ["assets/k2018/wt_pp.png", "WT-DC-5.5/2.1-PP", "5.5/2.1", "na przewód"],
                    ["assets/k2018/wt_pp.png", "WT-DC-5.5/2.5-PP", "5.5/2.5", "na przewód"],
                    ["assets/k2018/gn_zs.png", "WT-DC-5.5/2.1ZS", "5.5/2.1", "zacisk śrubowy"],
                    ["assets/k2018/gn_zs.png", "WT-DC-5.5/2.5ZS", "5.5/2.5", "zacisk śrubowy"]
                ]
            },
            {
                "title": "Gniazda DC",
                "headers": ["", "Numer katalogowy", "Zakończenie", "Montaż"],
                "rows": [
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.1-OB1", "5.5/2.1", "do obudowy od wewnątrz"],
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.5-OB1", "5.5/2.5", "do obudowy od wewnątrz"],
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.1-OBP", "5.5/2.1", "do obudowy od wewnątrz"],
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.5-OBP", "5.5/2.5", "do obudowy od wewnątrz"],
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.1-OBP2", "5.5/2.1", "do obudowy z zewnątrz"],
                    ["assets/k2018/gn_ob1.png", "GN-DC-5.5/2.5-OBP2", "5.5/2.5", "do obudowy z zewnątrz"],
                    ["assets/k2018/wt_pp.png", "GN-DC-5.5/2.1-P", "5.5/2.1", "na przewód"],
                    ["assets/k2018/wt_pp.png", "GN-DC-5.5/2.5-P", "5.5/2.5", "na przewód"],
                    ["assets/k2018/gn_zs.png", "GN-DC-5.5/2.1ZS", "5.5/2.1", "zacisk śrubowy"],
                    ["assets/k2018/gn_zs.png", "GN-DC-5.5/2.5ZS", "5.5/2.5", "zacisk śrubowy"]
                ]
            }
        ]
    },
    {
        "id": "kable-i-szybkozlaczki",
        "category": "Kable i Szybkozłączki",
        "series": "ZŁĄCZKI / SERIA KLIK",
        "page": 7,
        "tables": [
            {
                "headers": ["", "Numer katalogowy", "Zakończenie", "Połączenie", "Zakończenie", "Przewód"],
                "rows": [
                    ["assets/k2018/real_p8_img_1_xref212.jpeg", "LED-Z2P-Ż", "2 pin", "14cm", "-", "2x0.35"],
                    ["assets/k2018/real_p8_img_2_xref214.jpeg", "LED-Z2P-M", "2 pin", "14cm", "-", "2x0.35"],
                    ["assets/k2018/real_p8_img_2_xref214.jpeg", "TAM-GM-14", "2 pin", "14cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_1_xref212.jpeg", "TAM-WZ-14", "2 pin", "14cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_1_xref212.jpeg", "ZL-2PIN-WS", "konektor żeński 6.3/2.5", "-", "konektor męski 6.3/2.5", "-"],
                    ["assets/k2018/real_p8_img_5_xref222.jpeg", "ZL-2PIN-KLIK-W", "2 pin", "15cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_6_xref224.jpeg", "ZL-2PIN-KLIK-G", "2 pin", "15cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_5_xref222.jpeg", "ZL-2PIN-KLIK300-W", "2 pin", "300cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_6_xref224.jpeg", "ZL-2PIN-KLIK300-G", "2 pin", "300cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_4_xref218.jpeg", "ZL-2PIN-KLIK", "2 pin", "15+15cm", "-", "2x0.50"],
                    ["assets/k2018/real_p8_img_4_xref218.jpeg", "ZL-2PIN-KLIK300+15", "2 pin", "300+15cm", "-", "2x0.50"]
                ]
            }
        ]
    },
    {
        "id": "zlaczki-fast-i-listwy",
        "category": "Kable i Szybkozłączki",
        "series": "ZŁĄCZKI / SERIA FAST I LISTWY",
        "page": 8,
        "tables": [
            {
                "title": "Seria FAST",
                "headers": ["", "Numer katalogowy", "Model", "Zastosowanie"],
                "rows": [
                    ["assets/k2018/fast_t1.png", "PR-ZPF-T1", "T", "Do rozgałęzienia przewodu jedno lub dwużyłowego"],
                    ["assets/k2018/fast_t1.png", "PR-ZPF-T2", "T", "Do rozgałęzienia przewodu jedno lub dwużyłowego"],
                    ["assets/k2018/fast_h1.png", "PR-ZPF-H1", "H", "Do połączenia dwóch przewodów jedno lub dwużyłowych"],
                    ["assets/k2018/fast_h1.png", "PR-ZPF-H2", "H", "Do połączenia dwóch przewodów jedno lub dwużyłowych"]
                ]
            },
            {
                "title": "Złączki skręcane 12-torowe",
                "headers": ["", "Numer katalogowy", "Zakończenie", "Zakończenie", "Typ złącza"],
                "rows": [
                    ["assets/k2018/listwa_b.png", "ZL-12X2.5B", "2.5mm", "2.5mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X4B", "4mm", "4mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X6B", "6mm", "6mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X10B", "10mm", "10mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X16B", "16mm", "16mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X25B", "25mm", "25mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X2.5P", "2.5mm", "2.5mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X4P", "4mm", "4mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X6P", "6mm", "6mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X10P", "10mm", "10mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X16P", "16mm", "16mm", "Skręcane"],
                    ["assets/k2018/listwa_b.png", "ZL-12X25P", "25mm", "25mm", "Skręcane"]
                ]
            }
        ]
    },
    {
        "id": "przyciski-i-wlaczniki",
        "category": "Przyciski i Włączniki",
        "series": "PRZYCISKI I WŁĄCZNIKI",
        "page": 9,
        "tables": [
            {
                "headers": ["", "Nr katalogowy", "Kolor przycisku/obudowy", "Kolor podświetlenia", "Ilość pozycji", "Otwór montażowy"],
                "rows": [
                    ["assets/k2018/ps11abk.png", "PS11ABK", "czarny/czarny", "-", "2", "12mm"],
                    ["assets/k2018/prz_led_blue.png", "PRZ-LED-12-B", "srebrny", "niebieski", "2", "16mm"],
                    ["assets/k2018/prz_led_blue.png", "PRZ-LED-12-BO", "srebrny", "niebieski", "2", "16mm"],
                    ["assets/k2018/prz_led_blue.png", "PRZ-LED-12-G", "srebrny", "zielony", "2", "16mm"],
                    ["assets/k2018/prz_led_blue.png", "PRZ-LED-12-R", "srebrny", "czerwony", "2", "16mm"],
                    ["assets/k2018/real_p12_img_19_xref407.png", "PR-WLK-B", "biały/biały", "-", "2", "19.4mm"],
                    ["assets/k2018/real_p12_img_18_xref405.jpeg", "PR-WLK-CZ", "czarny/czarny", "-", "2", "19.4mm"],
                    ["assets/k2018/real_p12_img_20_xref409.jpeg", "PR-WLK-SZ", "szary/szary", "-", "2", "19.4mm"]
                ]
            }
        ]
    },
    {
        "id": "zlaczki-hermetyczne-ip68",
        "category": "Złączki Hermetyczne IP68",
        "series": "ZŁĄCZKI HERMETYCZNE NA PRZEWÓD",
        "page": 10,
        "tables": [
            {
                "headers": ["", "Nr katalogowy", "Rodzaj", "Ilość pinów", "Przewód", "IP", "IK"],
                "rows": [
                    ["assets/k2018/thb_381_a.png", "THB.381.A2A", "wtyk", "2", "0.25-1.5mm2", "IP69K/IP68", "IK06"],
                    ["assets/k2018/thb_381_a.png", "THB.381.B2A", "gniazdo", "2", "0.25-1.5mm2", "IP69K/IP68", "IK06"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.A3A", "wtyk", "3", "0.5-4mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.B3A", "gniazdo", "3", "0.5-4mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.A4A", "wtyk", "4", "0.5-4mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.B4A", "gniazdo", "4", "0.5-4mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.A5A", "wtyk", "5", "0.25-1.5mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_387_a5.png", "THB.387.B5A", "gniazdo", "5", "0.25-1.5mm2", "IP66/IP68", "-"],
                    ["assets/k2018/thb_391_a3.png", "THB.391.A2A", "złączka", "2", "0.5-4mm2", "IP68", "-"],
                    ["assets/k2018/thb_391_a3.png", "THB.391.A3A", "złączka", "3", "0.5-4mm2", "IP68", "-"],
                    ["assets/k2018/thb_391_a3.png", "THB.391.A4A", "złączka", "4", "0.5-4mm2", "IP68", "-"]
                ]
            }
        ]
    }
]

# Generate main content HTML
sections_html = ""
current_category = ""

for sec in catalog_structure:
    cat = sec["category"]
    ser = sec["series"]
    page_num = sec["page"]
    tables = sec["tables"]
    sec_id = sec["id"]
    
    # Category Header
    if cat != current_category:
        if current_category != "":
            sections_html += "</div></div></section>"
        current_category = cat
        sections_html += f"""
        <section id="{sec_id}" class="py-12 border-b border-gray-100 scroll-mt-24">
            <div class="max-w-7xl mx-auto px-6">
                <div class="mb-10 border-l-4 border-prescot-orange pl-6">
                    <h2 class="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">{cat}</h2>
                </div>
                <div class="grid grid-cols-1 gap-10">
        """
        
    # Generate tables
    tables_html = ""
    for t in tables:
        title_html = ""
        if "title" in t:
            title_html = f'<h4 class="text-sm font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2">{t["title"]}</h4>'
            
        # Th headers
        th_html = ""
        for idx, h in enumerate(t["headers"]):
            if idx == 0:
                th_html += '<th class="pb-3 text-gray-400 font-bold uppercase tracking-wider text-[10px] w-24"></th>'
            else:
                th_html += f'<th class="pb-3 text-gray-400 font-bold uppercase tracking-wider text-[10px]">{h}</th>'
                
        # Rows
        tr_html = ""
        for r in t["rows"]:
            img_src = r[0]
            sku = r[1]
            
            td_html = ""
            for val_idx, val in enumerate(r):
                if val_idx == 0:
                    td_html += f'<td><div class="product-thumb"><img alt="{sku}" src="{img_src}"/></div></td>'
                elif val_idx == 1:
                    td_html += f'<td class="font-bold text-slate-900">{val}</td>'
                else:
                    td_html += f'<td>{val}</td>'
                    
            tr_html += f'<tr class="hover:bg-gray-50/50 transition-colors">{td_html}</tr>\n'
            
        tables_html += f"""
        <div class="mb-8">
            {title_html}
            <div class="overflow-x-auto">
                <table class="w-full text-xs text-left">
                    <thead>
                        <tr class="border-b border-gray-200">
                            {th_html}
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50">
                        {tr_html}
                    </tbody>
                </table>
            </div>
        </div>
        """
        
    sections_html += f"""
    <!-- SERIES BOX -->
    <div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-4">
            <div class="max-w-3xl">
                <h3 class="text-2xl font-black text-gray-900 tracking-tight uppercase">{ser}</h3>
            </div>
            <div class="mt-3 sm:mt-0 text-right">
                <span class="text-3xl font-black text-gray-900 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100 inline-block shadow-sm">{page_num}</span>
            </div>
        </div>
        {tables_html}
    </div>
    """

if current_category != "":
    sections_html += "</div></div></section>"

cover_src = "assets/cover.png"

# Full HTML template
full_html_content = f"""<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>PRESCOT LED • Złączki i Akcesoria Instalacyjne • Katalog B2B 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
    <script>
        tailwind.config = {{
            theme: {{
                extend: {{
                    fontFamily: {{
                        sans: ['Inter', 'sans-serif'],
                        heading: ['Outfit', 'sans-serif']
                    }},
                    colors: {{
                        'prescot-orange': '#E14E26',
                        'prescot-dark': '#354956'
                    }}
                }}
            }}
        }}
    </script>
    <style>
        h1, h2, h3, h4 {{
            font-family: 'Outfit', sans-serif;
        }}
        body {{
            scroll-behavior: smooth;
        }}
        @media print {{
            .no-print {{ display: none !important; }}
            body {{ background: white; }}
        }}
        main table {{
            font-size: 0.92rem !important;
            line-height: 1.35;
        }}
        main thead th {{
            font-size: 0.72rem !important;
            padding-bottom: 0.95rem !important;
            color: #64748b !important;
        }}
        main tbody td {{
            font-size: 0.92rem !important;
            padding-top: 0.9rem !important;
            padding-bottom: 0.9rem !important;
            vertical-align: middle;
        }}
        main tbody td:first-child {{
            width: 6.25rem;
        }}
        .product-thumb {{ width: 72px; height: 54px; display: grid; place-items: center; border: 1px solid #e5e7eb; border-radius: 8px; background: #fff; overflow: hidden; cursor: pointer; transition: border-color 0.2s; }}
        .product-thumb:hover {{ border-color: #E14E26; }}
        .product-thumb img {{ max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.2s; }}
        .product-thumb:hover img {{ transform: scale(1.1); }}
        main table th:first-child, main table td:first-child {{ width: 92px; }}

        /* Lightbox Styles */
        .lightbox-overlay {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(8px);
            z-index: 100;
            opacity: 0;
            transition: opacity 0.25s ease-in-out;
            justify-content: center;
            align-items: center;
        }}
        .lightbox-overlay.active {{
            display: flex;
            opacity: 1;
        }}
        .lightbox-content {{
            position: relative;
            max-width: 90vw;
            max-height: 85vh;
            background: white;
            padding: 16px;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
            transform: scale(0.9);
            transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }}
        .lightbox-overlay.active .lightbox-content {{
            transform: scale(1);
        }}
        .lightbox-img {{
            max-width: 100%;
            max-height: 70vh;
            object-fit: contain;
            border-radius: 12px;
        }}
        .lightbox-close {{
            position: absolute;
            top: -16px;
            right: -16px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: white;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
            color: #475569;
        }}
        .lightbox-close:hover {{
            background: #f1f5f9;
            transform: scale(1.1);
            color: #0f172a;
        }}
        .lightbox-caption {{
            text-align: center;
            margin-top: 12px;
            font-family: 'Outfit', sans-serif;
            font-size: 1.1rem;
            font-weight: 800;
            color: #1e293b;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}
    </style>
</head>
<body class="bg-[#F6F8F9] text-gray-800 antialiased font-sans">

    <!-- HEADER / NAVIGATION -->
    <header class="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200/60 z-50 no-print">
        <div class="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <a class="flex items-center gap-3" href="#">
                <img alt="PRESCOT Logo" class="h-6" src="assets/logo_dark.svg"/>
                <span class="text-xs font-bold uppercase tracking-wider text-gray-400 border-l border-gray-200 pl-3">Akcesoria LED</span>
            </a>
            
            <nav class="hidden lg:flex gap-6 text-xs font-semibold text-gray-500">
                <a class="hover:text-prescot-orange transition-colors" href="#zlaczki-do-tasm-led">Złączki LED</a>
                <a class="hover:text-prescot-orange transition-colors" href="#zasilanie-i-rozgalezniki-dc">Kable DC</a>
                <a class="hover:text-prescot-orange transition-colors" href="#kable-i-szybkozlaczki">Złączki Klik</a>
                <a class="hover:text-prescot-orange transition-colors" href="#przyciski-i-wlaczniki">Włączniki</a>
                <a class="hover:text-prescot-orange transition-colors" href="#zlaczki-hermetyczne-ip68">Złącza IP68</a>
            </nav>
            
            <button class="bg-prescot-orange hover:bg-prescot-orange-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md" onclick="window.print()">
                Drukuj Katalog (PDF)
            </button>
        </div>
    </header>

    <!-- COMPACT BRAND BANNER -->
    <section class="relative bg-white border-b border-gray-200 py-12 overflow-hidden">
        <div class="absolute inset-0 z-0 opacity-[0.02]">
            <img src="{cover_src}" class="w-full h-full object-cover">
        </div>
        <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h1 class="text-4xl font-black text-gray-900 leading-none uppercase tracking-tight">
                    Osprzęt i Złączki <span class="text-prescot-orange">LED</span>
                </h1>
            </div>
            <div class="flex items-center gap-4 bg-gray-50 border border-gray-100 p-3 rounded-xl no-print">
                <div class="w-10 h-10 rounded-lg bg-prescot-orange/10 flex items-center justify-center text-prescot-orange font-bold font-sans">2026</div>
                <div class="text-xs">
                    <div class="font-bold text-gray-900">Aktualne wydanie</div>
                </div>
            </div>
        </div>
    </section>

    <!-- MAIN PRODUCTS -->
    <main class="py-8">
        {sections_html}
    </main>

    <!-- LIGHTBOX OVERLAY -->
    <div id="lightbox" class="lightbox-overlay no-print" onclick="closeLightbox(event)">
        <div class="lightbox-content" onclick="event.stopPropagation()">
            <button class="lightbox-close" onclick="closeLightbox(event)">&times;</button>
            <img id="lightbox-img" src="" alt="Powiększenie produktu" class="lightbox-img" />
            <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
    </div>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-white py-12 no-print border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <img alt="PRESCOT Logo" class="h-6 mb-4" src="assets/logo_light.svg"/>
                <p class="text-gray-500 text-xs max-w-xs">Producent i dystrybutor profesjonalnych systemów oświetleniowych LED, zasilaczy wodoszczelnych oraz akcesoriów montażowych dla B2B.</p>
            </div>
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Dystrybucja i Jakość</h4>
                <p class="text-gray-500 text-xs">Wszystkie produkty są objęte pełną gwarancją i posiadają certyfikaty zgodności CE oraz RoHS. Towar dostępny od ręki.</p>
            </div>
            <div>
                <h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Kontakt B2B</h4>
                <p class="text-gray-500 text-xs">PRESCOT Sp. z o.o. | prescot.pl | E-mail: biuro@prescot.pl</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
            <p>© 2026 PRESCOT Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
            <p>Wydanie: Styczeń 2026</p>
        </div>
    </footer>

    <script>
        function openLightbox(imgSrc, sku) {{
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');
            
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = sku;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }}

        function closeLightbox(event) {{
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }}

        document.addEventListener('keydown', function(e) {{
            if (e.key === 'Escape') {{
                closeLightbox();
            }}
        }});

        // Attach click events to product thumbs
        document.addEventListener('DOMContentLoaded', function() {{
            const thumbs = document.querySelectorAll('.product-thumb');
            thumbs.forEach(thumb => {{
                const img = thumb.querySelector('img');
                if (img) {{
                    thumb.addEventListener('click', function() {{
                        openLightbox(img.src, img.alt);
                    }});
                }}
            }});
        }});
    </script>
</body>
</html>
"""

# Write to both target paths
with open(CLONE_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html_content)

with open(DOWNLOADS_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html_content)

print("Katalog zaktualizowany zgodnie z najnowszymi wytycznymi użytkownika.")
