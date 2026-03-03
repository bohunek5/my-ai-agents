---
name: skillx
description: AI agent skills marketplace discovery and execution tool. Hybrid search for semantic and keyword-based skill discovery.
source: https://github.com/nextlevelbuilder
---

# 🚀 SkillX (Agent Intelligence Marketplace)

SkillX is the ultimate hub for discovering and executing specialized AI agent skills. It combines a web marketplace, a CLI tool, and a hybrid search engine.

## 🛠️ QUICK START (CLI)

- **Search**: `skillx search "data processing"`
- **Use**: `skillx use skillx-search`
- **One-shot**: `skillx use "data processing" --search`
- **Report**: `skillx report --outcome success --duration 1234`
- **Config**: `skillx config set SKILLX_API_KEY sk_prod_...`

## 🧠 ARCHITECTURE & ENGINE

1. **Web Marketplace**: 500+ skills, ratings, usage stats, leaderboard.
2. **Hybrid Search**:
   - Semantic (Vector embeddings: `bge-base-en-v1.5`)
   - Keyword (SQLite FTS5)
   - Ranking: Reciprocal Rank Fusion + Boost Scoring.
3. **CLI**: Programmatic access to search, use, and report skills.

## 🏗️ PROJECT STRUCTURE

- `apps/web/`: React Router SSR app (Cloudflare Workers + D1).
- `packages/cli/`: Node-based CLI package.
- `.claude-plugin/`: Claude Code marketplace integration.
- `.claude/skills/`: Native skill definitions (e.g., `skill-creator`, `skillx`).

## ⚙️ TECH STACK (Admin Reference)

- **Frontend**: React Router v7 + Tailwind v4 (Dark Theme, Mint Accent).
- **Backend**: Cloudflare Workers + D1 (SQLite) + KV (Cache) + R2 (Storage).
- **AI**: Vectorize (Embeddings) + Workers AI.
- **Auth**: Better Auth + GitHub OAuth.

## 🧪 PERFORMANCE & SECURITY

- **Latency**: <800ms search p95.
- **Security**: SHA-256 hashed API keys, secure session cookies, SQL injection prevention.
- **Uptime**: 99.9% target.
