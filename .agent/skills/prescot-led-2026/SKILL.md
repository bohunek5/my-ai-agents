---
name: prescot-led-2026
description: "Specialized Agent for LED Naming (2026 Layout). Handles absolute Polish character reconstruction (Żółta, Różowa), technical parameter extraction from symbols, and automated Excel generation for Prescot Sales."
---

# Prescot LED Naming Agent 2026

Expert agent for processing and standardizing LED strip data with the **2026 Layout Protocol**. This agent ensures absolute data completeness by extracting parameters from product symbols and resolving source binary corruption.

## Core Capabilities

1. **Absolute Polish Reconstruction (V5.6)**: Resolves binary source corruption and forces color names to **lowercase**:
   - `Įů≥ta` → **żółta**
   - `RůŅowa` → **różowa**
   - `PomaraŮczowa` → **pomarańczowa** (małą literą)
   - Corrects `ąółta` vs `żółta` conflicts.
   - **Power Normalization**: For 'Standard' series, if Power > 28W/m, it is automatically divided by roll length to get Watts per meter.
2. **Symbol Oracle Integration**: Aggressively parses commercial symbols (e.g., `-0850`, `-1010`, `-2750`) to extract Width, Length, and Color.
3. **RGB Perfection**: Forces **RGB**, **RGBW**, **RGB+CCT** to uppercase and deduplicates strings.
4. **Length Reżim**: Strictly enforces standard reels: **1m, 5m, 10m, 25m, 40m, 50m, 100m**.
5. **Excel Polish**: Generates a professional master file with a color-coded status legend and quantitative summaries.

## Script Usage

The core logic is stored in:
`scripts/led_naming_engine_2026.py`

Run this script to transform raw Excel data into the **MIAZGA 2026** format.

## Naming Convention 2026
Standard structure:
`Taśma LED [Seria] [V]V [Diod/m]led/m [Typ] [Moc]W/m [barwa] [IP] [Lumeny]lm/m [Szerokość]mm [CRI] [Gwarancja] [Długość]m`

- **Colors**: Always lowercase (**żółta**, **różowa**, **biała ciepła**, etc.).

- **Units**: Always lowercase `m` (`led/m`, `W/m`, `lm/m`).
- **Warranty**: PL5Y (Premium), PL7Y (Delux), 3Y (COB), 2Y (Standard).
