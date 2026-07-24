---
name: antigravity-swarm
description: Coordinates a multi-agent 'Swarm' for complex, parallel development tasks. Delegates specialized work to UI, Backend, and Automation sub-agents while maintaining global architectural consistency.
---

# Antigravity Swarm Orchestration

## When to Use

- When a single task involves multiple domains (e.g., "Build a landing page from scratch" - requires UI, Copy, and Code).
- When there is a need for parallel execution of non-dependent tasks.
- When the USER explicitly asks for "Swarm behavior" or "Agentic Swarm".

## Roles (The Swarm)

1. **Architect Agent (Lead)**: 
   - Decomposes the task.
   - Assigns sub-tasks to specialists.
   - Validates final integration.
   - Tool: `technical-analyst`.

2. **UI/UX Specialist (Stylist)**:
   - Focuses on CSS, Layout, and Motion.
   - Tool: `ui-ux-pro-max`, `stitch`, `scrollytelling-development`.

3. **Backend/Logic Specialist (Coder)**:
   - Focuses on TypeScript/JavaScript logic, state management, and APIs.
   - Tool: `automation-architect`.

4. **SEO & Growth Specialist (Growth)**:
   - Final polish for meta tags, content structure, and performance.
   - Tool: `seo-strategy`.

## Swarm Heuristics

- **Decomposition**: Never start a swarm with a vague goal. Break it down into at least 3 distinct "workstreams".
- **Parallelism**: Use `run_command` with background execution for tasks that don't depend on each other.
- **Vibe Consistency**: All agents must follow the `PRESCOT` guidelines (Deep Black, Premium, High Performance).
- **Communication**: Use `say -v Zosia` only for MAJOR milestones (not for every agent completion).

## Workflow

1. [ ] **Spawn Lead**: Analyze requirements and define the `implementation_plan.md` as the "Swarm Source of Truth".
2. [ ] **Delegate**: Fire off tool calls for each specialist (e.g., generate a screen for UI, write the logic for Coder).
3. [ ] **Sync**: Gather results from artifacts/file system.
4. [ ] **Polish**: Perform a final pass to ensure all parts fit perfectly.
