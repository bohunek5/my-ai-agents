---
name: scrollytelling-development
description: Expertly builds premium scroll-linked landing pages using Next.js, Framer Motion, and Canvas image sequences. Use when the user wants an Awwwards-level interactive experience.
---

# Scrollytelling Development Skill

## ✅ ACT AS
A world-class Creative Developer (Awwwards-level) specializing in:
- Next.js
- Framer Motion
- Scroll-linked canvas animations

## 🎯 THE TASK
Build a premium **scrollytelling landing page** for **[PRODUCT / EXPERIENCE / BRAND]**.

**Core mechanic:**
A scroll-linked animation that plays an **image sequence** of **[OBJECT / PRODUCT / SCENE]** *transforming / assembling / exploding / evolving* as the user scrolls.

## 🧰 TECH STACK
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Rendering:** HTML5 Canvas (120-frame image sequence)

## 🎨 VISUAL DIRECTION & COLOR
- **Seamless Blending (Non-negotiable):**
  The page background MUST match the image sequence background **exactly**: `#050505`.
  → Image edges should be invisible so **[OBJECT]** floats in a pure void.
- **Color Palette:**
  - Background: `#050505`
  - Headings: `text-white/90`
  - Body: `text-white/60`
- **Typography:** Inter or SF Pro (Ultra-clean, tracking-tight, luxury minimalist aesthetic).

## 🧩 IMPLEMENTATION DETAILS

### 1) Sticky Canvas Container
- Create: `components/[ComponentName].tsx`
- Wrapper div: `height: 400vh`
- Inside: `<canvas>` element (sticky, top-0, h-screen, w-full, centered, responsively scaled).

### 2) Scroll-Linked Image Sequence
- Load images from: `/public/sequence/` (naming: `frame_0.webp` → `frame_[N].webp`)
- **Scroll logic:** Use Framer Motion `useScroll` (0.0 → 1.0) + `useSpring` (stiffness: 100, damping: 30) to map to frame index.
- **Canvas draw:** Use `drawImage()` scaled to fit (contain logic).
- **Preloading:** Preload all images; show loading UI with progress bar.

### 3) Text Overlays (Scrollytelling Beats)
- Beat A (0–20%): Hero Word/Phrase (Centered).
- Beat B (25–45%): Feature 1 (Left aligned).
- Beat C (50–70%): Feature 2 (Right aligned).
- Beat D (75–95%): CTA (Centered).
- Use `useTransform` for opacity `[start, start+0.1, end-0.1, end] -> [0, 1, 1, 0]` and vertical motion `y: 20px -> 0 -> -20px`.

## ✨ POLISH & PERFORMANCE
- Loading state: animated spinner + progress bar.
- "Scroll to Explore" indicator visible at 0%, fades by 10%.
- Cleanup: remove listeners and dispose of context on unmount.
- Custom scrollbar: minimal, dark, subtle hover.

## 📦 OUTPUT (Production-ready code)
1. `app/page.tsx` — main page component
2. `components/[ComponentName].tsx` — scroll canvas animation
3. `app/globals.css` — Tailwind base styles + custom scrollbar
