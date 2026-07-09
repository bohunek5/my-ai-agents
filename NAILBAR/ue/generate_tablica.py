import asyncio
from playwright.async_api import async_playwright
import os

HTML_CONTENT = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page {
    size: 840mm 440mm; /* 800x400 + 20mm bleed/marks on each side */
    margin: 0;
  }
  body, html {
    margin: 0;
    padding: 0;
    width: 840mm;
    height: 440mm;
    background: #ffffff;
    font-family: 'Arial', sans-serif;
    -webkit-print-color-adjust: exact;
    position: relative;
  }
  
  /* Bleed area */
  .bleed-area {
    position: absolute;
    top: 17mm;
    left: 17mm;
    width: 806mm;
    height: 406mm;
    background-image: url('file:///Users/karolbohdanowicz/my-ai-agents/scratch/pristine_bg.svg');
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }
  
  /* Trim area (actual board) */
  .trim-area {
    position: absolute;
    top: 20mm;
    left: 20mm;
    width: 800mm;
    height: 400mm;
    box-sizing: border-box;
    /* Optional: uncomment if you want a border to see the trim edge
    border: 0.1mm dashed #ff0000; */
  }

  /* 40% White Spot */
  .white-spot {
    position: absolute;
    top: 0;
    left: 0;
    width: 800mm;
    height: 160mm; /* 40% of 400mm height */
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20mm;
    box-sizing: border-box;
  }

  /* Logos */
  .logos-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10mm;
  }
  .logos-container img {
    height: 35mm;
    object-fit: contain;
  }
  
  /* Titles */
  .eu-title {
    font-size: 28mm;
    font-weight: bold;
    color: #1a365d;
    margin: 0;
    text-align: center;
  }
  .eu-subtitle {
    font-size: 14mm;
    color: #2b6cb0;
    margin: 5mm 0 0 0;
    text-align: center;
    font-weight: bold;
  }
  
  /* Text container on the remaining colored background */
  .text-container {
    position: absolute;
    top: 170mm; /* Below the white spot */
    left: 40mm;
    width: 720mm;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20mm;
    border-radius: 5mm;
    box-sizing: border-box;
  }

  .info-row {
    margin-bottom: 15mm;
  }
  .info-label {
    font-size: 14mm;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5mm;
  }
  .info-value {
    font-size: 16mm;
    color: #1a202c;
    line-height: 1.4;
  }
  .financial-grid {
    display: flex;
    justify-content: space-between;
    margin-top: 10mm;
  }
  .financial-box {
    width: 48%;
  }

  /* Crop marks */
  .crop-mark {
    position: absolute;
    background-color: #000;
  }
  
  /* Top Left */
  .cm-tl-v { top: 5mm; left: 20mm; width: 0.5mm; height: 10mm; }
  .cm-tl-h { top: 20mm; left: 5mm; width: 10mm; height: 0.5mm; }
  
  /* Top Right */
  .cm-tr-v { top: 5mm; left: 820mm; width: 0.5mm; height: 10mm; }
  .cm-tr-h { top: 20mm; left: 825mm; width: 10mm; height: 0.5mm; }
  
  /* Bottom Left */
  .cm-bl-v { top: 425mm; left: 20mm; width: 0.5mm; height: 10mm; }
  .cm-bl-h { top: 420mm; left: 5mm; width: 10mm; height: 0.5mm; }
  
  /* Bottom Right */
  .cm-br-v { top: 425mm; left: 820mm; width: 0.5mm; height: 10mm; }
  .cm-br-h { top: 420mm; left: 825mm; width: 10mm; height: 0.5mm; }

</style>
</head>
<body>

  <!-- Crop Marks -->
  <div class="crop-mark cm-tl-v"></div>
  <div class="crop-mark cm-tl-h"></div>
  <div class="crop-mark cm-tr-v"></div>
  <div class="crop-mark cm-tr-h"></div>
  <div class="crop-mark cm-bl-v"></div>
  <div class="crop-mark cm-bl-h"></div>
  <div class="crop-mark cm-br-v"></div>
  <div class="crop-mark cm-br-h"></div>

  <!-- Bleed Area (Background) -->
  <div class="bleed-area"></div>

  <!-- Trim Area (Content) -->
  <div class="trim-area">
    
    <!-- 40% White Spot with Logos and Titles -->
    <div class="white-spot">
      <div class="logos-container">
        <!-- Load the original logos strip from NAILBAR -->
        <img src="file:///Users/karolbohdanowicz/my-ai-agents/NAILBAR/assets/images/dofinansowanie.webp" alt="Logos">
      </div>
      <h1 class="eu-title">Projekty Unijne</h1>
      <h2 class="eu-subtitle">„Sfinansowano w ramach reakcji Unii na pandemię COVID-19”</h2>
    </div>

    <!-- Main Project Info -->
    <div class="text-container">
      <div class="info-row">
        <div class="info-label">Beneficjent:</div>
        <div class="info-value">NAILBAR Małgorzata Marchelewicz</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Tytuł projektu:</div>
        <div class="info-value">„Zabezpieczenie ciągłości działalności gospodarczej firmy Nailbar Małgorzata Marchelewicz w okresie epidemii”</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Opis i cele projektu:</div>
        <div class="info-value">Celem projektu jest opracowanie i wdrożenie działań zabezpieczających ciągłość działalności gospodarczej firmy Nailbar Małgorzata Marchelewicz w okresie epidemii wpływających na budowanie odporności firmy na przyszłe kryzysy.</div>
      </div>
      
      <div class="financial-grid">
        <div class="financial-box">
          <div class="info-label">Wartość projektu:</div>
          <div class="info-value" style="font-weight: bold; color: #1a365d;">278 316,00 zł</div>
        </div>
        <div class="financial-box">
          <div class="info-label">Wkład Funduszy Europejskich:</div>
          <div class="info-value" style="font-weight: bold; color: #1a365d;">278 316,00 zł</div>
        </div>
      </div>
    </div>
    
  </div>

</body>
</html>
"""

async def render():
    html_path = "/Users/karolbohdanowicz/my-ai-agents/NAILBAR/ue/tablica_druk.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
        
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        await page.goto(f"file://{html_path}", wait_until='networkidle')
        
        pdf_path = "/Users/karolbohdanowicz/my-ai-agents/NAILBAR/ue/TABLICA_DRUK_NAILBAR.pdf"
        await page.pdf(
            path=pdf_path,
            width="840mm",
            height="440mm",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
        )
        print(f"Generated print-ready PDF at: {pdf_path}")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(render())
