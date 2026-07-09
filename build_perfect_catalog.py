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
        "id": "zlaczki-seria-fc",
        "category": "Złączki do taśm LED",
        "series": "ZŁĄCZKI DO TAŚM LED / SERIA FC",
        "page": 1,
        "tables": [
            {
                "title": "Złączki 9-in-1 Multi (do taśm SMD/COB)",
                "headers": ["", "Nr katalogowy", "Szerokość taśmy", "Długość przewodu", "Rodzaj złącza", "Typ połączenia"],
                "rows": [
                    ["assets/k2018/fc8_mono_multi_9in1.jpg", "FC8-MONO-MULTI-9IN1", "8mm", "-", "szybkozłączka", "wsuwane (9-in-1)"],
                    ["assets/k2018/fc10_mono_multi_9in1.jpg", "FC10-MONO-MULTI-9IN1", "10mm", "-", "szybkozłączka", "wsuwane (9-in-1)"]
                ]
            },
            {
                "title": "Złączki Seria FC (taśma-taśma, taśma-przewód)",
                "headers": ["", "Nr katalogowy", "Szerokość taśmy", "Długość przewodu", "Rodzaj złącza", "Typ połączenia"],
                "rows": [
                    ["assets/k2018/fc8_mono_multi.jpg", "FC8-MONO-MULTI", "8mm", "-", "szybkozłączka", "zaciskowe (taśma-taśma / taśma-przewód)"],
                    ["assets/k2018/fc10_mono_multi.jpg", "FC10-MONO-MULTI", "10mm", "-", "szybkozłączka", "zaciskowe (taśma-taśma / taśma-przewód)"],
                    ["assets/k2018/fc8_mono_multi_tp.jpg", "FC8-MONO-MULTI-TP", "8mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc10_mono_multi_tp.jpg", "FC10-MONO-MULTI-TP", "10mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc8_mono_multi_tpt.jpg", "FC8-MONO-MULTI-TPT", "8mm", "15cm", "szybkozłączka", "taśma-przewód-taśma"],
                    ["assets/k2018/fc10_mono_multi_tpt.jpg", "FC10-MONO-MULTI-TPT", "10mm", "15cm", "szybkozłączka", "taśma-przewód-taśma"],
                    ["assets/k2018/fc8_mono_multi_l.jpg", "FC8-MONO-MULTI-L", "8mm", "-", "szybkozłączka", "taśma-taśma L"],
                    ["assets/k2018/fc10_mono_multi_l.jpg", "FC10-MONO-MULTI-L", "10mm", "-", "szybkozłączka", "taśma-taśma L"],
                    ["assets/k2018/fc8_mono_multi_t.jpg", "FC8-MONO-MULTI-T", "8mm", "-", "szybkozłączka", "taśma-taśma T"],
                    ["assets/k2018/fc10_mono_multi_t.jpg", "FC10-MONO-MULTI-T", "10mm", "-", "szybkozłączka", "taśma-taśma T"],
                    ["assets/k2018/fc8_smd_cct_tp.jpg", "FC8-SMD-CCT-TP", "8mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc10_cob_rgb_tp.jpg", "FC10-COB-RGB-TP", "10mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc10_cob_rgb_tpt.jpg", "FC10-COB-RGB-TPT", "10mm", "15cm", "szybkozłączka", "taśma-przewód-taśma"],
                    ["assets/k2018/fc10_smd_rgb_tp.jpg", "FC10-SMD-RGB-TP", "10mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc10_smd_rgb_tpt.jpg", "FC10-SMD-RGB-TPT", "10mm", "15cm", "szybkozłączka", "taśma-przewód-taśma"],
                    ["assets/k2018/fc10_smd_rgbw_tp.jpg", "FC10-SMD-RGBW-TP", "10mm", "15cm", "szybkozłączka", "taśma-przewód"],
                    ["assets/k2018/fc10_smd_rgbw_tpt.jpg", "FC10-SMD-RGBW-TPT", "10mm", "15cm", "szybkozłączka", "taśma-przewód-taśma"]
                ]
            }
        ]
    },
    {
        "id": "zlaczki-do-tasm-led",
        "category": "Złączki do taśm LED",
        "series": "ZŁĄCZKI DO TAŚM LED / SERIA BASIC",
        "page": 2,
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
        "page": 3,
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
        "page": 4,
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
        "page": 5,
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
        "page": 6,
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
        "page": 7,
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
        "page": 8,
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
        "page": 9,
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
        "page": 10,
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
        "page": 11,
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

def extract_row_metadata(headers, row):
    width = "all"
    wire = "all"
    connector = "all"
    connection = "all"
    
    sku = row[1] if len(row) > 1 else ""
    sku_l = sku.lower()
    
    # Deducing width
    for idx, h in enumerate(headers):
        val = str(row[idx]).lower()
        if "szerokość" in h.lower() or "zakończenie" in h.lower() or "rodzaj" in h.lower():
            if "8mm" in val or "8 mm" in val: width = "8mm"
            elif "10mm" in val or "10 mm" in val: width = "10mm"
            elif "12mm" in val or "12 mm" in val: width = "12mm"
                
    if width == "all":
        if "8mm" in sku_l or "fc8" in sku_l: width = "8mm"
        elif "10mm" in sku_l or "fc10" in sku_l or "12-b" in sku_l or "12-bo" in sku_l or "12-g" in sku_l or "12-r" in sku_l: width = "10mm"
        elif "12mm" in sku_l: width = "12mm"
            
    # Deducing wire
    for idx, h in enumerate(headers):
        val = str(row[idx]).lower()
        if "długość" in h.lower() or "połączenie" in h.lower() or "przewód" in h.lower():
            if "14cm" in val or "14 cm" in val: wire = "14cm"
            elif "15cm" in val or "15 cm" in val: wire = "15cm"
            elif "24cm" in val or "24 cm" in val: wire = "24cm"
            elif "150cm" in val or "150 cm" in val or "1.5m" in val: wire = "150cm"
            elif "300cm" in val or "300 cm" in val or "3m" in val: wire = "300cm"
            
    if wire == "all":
        if "+15" in sku_l or "klik" in sku_l or "15cm" in sku_l:
            if "300+15" in sku_l: wire = "300cm"
            else: wire = "15cm"
        elif "+150" in sku_l or "-150" in sku_l: wire = "150cm"
        elif "300" in sku_l: wire = "300cm"
        elif "14" in sku_l: wire = "14cm"
        elif "24" in sku_l: wire = "24cm"
        elif "tpt" in sku_l or "tp" in sku_l: wire = "14cm"
        else: wire = "brak"
        
    # Rodzaj złącza
    if "hermetycz" in sku_l or "ip68" in sku_l or "or-ae" in sku_l or "thb" in sku_l:
        connector = "hermetyczne"
    elif "wt-" in sku_l or "wtyk" in sku_l:
        connector = "wtyk"
    elif "gniazd" in sku_l or "gn-" in sku_l or "gn_ob" in sku_l:
        connector = "gniazdo"
    elif "klik" in sku_l or "fc" in sku_l or "zpf" in sku_l:
        connector = "szybkozłączka"
    elif "pcb" in sku_l:
        connector = "wsuwane"
    elif "hipp" in sku_l:
        connector = "zaciskowe"
    elif "listwa" in sku_l or "zl-12x" in sku_l:
        connector = "skręcane"
    elif "ps11" in sku_l or "prz-led" in sku_l or "pr-wlk" in sku_l:
        connector = "przełącznik"
    else:
        connector = "akcesoria"
        
    # Typ połączenia
    if "tpt" in sku_l or "taśma-przewód-taśma" in sku_l:
        connection = "taśma-przewód-taśma"
    elif "tp" in sku_l or "taśma-przewód" in sku_l:
        connection = "taśma-przewód"
    elif "tt" in sku_l or "taśma-taśma" in sku_l:
        connection = "taśma-taśma"
    elif "wtyk+gniazdo" in sku_l or "klik" in sku_l:
        connection = "wtyk+gniazdo"
    elif "rozgałęźnik" in sku_l or "roz-dc" in sku_l:
        connection = "rozgałęźnik"
    elif "ob1" in sku_l or "obp" in sku_l:
        connection = "panelowe"
    else:
        connection = "akcesoria"
        
    return width, wire, connector, connection

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
        <section id="{sec_id}" data-category="{cat}" class="category-section py-12 border-b border-gray-100 scroll-mt-24 transition-all duration-300">
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
            
            # Extract metadata
            width, wire, connector, connection = extract_row_metadata(t["headers"], r)
            
            td_html = ""
            for val_idx, val in enumerate(r):
                if val_idx == 0:
                    td_html += f'<td class="block sm:table-cell w-full p-3 sm:p-2 border-b border-gray-100 sm:border-0 bg-white sm:bg-transparent rounded-t-xl sm:rounded-none"><div class="product-thumb mx-auto h-32 sm:h-16 flex items-center justify-center"><img alt="{sku}" src="{img_src}" class="max-h-full max-w-full object-contain mix-blend-multiply"/></div></td>'
                elif val_idx == 1:
                    td_html += f'<td class="block sm:table-cell font-black text-slate-900 text-center sm:text-left p-2.5 sm:p-2 text-[13px] sm:text-xs bg-white sm:bg-transparent leading-tight">{val}</td>'
                else:
                    h_name = t["headers"][val_idx] if val_idx < len(t["headers"]) else ""
                    td_html += f'<td class="flex sm:table-cell justify-between items-center sm:block p-2 px-3 sm:p-2 text-[10px] sm:text-xs text-gray-600 border-b border-gray-50 sm:border-0 last:border-0 bg-white sm:bg-transparent"><span class="sm:hidden text-gray-400 font-bold uppercase tracking-wider text-[9px] w-1/2 text-left">{h_name}</span> <span class="font-semibold sm:font-normal text-right w-1/2">{val}</span></td>'
                    
            tr_html += f'<tr class="product-row block sm:table-row border border-gray-200 shadow-sm sm:shadow-none sm:border-0 rounded-xl sm:rounded-none overflow-hidden sm:overflow-visible hover:bg-white sm:hover:bg-gray-50/50 transition-all mb-4 sm:mb-0" data-width="{width}" data-wire="{wire}" data-connector="{connector}" data-connection="{connection}">{td_html}</tr>\\n'
            
        tables_html += f"""
        <div class="mb-10">
            {title_html}
            <div class="overflow-visible sm:overflow-x-auto px-1 sm:px-0">
                <table class="w-full text-xs text-left block sm:table">
                    <thead class="hidden sm:table-header-group">
                        <tr class="border-b border-gray-200">
                            {th_html}
                        </tr>
                    </thead>
                    <tbody class="grid grid-cols-2 gap-3 sm:table-row-group sm:divide-y sm:divide-gray-50">
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
        main table th:first-child, main table td:first-child {{ width: 92px; }}
        .category-section {{
            transition: opacity 0.25s ease-out, transform 0.25s ease-out;
        }}

        /* Mobile App Layout Adjustments */
        @media (max-width: 1024px) {{
            header.sticky {{
                display: none !important;
            }}
            .brand-banner {{
                display: none !important;
            }}
            .desktop-filter-bar {{
                display: none !important;
            }}
            main {{
                padding-top: 1rem !important;
                padding-bottom: 5.5rem !important;
            }}
            .category-section {{
                padding-top: 1.5rem !important;
                padding-bottom: 1.5rem !important;
            }}
            .category-section .max-w-7xl {{
                padding-left: 0.5rem !important;
                padding-right: 0.5rem !important;
            }}
            .overflow-x-auto table {{
                min-width: 640px !important;
            }}
        }}

        /* Bottom Sheet for Mobile Filters */
        .bottom-sheet-overlay {{
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease-out;
        }}
        .bottom-sheet-overlay.active {{
            display: block;
            opacity: 1;
        }}
        .bottom-sheet {{
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            border-top-left-radius: 24px;
            border-top-right-radius: 24px;
            box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.1), 0 -8px 10px -6px rgba(0, 0, 0, 0.1);
            z-index: 101;
            transform: translateY(100%);
            transition: transform 0.35s cubic-bezier(0.32, 0.94, 0.6, 1);
            max-height: 85vh;
            overflow-y: auto;
            padding-bottom: env(safe-area-inset-bottom, 24px);
        }}
        .bottom-sheet.active {{
            transform: translateY(0);
        }}
        .bottom-sheet-handle {{
            width: 40px;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            margin: 12px auto 8px;
        }}

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
                <a class="hover:text-prescot-orange transition-colors" href="#zlaczki-seria-fc">Seria FC</a>
                <a class="hover:text-prescot-orange transition-colors" href="#zlaczki-do-tasm-led">Złączki Basic</a>
                <a class="hover:text-prescot-orange transition-colors" href="#zasilanie-i-rozgalezniki-dc">Kable DC</a>
                <a class="hover:text-prescot-orange transition-colors" href="#kable-i-szybkozlaczki">Złączki Klik</a>
                <a class="hover:text-prescot-orange transition-colors" href="#przyciski-i-wlaczniki">Włączniki</a>
                <a class="hover:text-prescot-orange transition-colors" href="#zlaczki-hermetyczne-ip68">Złącza IP68</a>
            </nav>
        </div>
    </header>

    <!-- COMPACT BRAND BANNER -->
    <section class="brand-banner relative bg-white border-b border-gray-200 py-10 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h1 class="text-3xl font-black text-gray-900 leading-none uppercase tracking-tight">
                    Osprzęt i Złączki <span class="text-prescot-orange">LED</span>
                </h1>
            </div>
            <div class="flex items-center gap-2.5 bg-gray-50 border border-gray-100 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-600 no-print">
                <span class="text-prescot-orange font-black text-sm tracking-wide">2026</span>
                <span class="w-px h-3 bg-gray-200"></span>
                <span class="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Aktualne wydanie</span>
            </div>
        </div>
    </section>

    <!-- FILTER BAR -->
    <section class="desktop-filter-bar hidden md:block sticky top-16 bg-white/95 backdrop-blur-md border-b border-gray-200/60 py-3.5 z-40 no-print shadow-sm">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap gap-2 items-center mb-3">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Kategoria:</span>
                <button onclick="filterCategory('all', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-prescot-orange text-white border-prescot-orange shadow-sm">
                    Wszystko
                </button>
                <button onclick="filterCategory('Złączki do taśm LED', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900">
                    Złączki LED
                </button>
                <button onclick="filterCategory('Zasilanie i Rozgałęźniki DC', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900">
                    Kable & Wtyki DC
                </button>
                <button onclick="filterCategory('Kable i Szybkozłączki', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900">
                    Złączki Klik & Fast
                </button>
                <button onclick="filterCategory('Przyciski i Włączniki', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900">
                    Włączniki
                </button>
                <button onclick="filterCategory('Złączki Hermetyczne IP68', this)" class="filter-btn px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900">
                    Złącza IP68
                </button>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-gray-100">
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Szerokość taśmy</label>
                    <select id="filter-width" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-2.5 py-1.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolna</option>
                        <option value="8mm">8 mm</option>
                        <option value="10mm">10 mm</option>
                        <option value="12mm">12 mm</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Długość przewodu</label>
                    <select id="filter-wire" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-2.5 py-1.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolna</option>
                        <option value="brak">Brak przewodu</option>
                        <option value="14cm">14 cm</option>
                        <option value="15cm">15 cm</option>
                        <option value="24cm">24 cm</option>
                        <option value="150cm">1.5 m (150cm)</option>
                        <option value="300cm">3.0 m (300cm)</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Rodzaj złącza</label>
                    <select id="filter-connector" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-2.5 py-1.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolny</option>
                        <option value="szybkozłączka">Szybkozłączka (klik / fast)</option>
                        <option value="wsuwane">Wsuwane (PCB)</option>
                        <option value="zaciskowe">Zaciskowe (HIPP)</option>
                        <option value="wtyk">Wtyk DC</option>
                        <option value="gniazdo">Gniazdo DC</option>
                        <option value="hermetyczne">Hermetyczne IP68</option>
                        <option value="skręcane">Skręcane 12-torowe</option>
                        <option value="przełącznik">Przełącznik / Włącznik</option>
                        <option value="akcesoria">Pozostałe akcesoria</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Typ połączenia</label>
                    <select id="filter-connection" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-2.5 py-1.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolny</option>
                        <option value="taśma-taśma">Taśma - Taśma</option>
                        <option value="taśma-przewód">Taśma - Przewód</option>
                        <option value="taśma-przewód-taśma">Taśma - Przewód - Taśma</option>
                        <option value="wtyk+gniazdo">Wtyk + Gniazdo</option>
                        <option value="rozgałęźnik">Rozgałęźnik</option>
                        <option value="panelowe">Złącza panelowe</option>
                        <option value="akcesoria">Różne / Inne</option>
                    </select>
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
    <footer class="bg-gray-900 text-white py-12 pb-24 md:py-12 no-print border-t border-gray-800">
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
                <p class="text-gray-500 text-xs">PRESCOT Sp. z o.o. | prescot.pl | E-mail: komponenty@prescot.pl</p>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-800 text-[10px] text-gray-600 flex justify-between">
            <p>© 2026 PRESCOT Sp. z o.o. Wszelkie prawa zastrzeżone.</p>
            <p>Wydanie: Styczeń 2026</p>
        </div>
    </footer>

    <!-- BOTTOM MOBILE NAVIGATION BAR -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/80 h-16 flex justify-between items-center z-50 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] no-print px-8">
        <!-- Left brand text: NIEZAWODNE (navy) -->
        <span class="text-xs font-black uppercase tracking-widest text-[#354956] font-heading">Niezawodne</span>
        
        <!-- Center Action Filters Button -->
        <button onclick="openFiltersSheet()" class="flex flex-col items-center justify-center -mt-6 bg-prescot-orange text-white w-14 h-14 rounded-full shadow-lg border-4 border-white hover:scale-105 active:scale-95 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
        </button>

        <!-- Right brand text: POŁĄCZENIA (orange) -->
        <span class="text-xs font-black uppercase tracking-widest text-prescot-orange font-heading">Połączenia</span>
    </div>

    <!-- BOTTOM SHEET FILTERS DRAWER -->
    <div id="bottom-sheet-overlay" class="bottom-sheet-overlay no-print" onclick="closeFiltersSheet()"></div>
    <div id="bottom-sheet" class="bottom-sheet md:hidden no-print">
        <div class="bottom-sheet-handle"></div>
        <div class="px-6 pb-6">
            <div class="flex justify-between items-center mb-5 pt-2">
                <img alt="PRESCOT Logo" class="h-5" src="assets/logo_dark.svg"/>
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">Filtry produktów</span>
            </div>
            
            <div class="mb-5">
                <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Kategoria</label>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="mobileFilterCategory('all', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-prescot-orange text-white border-prescot-orange shadow-sm text-center">
                        Wszystko
                    </button>
                    <button onclick="mobileFilterCategory('Złączki do taśm LED', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900 text-center">
                        Złączki LED
                    </button>
                    <button onclick="mobileFilterCategory('Zasilanie i Rozgałęźniki DC', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900 text-center">
                        Kable DC
                    </button>
                    <button onclick="mobileFilterCategory('Kable i Szybkozłączki', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900 text-center">
                        Szybkozłączki
                    </button>
                    <button onclick="mobileFilterCategory('Przyciski i Włączniki', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900 text-center">
                        Włączniki
                    </button>
                    <button onclick="mobileFilterCategory('Złączki Hermetyczne IP68', this)" class="mobile-cat-btn px-3 py-2 rounded-lg text-xs font-bold border transition-all duration-200 bg-gray-50 text-gray-600 border-gray-200/80 hover:bg-gray-100 hover:text-gray-900 text-center">
                        Złącza IP68
                    </button>
                </div>
            </div>

            <div class="space-y-4">
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Szerokość taśmy</label>
                    <select id="mobile-filter-width" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-3 py-2 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolna</option>
                        <option value="8mm">8 mm</option>
                        <option value="10mm">10 mm</option>
                        <option value="12mm">12 mm</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Długość przewodu</label>
                    <select id="mobile-filter-wire" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-3 py-2 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolna</option>
                        <option value="brak">Brak przewodu</option>
                        <option value="14cm">14 cm</option>
                        <option value="15cm">15 cm</option>
                        <option value="24cm">24 cm</option>
                        <option value="150cm">1.5 m (150cm)</option>
                        <option value="300cm">3.0 m (300cm)</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Rodzaj złącza</label>
                    <select id="mobile-filter-connector" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-3 py-2.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolny</option>
                        <option value="szybkozłączka">Szybkozłączka (klik / fast)</option>
                        <option value="wsuwane">Wsuwane (PCB)</option>
                        <option value="zaciskowe">Zaciskowe (HIPP)</option>
                        <option value="wtyk">Wtyk DC</option>
                        <option value="gniazdo">Gniazdo DC</option>
                        <option value="hermetyczne">Hermetyczne IP68</option>
                        <option value="skręcane">Skręcane 12-torowe</option>
                        <option value="przełącznik">Przełącznik / Włącznik</option>
                        <option value="akcesoria">Pozostałe akcesoria</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Typ połączenia</label>
                    <select id="mobile-filter-connection" onchange="applyFilters()" class="w-full bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 px-3 py-2.5 outline-none focus:border-prescot-orange focus:bg-white transition-all cursor-pointer">
                        <option value="all">Dowolny</option>
                        <option value="taśma-taśma">Taśma - Taśma</option>
                        <option value="taśma-przewód">Taśma - Przewód</option>
                        <option value="taśma-przewód-taśma">Taśma - Przewód - Taśma</option>
                        <option value="wtyk+gniazdo">Wtyk + Gniazdo</option>
                        <option value="rozgałęźnik">Rozgałęźnik</option>
                        <option value="panelowe">Złącza panelowe</option>
                        <option value="akcesoria">Różne / Inne</option>
                    </select>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mt-6">
                <button onclick="resetFilters()" class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl transition-all">
                    Resetuj
                </button>
                <button onclick="closeFiltersSheet()" class="w-full bg-prescot-orange hover:bg-prescot-orange-hover text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md">
                    Zastosuj
                </button>
            </div>
        </div>
    </div>

    <script>
        let activeCategory = 'all';

        function openFiltersSheet() {{
            document.getElementById('bottom-sheet-overlay').classList.add('active');
            document.getElementById('bottom-sheet').classList.add('active');
            document.body.style.overflow = 'hidden';
        }}

        function closeFiltersSheet() {{
            document.getElementById('bottom-sheet-overlay').classList.remove('active');
            document.getElementById('bottom-sheet').classList.remove('active');
            document.body.style.overflow = '';
        }}

        function mobileFilterCategory(category, button) {{
            activeCategory = category;
            
            const buttons = document.querySelectorAll('.mobile-cat-btn');
            buttons.forEach(btn => {{
                btn.classList.remove('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                btn.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
            }});
            button.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
            button.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');

            // Sync desktop cat buttons
            const desktopButtons = document.querySelectorAll('.filter-btn');
            desktopButtons.forEach(btn => {{
                const onClickAttr = btn.getAttribute('onclick');
                if (onClickAttr && onClickAttr.includes("'" + category + "'")) {{
                    btn.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }} else if (onClickAttr && onClickAttr.includes("'all'") && category === 'all') {{
                    btn.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }} else {{
                    btn.classList.remove('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }}
            }});

            applyFilters();
        }}

        function filterCategory(category, button) {{
            activeCategory = category;
            
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {{
                btn.classList.remove('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                btn.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
            }});
            button.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
            button.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');

            // Sync mobile cat buttons
            const mobileButtons = document.querySelectorAll('.mobile-cat-btn');
            mobileButtons.forEach(btn => {{
                const onClickAttr = btn.getAttribute('onclick');
                if (onClickAttr && onClickAttr.includes("'" + category + "'")) {{
                    btn.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }} else if (onClickAttr && onClickAttr.includes("'all'") && category === 'all') {{
                    btn.classList.add('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }} else {{
                    btn.classList.remove('bg-prescot-orange', 'text-white', 'border-prescot-orange', 'shadow-sm');
                    btn.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-200/80');
                }}
            }});

            applyFilters();
        }}

        function resetFilters() {{
            document.getElementById('mobile-filter-width').value = 'all';
            document.getElementById('mobile-filter-wire').value = 'all';
            document.getElementById('mobile-filter-connector').value = 'all';
            document.getElementById('mobile-filter-connection').value = 'all';
            
            document.getElementById('filter-width').value = 'all';
            document.getElementById('filter-wire').value = 'all';
            document.getElementById('filter-connector').value = 'all';
            document.getElementById('filter-connection').value = 'all';

            applyFilters();
        }}

        function applyFilters() {{
            const isMobile = window.innerWidth < 768;
            const prefix = isMobile ? 'mobile-' : '';
            
            const selectedWidth = document.getElementById(prefix + 'filter-width').value;
            const selectedWire = document.getElementById(prefix + 'filter-wire').value;
            const selectedConnector = document.getElementById(prefix + 'filter-connector').value;
            const selectedConnection = document.getElementById(prefix + 'filter-connection').value;

            // Sync desktop & mobile dropdown selections
            if (isMobile) {{
                document.getElementById('filter-width').value = selectedWidth;
                document.getElementById('filter-wire').value = selectedWire;
                document.getElementById('filter-connector').value = selectedConnector;
                document.getElementById('filter-connection').value = selectedConnection;
            }} else {{
                document.getElementById('mobile-filter-width').value = selectedWidth;
                document.getElementById('mobile-filter-wire').value = selectedWire;
                document.getElementById('mobile-filter-connector').value = selectedConnector;
                document.getElementById('mobile-filter-connection').value = selectedConnection;
            }}

            const sections = document.querySelectorAll('.category-section');
            
            sections.forEach(sec => {{
                const secCat = sec.getAttribute('data-category');
                const isCatMatch = (activeCategory === 'all' || secCat === activeCategory);
                
                let visibleRowsInSection = 0;
                
                const seriesBoxes = sec.querySelectorAll('.mb-8');
                seriesBoxes.forEach(box => {{
                    let visibleRowsInBox = 0;
                    
                    const rows = box.querySelectorAll('.product-row');
                    rows.forEach(row => {{
                        const rowWidth = row.getAttribute('data-width');
                        const rowWire = row.getAttribute('data-wire');
                        const rowConnector = row.getAttribute('data-connector');
                        const rowConnection = row.getAttribute('data-connection');

                        const matchesWidth = (selectedWidth === 'all' || rowWidth === selectedWidth);
                        const matchesWire = (selectedWire === 'all' || rowWire === selectedWire);
                        const matchesConnector = (selectedConnector === 'all' || rowConnector === selectedConnector);
                        const matchesConnection = (selectedConnection === 'all' || rowConnection === selectedConnection);

                        if (isCatMatch && matchesWidth && matchesWire && matchesConnector && matchesConnection) {{
                            row.style.display = '';
                            visibleRowsInBox++;
                            visibleRowsInSection++;
                        }} else {{
                            row.style.display = 'none';
                        }}
                    }});
                    
                    if (visibleRowsInBox > 0) {{
                        box.style.display = '';
                    }} else {{
                        box.style.display = 'none';
                    }}
                }});
                
                if (visibleRowsInSection > 0) {{
                    sec.style.display = 'block';
                    setTimeout(() => {{
                        sec.style.opacity = '1';
                        sec.style.transform = 'translateY(0)';
                    }}, 50);
                }} else {{
                    sec.style.opacity = '0';
                    sec.style.transform = 'translateY(10px)';
                    setTimeout(() => {{
                        sec.style.display = 'none';
                    }}, 250);
                }}
            }});

            recalculateAvailableOptions(selectedWidth, selectedWire, selectedConnector, selectedConnection);
        }}

        function recalculateAvailableOptions(selectedWidth, selectedWire, selectedConnector, selectedConnection) {{
            const rows = Array.from(document.querySelectorAll('.product-row'));
            
            const catMatches = (row) => {{
                if (activeCategory === 'all') return true;
                const sec = row.closest('.category-section');
                return sec && sec.getAttribute('data-category') === activeCategory;
            }};

            // 1. Available widths
            const activeWidths = new Set();
            rows.forEach(row => {{
                if (catMatches(row) &&
                    (selectedWire === 'all' || row.getAttribute('data-wire') === selectedWire) &&
                    (selectedConnector === 'all' || row.getAttribute('data-connector') === selectedConnector) &&
                    (selectedConnection === 'all' || row.getAttribute('data-connection') === selectedConnection)) {{
                    activeWidths.add(row.getAttribute('data-width'));
                }}
            }});
            updateSelectOptions('filter-width', activeWidths);
            updateSelectOptions('mobile-filter-width', activeWidths);

            // 2. Available wires
            const activeWires = new Set();
            rows.forEach(row => {{
                if (catMatches(row) &&
                    (selectedWidth === 'all' || row.getAttribute('data-width') === selectedWidth) &&
                    (selectedConnector === 'all' || row.getAttribute('data-connector') === selectedConnector) &&
                    (selectedConnection === 'all' || row.getAttribute('data-connection') === selectedConnection)) {{
                    activeWires.add(row.getAttribute('data-wire'));
                }}
            }});
            updateSelectOptions('filter-wire', activeWires);
            updateSelectOptions('mobile-filter-wire', activeWires);

            // 3. Available connectors
            const activeConnectors = new Set();
            rows.forEach(row => {{
                if (catMatches(row) &&
                    (selectedWidth === 'all' || row.getAttribute('data-width') === selectedWidth) &&
                    (selectedWire === 'all' || row.getAttribute('data-wire') === selectedWire) &&
                    (selectedConnection === 'all' || row.getAttribute('data-connection') === selectedConnection)) {{
                    activeConnectors.add(row.getAttribute('data-connector'));
                }}
            }});
            updateSelectOptions('filter-connector', activeConnectors);
            updateSelectOptions('mobile-filter-connector', activeConnectors);

            // 4. Available connections
            const activeConnections = new Set();
            rows.forEach(row => {{
                if (catMatches(row) &&
                    (selectedWidth === 'all' || row.getAttribute('data-width') === selectedWidth) &&
                    (selectedWire === 'all' || row.getAttribute('data-wire') === selectedWire) &&
                    (selectedConnector === 'all' || row.getAttribute('data-connector') === selectedConnector)) {{
                    activeConnections.add(row.getAttribute('data-connection'));
                }}
            }});
            updateSelectOptions('filter-connection', activeConnections);
            updateSelectOptions('mobile-filter-connection', activeConnections);
        }}

        function updateSelectOptions(selectId, activeValues) {{
            const select = document.getElementById(selectId);
            if (!select) return;
            const options = select.options;
            for (let i = 0; i < options.length; i++) {{
                const opt = options[i];
                if (opt.value === 'all') continue;
                
                if (activeValues.has(opt.value)) {{
                    opt.disabled = false;
                    opt.style.display = '';
                }} else {{
                    opt.disabled = true;
                    opt.style.display = 'none';
                }}
            }}
        }}

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
