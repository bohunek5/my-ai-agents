# Preferred Tech Stack & Implementation Rules

When generating code or UI components for this brand, you **MUST** strictly adhere to the following technology choices.

## Core Stack

* **Framework:** Next.js / React (TypeScript preferred)
* **Styling Engine:** Tailwind CSS + Vanilla CSS for advanced animations.
* **Component Library:** shadcn/ui (Use these primitives).
* **Icons:** Lucide React

## Implementation Guidelines

### 1. Tailwind & CSS Usage

* Utilize the color tokens defined in `design-tokens.json`.
* **Glassmorphism:** Use `backdrop-blur` and semi-transparent backgrounds for a premium feel.
* **Animations:** Use Framer Motion for smooth micro-interactions.

### 2. Forbidden Patterns

* Do NOT use jQuery.
* Do NOT use Bootstrap.
* Do NOT add raw JPG/PNG (use WebP).
