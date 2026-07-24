---
name: proxmox-agent
description: Skill for managing and configuring the Proxmox AI Agent in n8n.
---

# Proxmox AI Agent Skill

## Overview

This skill provides instructions and tools for integrating a natural language AI agent into n8n to manage Proxmox VE.

## Key Components

- **Trigger**: Chat (n8n), Telegram, Webhook, or Gmail.
- **AI Model**: Google Gemini (or any compatible LLM).
- **Tooling**: Proxmox API connection for node and VM management.

## Setup Instructions

1. Import `proxmox_agent.json` into n8n.
2. Configure Proxmox Credentials (Header Auth).
3. Configure Gemini/LLM Credentials.
4. Translate nodes if necessary (done in this task).

## Maintenance

- Keep Proxmox API Token secure.
- Monitor LLM token usage.
