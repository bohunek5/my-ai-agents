---
name: gravity-claw
description: Builds and deploys Gravity Claw — a lean, secure personal AI agent on Telegram. TypeScript, Claude/OpenRouter LLM, SQLite memory, Whisper voice input, ElevenLabs TTS, Railway deployment. Use when user wants to build or deploy their personal Telegram bot agent.
---

# 🦾 Gravity Claw — Personal AI Agent Skill

A lean, secure, fully-understood personal AI agent inspired by OpenClaw (ClawdBot/Moltbot). Built from scratch — not a fork — so every line is understood.

---

## Architecture Principles

| Principle | Detail |
|-----------|--------|
| **TypeScript** | ES modules, modular folder structure |
| **Telegram-only** | No web server, no exposed ports, no HTTP endpoints |
| **Security by default** | Telegram user ID whitelist, `.env` secrets only |
| **Agentic loop** | LLM can call tools, get results, call more tools (max iterations with safety limit) |
| **MCP for integrations** | Model Context Protocol servers instead of community skill files. No untrusted code. |
| **Local-first** | Everything runs on your machine. Data never leaves unless explicitly connected. |

## Core Tech Stack

| Package | Purpose |
|---------|---------|
| `grammy` | Telegram bot framework |
| `@anthropic-ai/sdk` or `openai` | LLM (Claude / OpenRouter) |
| `better-sqlite3` + FTS5 | Persistent memory |
| `openai` SDK | Whisper transcription |
| ElevenLabs API | Text-to-speech |
| `tsx` | Dev runner, TypeScript strict mode |

---

## 🔒 Security Requirements (Non-Negotiable)

1. **User ID whitelist** — only respond to your Telegram user ID. Silently ignore everyone else.
2. **No web server** — use Telegram long-polling, never expose a port.
3. **Secrets in `.env` only** — never in code, never in memory files, never in logs.
4. **Tool safety** — dangerous shell commands require confirmation. Max iteration limit on agent loop.
5. **No third-party skill files** — integrations via MCP only (standardized, auditable, separate process).

---

## Build Levels

Build in order — complete each level before moving to next:

- **Level 1 — Foundation:** Telegram bot + LLM + basic agent loop (one tool: `get_current_time`)
- **Level 2 — Memory:** Persistent memory (SQLite + FTS5 + memory tools)
- **Level 3 — Voice:** Voice messages (Whisper in, ElevenLabs out)
- **Level 4 — Tools:** Tools + MCP bridge (shell, files, external services)
- **Level 5 — Heartbeat:** Proactive morning briefing, scheduled check-ins

Start with Level 1. User confirms before moving to next level.

---

## 🚂 Railway Deployment — Standard Operating Procedures

### Project Setup (One-Time)

```bash
npm install -g @railway/cli
railway login --browserless
railway link   # Select your project and service
```

Set env vars:

```bash
railway variables set TELEGRAM_BOT_TOKEN="your-token"
railway variables set OPENROUTER_API_KEY="your-key"
# repeat for all vars
```

---

### The Dev Cycle (Do This EVERY Time)

```
1. Pause Railway  →  2. Test Locally  →  3. Deploy  →  4. Verify
```

#### Phase 1: Pause Railway (Enter Dev Mode)

⚠️ **Always pause first.** Two bot instances polling the same Telegram token = messages get split between Railway and your laptop.

```bash
railway down
```

#### Phase 2: Test Locally

```bash
npm run dev
```

Runs `tsx watch src/index.ts` — auto-restarts on code changes. Test on Telegram in real time. When done: `Ctrl+C`.

#### Phase 3: Deploy to Railway

```bash
# 3a: Type-check
npx tsc --noEmit

# 3b: Set new env vars (if added)
railway variables set NEW_VAR_NAME="value"

# 3c: Deploy
railway up --detach
```

Takes ~60–90 seconds. Bot briefly goes offline during rebuild.

#### Phase 4: Verify

```bash
railway logs --lines 40
```

All of these should appear:

- `✅ Soul loaded (soul.md)`
- `✅ Connected as @your_bot_name`
- `✅ Heartbeat scheduled`
- No crash traces or unhandled errors

---

## Quick Reference Commands

| Task | Command |
|------|---------|
| Pause the live bot | `railway down` |
| Start local dev | `npm run dev` |
| Type-check | `npx tsc --noEmit` |
| Deploy to Railway | `railway up --detach` |
| View live logs | `railway logs --lines 100` |
| Set a new env var | `railway variables set KEY="value"` |
| List all env vars | `railway variables` |
| Open dashboard | `railway open` |

---

## Important SQLite Note

Railway's filesystem is **ephemeral**. SQLite database (`gravity-claw.db`) resets on every deploy — short-term memory resets. For persistent semantic memory: use **Pinecone** (cloud-hosted, survives deploys).

## Files Deployed via Dockerfile

✅ `src/`, `tsconfig.json`, `soul.md`, `mcp.json`, `package.json`, `package-lock.json`

❌ NOT deployed: `.env`, `node_modules/`, `gravity-claw.db`

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| **Build failed** | `railway logs --lines 100` — look for npm or TypeScript errors |
| **Bot crashes on startup** | Check missing env vars: `railway variables` |
| **Messages going to wrong place** | Two instances running — `railway down` before `npm run dev` |
| **Need to rollback** | Fix locally, then `railway up --detach` again |
