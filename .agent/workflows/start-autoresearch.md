---
description: Uruchom autonomiczną pętlę badawczą ML (autoresearch-mlx na Apple Silicon)
---

# /start-autoresearch — Autonomous ML Research Loop

Uruchamia autoresearch-mlx: autonomiczny agent modyfikuje `train.py`, trenuje 5 minut, keep/revert, i iteruje przez noc.

## Setup (tylko za pierwszym razem)

// turbo
1. Sprawdź czy dane są gotowe:
```bash
ls ~/.cache/autoresearch/ 2>/dev/null || echo "BRAK DANYCH - uruchom prepare.py"
```

// turbo
2. Jeśli brak danych — uruchom prepare.py (jednorazowe, ~2 min):
```bash
cd /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx && uv run prepare.py
```

## Uruchomienie pętli

3. Utwórz gałąź dla sesji (format: autoresearch/mar22):
```bash
cd /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx && git checkout -b autoresearch/$(date +%b%d | tr '[:upper:]' '[:lower:]')
```

// turbo
4. Zrób baseline run (pierwszy raz na tej sesji, ~7 min):
```bash
cd /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx && uv run train.py > run.log 2>&1
```

// turbo
5. Sprawdź wyniki baseline:
```bash
grep "^val_bpb:\|^peak_vram_mb:" /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/run.log
```

6. Otwórz Antigravity/Claude Code i wpisz:
```
Have a look at program.md in /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx 
and kick off a new experiment loop! Setup is done, baseline is in results.tsv.
```

Agent będzie teraz działał autonomicznie — NEVER STOP — aż go ręcznie zatrzymasz.

## Monitorowanie (w osobnym terminalu)

// turbo
7. Live monitoring wyników:
```bash
watch -n 60 "cat /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/results.tsv"
```

// turbo
8. Ostatni log:
```bash
tail -n 30 /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/run.log
```

## Po sesji

// turbo
9. Raport głosowy:
```bash
say -v Zosia "Sesja autoresearch zakończona. Sprawdź wyniki w results tsv."
```

// turbo
10. Podsumuj wyniki:
```bash
cat /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/results.tsv
```
