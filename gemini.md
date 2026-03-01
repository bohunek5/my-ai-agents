# Project Constitution (gemini.md)

## Data Schemas

### Skill Structure (JSON)

```json
{
  "skill_name": "string",
  "files": [
    {
      "path": "string",
      "content_type": "markdown | json | shell"
    }
  ]
}
```

## Behavioral Rules

1. **Deterministic Execution:** No guessing business logic.
2. **Self-Healing:** If a command fails, analyze and retry with a fix.
3. **Voice Priority:** All major updates reported via macOS `say -v Zosia`.
4. **B.L.A.S.T. Protocol:** Hierarchy: Blueprint -> Link -> Architect -> Stylize -> Trigger.
5. **Ollama Local Processing:** For large-scale data enrichment, analysis of many records, or repetitive "countable" tasks, ALWAYS use local Ollama (`localhost:11434`) via Python/Node scripts to save tokens and ensure privacy.

## Architectural Invariants

- All new skills must reside in `.agent/skills/`.
- YAML frontmatter is mandatory for `SKILL.md`.
- No raw JPG/PNG – use WebP as per Mazury Holiday Rule.
