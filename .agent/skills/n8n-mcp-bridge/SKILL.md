---
name: n8n-mcp-bridge
description: Bridges Antigravity with n8n via native MCP support. Allows executing n8n workflows, checking execution history, and managing webhooks directly from the chat interface. Use this whenever the user asks to trigger an automation or check n8n status.
---

# n8n MCP Bridge

## When to use this skill

- To trigger specific n8n workflows by ID or Name.
- To check the status of recent workflow executions.
- To list available workflows in the n8n instance.
- To manage webhooks and automated triggers.

## Prerequisites

- `n8n` must be running locally (usually on port 5678).
- MCP support must be enabled in `n8n` settings or via the `@n8n/mcp-server`.

## Heuristics & Commands

- **List Workflows:** Use `n8n_list_workflows` to see what automations are available.
- **Trigger Workflow:** Use `n8n_trigger_workflow` with the `workflowId` and optional `payload`.
- **Check Status:** Use `n8n_get_execution` to see if a background task finished successfully.

## Protocol for Automation

1. **Identify Task:** Does the user want a recurring task or a complex multi-step integration?
2. **Search n8n:** Check if a workflow already exists for this task.
3. **Execute:** Trigger the workflow and report the execution ID to the user.
4. **Monitor:** If the task is long-running, use `say -v Zosia` to report completion.

## Cost & Telemetry

- Always log the start and end of MCP-based automations.
- If the workflow uses expensive APIs (OpenAI, Claude), note the estimated cost in `token_telemetry.log`.
