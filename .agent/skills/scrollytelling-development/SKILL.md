---
name: scrollytelling-development
description: Expertly builds premium scroll-linked landing pages using Next.js, Framer Motion, and Canvas image sequences. Use when the user wants an Awwwards-level interactive experience.
---

# Scrollytelling Development

Build premium interactive experiences that transform as the user scrolls.

## Tech Stack

- Next.js (App Router)
- Framer Motion (`useScroll`, `useSpring`, `useTransform`)
- HTML5 Canvas (120-frame sequence)
- Tailwind CSS

## Implementation Rules

1. **Seamless Blend:** Background must match `#050505` exactly.
2. **Smooth Motion:** Always use `useSpring` (Stiffness: 100, Damping: 30) for frame interpolation.
3. **Preloading:** Show a progress bar until 100% of frames are cached.
4. **Text Beats:** Map opacity ranges: `[start, start+0.1, end-0.1, end] -> [0, 1, 1, 0]`.

## Workflow Checklist

- [ ] Prepare 120-frame WebP sequence in `/public/sequence/`.
- [ ] Implement sticky canvas container.
- [ ] Setup scroll observer and spring smoothing.
- [ ] Add text overlays with transform-linked opacity.
- [ ] Optimize for mobile (contain-fit logic).
