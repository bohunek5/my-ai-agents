---
name: creating-skills
description: Expertly generates high-quality, predictable, and efficient skill directories for the Antigravity environment. Use this whenever the user asks for a new skill or automation module.
---

# Skill Creator

## When to use this skill

- When creating a new automated workflow in `.agent/skills/`.
- When refactoring existing instructions into a modular skill.

## Workflow

1. [ ] Define the skill name (gerund-form, e.g., `optimizing-images`).
2. [ ] Identify required components (`SKILL.md`, `scripts/`, `resources/`).
3. [ ] Generate YAML frontmatter with a 3rd-person description.
4. [ ] Implement logic using Bullet Points (heuristics) or specific Bash commands (low-freedom).
5. [ ] Validate structure by listing the new directory.

## Instructions

- **Hierarchy:** `<skill-name>/SKILL.md` is mandatory.
- **Naming:** Lowercase, hyphens, no "claude" or "anthropic".
- **Conciseness:** Do not explain basic concepts; focus on unique logic.
- **Reference:** Use `/` for all paths.

## Resources

- [See Template](TEMPLATE.md) (Internal reference for structure)
