import fitz

TRANSLATIONS = {
    "1 input 3 branches for RGBCW": "1 wejście 3 wyjścia do RGBCW",
    "1 input 3 branches for RGBW": "1 wejście 3 wyjścia do RGBW",
    "1 input 4 branches for RGB": "1 wejście 4 wyjścia do RGB",
    "1 input 6 branches for CCT": "1 wejście 6 wyjść do CCT",
    "1 input 9 branches for MONO": "1 wejście 9 wyjść do MONO",
    "18 Pins": "18 Pinów",
    "2 Pins/3 Pins/4 Pins/5 Pins/6 Pins": "2 Piny/3 Piny/4 Piny/5 Pinów/6 Pinów",
    "Best for under cabinet light wireless switching and dimming": "Idealny do podszafkowego bezprzew. sterowania",
    "Black Connector": "Czarne złącze",
    "Black Housing": "Czarna obudowa",
    "Black/ White": "Czarny / Biały",
    "Branch:": "Wyjście:",
    "CCT (3 Pins)": "CCT (3 Piny)",
    "COMMON PARAMETER": "PARAMETRY WSPÓLNE",
    "Cable Color": "Kolor przewodu",
    "Color:": "Kolor:",
    "Color": "Kolor",
    "Connector Color": "Kolor złącza",
    "Connector Type": "Typ złącza",
    "Connector:": "Złącze:",
    "Copper and PC": "Miedź i poliwęglan (PC)",
    "Customization Available": "Możliwość personalizacji",
    "Description": "Opis",
    "Designed for high power": "Zaprojektowany do dystrybucji",
    "distribution": "wysokiej mocy",
    "Dimmable Range:": "Zakres ściemniania:",
    "Dimmable Sweep Switch": "Włącznik ze ściemniaczem (zbliżeniowy)",
    "Dimmable": "Możliwość ściemniania",
    "Direction Switching": "Przełączanie kierunku",
    "Dual Black": "Podwójny czarny",
    "Dual Side Sense": "Podwójne czujniki",
    "Dual White": "Podwójny biały",
    "Dual sensor design make mounting": "Konstrukcja z 2 czujnikami",
    "more flexible for different position": "zapewnia większą elastyczność montażu",
    "Easy to Connect": "Łatwe podłączenie",
    "FEATURES": "CECHY",
    "Fixing Method:": "Sposób montażu:",
    "Flame Retardant Rating:": "Klasa palności:",
    "Flame Retardant": "Obudowa trudnopalna",
    "Get your own products with your brand. The following customizations are supported": "Stwórz produkty pod własną marką. Dostępne opcje personalizacji:",
    "High Power": "Wysoka moc",
    "Housing Color:": "Kolor obudowy:",
    "Housing Color": "Kolor obudowy",
    "Housing Dimension:": "Wymiary obudowy:",
    "Housing Material:": "Materiał obudowy:",
    "Housing Shape": "Kształt obudowy",
    "Housing is made of": "Obudowa wykonana z",
    "flame retardant material that is UL94v-1 rated": "trudnopalnego materiału klasy UL94V-1",
    "INSTALLATION METHOD": "SPOSÓB MONTAŻU",
    "Indicator": "Dioda kontrolna",
    "Input Pin Quantity:": "Ilość pinów wejściowych:",
    "Input Wire Gauge:": "Przekrój przewodu wejściowego:",
    "Item NO.": "Nr produktu",
    "Light Color": "Kolor światła",
    "MICRO-FIT 3.0 Input-Output": "MICRO-FIT 3.0 Wejście-Wyjście",
    "Main:": "Główne:",
    "Material:": "Materiał:",
    "Max 10A": "Maks. 10A",
    "Max 25A": "Maks. 25A",
    "Max Branch Current:": "Maks. prąd wyjściowy:",
    "Max Current Total:": "Maks. prąd całkowity:",
    "Max Current:": "Maks. prąd:",
    "Mono (2 Pins)": "Mono (2 Piny)",
    "Mounting Method:": "Sposób montażu:",
    "No Tin Needed": "Bez lutowania",
    "On/Off Switch": "Włącznik / Wyłącznik",
    "Optional": "Opcjonalnie",
    "Output Pin Quantity:": "Ilość pinów wyjściowych:",
    "Output Wire Gauge:": "Przekrój przewodu wyjściowego:",
    "Pattern Printing": "Nadruk logo / wzoru",
    "Picture": "Zdjęcie",
    "Polycarbonate(PC)": "Poliwęglan (PC)",
    "RGB (4 Pins)": "RGB (4 Piny)",
    "RGBCW (6 Pins)": "RGBCW (6 Pinów)",
    "RGBW (5 Pins)": "RGBW (5 Pinów)",
    "SELECTION": "WYBÓR WARIANTU",
    "SM Input-Output": "SM Wejście-Wyjście",
    "Screw + Bracket": "Śruba + Uchwyt",
    "Sensitive Distance:": "Zasięg czujnika:",
    "Series NO:": "Nr serii:",
    "Sunligh Resistant": "Odporny na słońce",
    "Sunlight Resistant": "Odporny na słońce",
    "Surface Mount": "Montaż natynkowy",
    "Tape + Bracket": "Taśma + Uchwyt",
    "Tape Only": "Tylko taśma",
    "Tape/ Screw": "Taśma / Śruba",
    "The button allow user to": "Przycisk pozwala na",
    "decide which sensor to be used": "wybór aktywnego czujnika",
    "White Connector": "Białe złącze",
    "White Housing": "Biała obudowa",
    "White": "Biały",
    "Wire Guage:": "Przekrój przewodu:",
    "With help of inbuilt program, the sensor can works": "Dzięki układowi, czujnik działa",
    "under sunlight": "nawet w słońcu",
    "With object in sensible area for 1 second,": "Przytrzymanie obiektu w zasięgu przez 1s",
    "it starts dimming": "uruchamia ściemnianie",
    "Working Voltage:": "Napięcie robocze:",
    "just open-insert-close, operation can be done manually": "otwórz - włóż - zamknij, montaż bez narzędzi"
}

doc = fitz.open('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT.pdf')

fontfile_reg = "/System/Library/Fonts/Supplemental/Arial.ttf"
fontfile_bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"

for page in doc:
    replacements = []
    page_numbers = []
    
    # Redact original text
    blocks = page.get_text("dict")["blocks"]
    for b in blocks:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    text = s["text"].strip()
                    
                    # Remove page numbers
                    if text.isdigit() and 100 <= int(text) <= 150:
                        page_numbers.append(s["bbox"])
                        continue
                    
                    if text in TRANSLATIONS:
                        r = (s["color"] >> 16) & 255
                        g = (s["color"] >> 8) & 255
                        b_col = s["color"] & 255
                        color = (r / 255.0, g / 255.0, b_col / 255.0)

                        font_file = fontfile_bold if "Bold" in s["font"] else fontfile_reg
                        font_name = "arialb" if "Bold" in s["font"] else "arial"

                        # Adjust bounding box to be a text box for nice wrapping
                        bbox = list(s["bbox"])
                        
                        # Fix specific overlaps by shifting/expanding rects
                        # Extend right width but don't hit edge
                        bbox[2] = min(bbox[2] + 40, page.rect.width - 30)
                        
                        # Expand height to allow multiple lines without overlapping other blocks
                        bbox[3] = bbox[3] + s["size"] * 1.5

                        replacements.append({
                            "bbox": s["bbox"], # for redaction
                            "textbox": bbox,   # for insertion
                            "text": TRANSLATIONS[text],
                            "orig_text": text,
                            "fontsize": s["size"],
                            "fontfile": font_file,
                            "fontname": font_name,
                            "color": color,
                            "origin": s["origin"]
                        })

    # Redact page numbers (white fill or no fill)
    for p_bbox in page_numbers:
        page.add_redact_annot(p_bbox, cross_out=False, fill=(1,1,1))
        
    for r in replacements:
        page.add_redact_annot(r["bbox"], cross_out=False, fill=None)
        
    # Wire text redactions (from images)
    # Exact positions from test: Solid=51.5-64.4(text only), 470-475
    # Let's make a generous white block
    r_solid = fitz.Rect(45, 465, 85, 480)
    page.add_redact_annot(r_solid, cross_out=False, fill=(1,1,1))
    
    r_strand = fitz.Rect(95, 465, 145, 480)
    page.add_redact_annot(r_strand, cross_out=False, fill=(1,1,1))

    page.apply_redactions(images=0, graphics=0)

    # Insert Polish texts
    for r in replacements:
        fs = r["fontsize"]
        rect = fitz.Rect(r["textbox"])
        
        # Insert text directly if it is very short or roughly same length
        if len(r["text"]) <= len(r["orig_text"]) + 2:
            page.insert_text(r["origin"], r["text"], fontsize=fs, fontname=r["fontname"], fontfile=r["fontfile"], color=r["color"])
        else:
            # Use textbox for longer text to allow wrap
            res = -1
            while fs > 5:
                res = page.insert_textbox(rect, r["text"], fontsize=fs, fontname=r["fontname"], fontfile=r["fontfile"], color=r["color"], align=fitz.TEXT_ALIGN_LEFT)
                if res >= 0:
                    break
                fs -= 1
            if res < 0:
                # Fallback to simple insert text with smaller font
                page.insert_text(r["origin"], r["text"], fontsize=r["fontsize"]*0.8, fontname=r["fontname"], fontfile=r["fontfile"], color=r["color"])

    # Insert wire texts
    green = (0.2, 0.8, 0.2)
    black = (0.1, 0.1, 0.1)
    
    # Drut
    page.insert_text((40, 475), "-", fontsize=8, fontname="arialb", fontfile=fontfile_bold, color=green)
    page.insert_text((47, 475), "Drut", fontsize=8, fontname="arial", fontfile=fontfile_reg, color=black)
    
    # Linka
    page.insert_text((95, 475), "-", fontsize=8, fontname="arialb", fontfile=fontfile_bold, color=green)
    page.insert_text((102, 475), "Linka", fontsize=8, fontname="arial", fontfile=fontfile_reg, color=black)

doc.save('/Users/karolbohdanowicz/Downloads/Rozdzielacze PRESCOT PL_new2.pdf')
