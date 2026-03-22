---
description: Uruchom n8n z pełnym ekosystemem Antigravity (6GB RAM, Ollama check, auto-browser)
---

// turbo-all

## Kroki:

1. Upewnij się że Ollama działa
```bash
curl -s http://localhost:11434/api/tags | python3 -c "import json,sys; models=json.load(sys.stdin).get('models',[]); print('Modele:', [m['name'] for m in models])"
```

2. Uruchom n8n z 6GB RAM i auto-open przeglądarki
```bash
cd /Users/karolbohdanowicz/my-ai-agents && ./start-n8n.sh
```

Alternatywnie przez npm:
```bash
cd /Users/karolbohdanowicz/my-ai-agents && npm run n8n
```
