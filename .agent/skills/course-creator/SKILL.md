---
name: course-creator
description: Uses NotebookLM to research, structure, and generate comprehensive educational courses on any topic. Automatically creates syllabi, lesson plans, and content modules.
---

# The 30-Minute Course Creator

Turn any topic into a sellable course — automatically.

## When to Use This Skill

- Creating online courses from scratch
- Structuring educational content (syllabi, outlines)
- Deep research on a complex topic for teaching
- Converting raw materials (PDFs, URLs) into structured lessons

## Prerequisites

- **Authorized NotebookLM:** Run `notebooklm-mcp-auth` if you haven't already.
- **Topic:** A clear subject matter (e.g., "Advanced Python for Data Science").
- **Target Audience:** Who is this for? (Beginners, Experts, etc.)

## Workflow

### Phase 1: Research & Setup

1. **Initialize Notebook:** Create a new NotebookLM notebook for the topic.
    - Tool: `mcp_notebooklm_notebook_create(title="Course: [Topic]")`
    - Returns: `notebook_id` (Save this!)

2. **Gather Intel:** Use Deep Research to find high-quality sources.
    - Tool: `mcp_notebooklm_research_start(query="comprehensive guide to [Topic]", mode="deep")`
    - Tool: `mcp_notebooklm_research_status(task_id=...)` (Wait for completion)
    - Tool: `mcp_notebooklm_research_import(notebook_id=..., task_id=...)`

3. **Add Specific Sources:** (Optional) Add specific URLs or PDFs.
    - Tool: `mcp_notebooklm_notebook_add_url(notebook_id=..., url="...")`

### Phase 2: Structure & Outline

4. **Generate Syllabus:** Create a "Study Guide" or custom outline.
    - Tool: `mcp_notebooklm_report_create(notebook_id=..., report_format="Study Guide", confirm=True)`
    - *Alternative:* Chat with the notebook to refine the outline.
    - Tool: `mcp_notebooklm_notebook_query(notebook_id=..., query="Create a 4-week syllabus for [Topic] with learning objectives.")`

### Phase 3: Content Generation (The "Builder")

5. **Draft Lessons:** For each module in the syllabus:
    - Tool: `mcp_notebooklm_notebook_query(notebook_id=..., query="Write detailed lesson content for Module 1: [Module Name]. Include examples and exercises.")`
    - Save the output to a local markdown file (e.g., `course-content/module-1.md`).

2. **Create Assets:**
    - **Flashcards:** `mcp_notebooklm_flashcards_create`
    - **Quiz:** `mcp_notebooklm_quiz_create`
    - **Audio Overview:** `mcp_notebooklm_audio_overview_create` (Great for intro lessons!)

### Phase 4: Packaging

7. **Finalize:** Combine all markdown files into a structured course format.
2. **Review:** Use the `code-reviewer` agent (if applicable) or manual review to ensure quality.

## Example Triggers

- "Create a course on [Topic]"
- "Build a syllabus for [Subject]"
- "Research and draft a lesson on [Concept]"

## Instructions for Agent

- Always start by confirming the **Topic** and **Target Audience**.
- Use `notebook_id` consistently across calls.
- Execute one phase at a time to allow for user feedback.
- If NotebookLM returns an error, verify auth with `notebooklm-mcp-auth`.
