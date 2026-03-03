---
name: presentation-creation
description: Automates the creation of professional presentations using the Gamma API. Handles requirement gathering, theme selection, and PDF export. Use when the user asks for a deck, presentation, or mention of Gamma.
---

# Presentation Creation (Gamma Master)

## When to use this skill

- When the user needs a presentation (pitch, report, educational deck).
- When Gamma API integration is mentioned.

## Workflow

### Step 1: Discovery (Critical)

Ask these 6 questions before proceeding:

1. **Topic & Objective:** What is it about?
2. **Slide Count:** 5 (Pitch) / 8-10 (Standard) / 12-15 (Detailed).
3. **Audience:** Executives, Investors, Clients, etc.
4. **Text Density:** Minimalistic, Balanced, or Detailed.
5. **Visual Style:** Corporate, Tech, Abstract, etc.
6. **Logo Placement:** Top-right, Top-left, Bottom-right, Bottom-left, or None.

### Step 2: Confirm & Validate

Summarize the requirements in a table and wait for "yes".

### Step 3: API Execution

- Base URL: `https://api.gamma.app`
- Endpoint: `POST /v1.0/generations`
- Poll: `/v1.0/generations/{id}`
- Delivery: Return Online View URL and PDF Download URL.

## Instructions

- **Theme Matching:** Apply brand colors from `brand-identity` skill if available.
- **Image Style:** Use detailed DALL-E 3 descriptions based on the chosen visual style.
- **Tone:** Align with `voice-tone.md` guidelines.

## Resources

- [See API Reference](https://api.gamma.app/docs)
