---
name: autoresearch-loop
description: |
  Uruchamia autonomiczną pętlę badawczą (eksperymentowanie ML overnight) inspirowaną autoresearch Karpathy'ego.
  Lokalna wersja działa na Apple Silicon przez MLX (autoresearch-mlx).
  Wzorzec: Fixed Time Budget (5 minut/eksperyment) + Keep/Revert + results.tsv log.
  Triggeruje gdy user mówi: "odpal autoresearch", "eksperyment ML overnight", "trenuj przez noc", "autoresearch loop", "uruchom pętlę badawczą".
---

# 🔬 SKILL: autoresearch-loop

Inspiracja: [karpathy/autoresearch](https://github.com/karpathy/autoresearch) + fork MLX [trevin-creator/autoresearch-mlx](https://github.com/trevin-creator/autoresearch-mlx)

## B.L.A.S.T. Protocol

### BLUEPRINT
Ten skill uruchamia autonomicznego agenta ML badawczego na Apple Silicon (MLX, bez PyTorch/CUDA).
Agent iteruje eksperymentami nad `train.py` w pętli "na zawsze" lub do ręcznego zatrzymania.

### Link
Kod żyje w: `/Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/`
Wyniki: `results.tsv` (tab-separated)
Log każdego runu: `run.log`

---

## Kroki Setup (jednorazowo)

```bash
# 1. Przejdź do katalogu
cd /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx

# 2. Zainstaluj dependencje (MLX, numpy, pyarrow, etc.)
uv sync

# 3. Pobierz dane i wytrenuj tokenizer (raz, ~2 minuty)
uv run prepare.py

# 4. Zrób jeden testowy run (baseline, ~7 minut)
uv run train.py
```

## Uruchomienie pętli agenta

Otwórz ten plik (`program.md`) i podaj go do agenta (Claude Code/Antigravity):

```
Hi, have a look at program.md and let's kick off a new experiment! let's do the setup first.
```

Agenta instruuje `program.md` w katalogu autoresearch-mlx.

---

## Wzorzec Fixed Time Budget (zastosowanie w Antigravity)

Ten wzorzec można zastosować do **każdego** autonomicznego zadania:

```python
# ZAMIAST: "skończ zadanie X"
# UŻYJ: "masz 5 minut, zoptymalizuj ile się da"

EXPERIMENT_LOOP:
  1. Zmodyfikuj JEDEN plik (single file scope)
  2. Commit: git commit -m "experiment: <opis>"
  3. Uruchom (fixed budget: 5 min)
  4. Odczytaj metrykę (val_bpb, lub dowolna inna)
  5. KEEP jeśli lepsza → amend commit + results.tsv
  6. REVERT jeśli gorsza → git reset --hard <poprzedni commit>
  7. LOOP FOREVER (nie pytaj człowieka, bądź autonomiczny)
```

### Logi, które należy prowadzić (results.tsv format):
```
commit	val_bpb	memory_gb	status	description
383abb4	2.667000	26.9	keep	baseline
909dd59	2.588904	26.9	keep	halve total batch size to 2^16
4161af3	2.533728	26.9	keep	increase matrix LR to 0.04
```

---

## Program.md Pattern (co kradniemy dla naszych SKILL.md)

Karpathy używa `program.md` jako mini-skill dla agenta. Kluczowe elementy:

1. **Jednoznaczny scope** — agent modyfikuje TYLKO `train.py`
2. **Fixed time budget** — każdy eksperyment = dokładnie 5 minut
3. **Prosta metryka** — jedna liczba (val_bpb), niżej = lepiej
4. **Keep/Revert via git** — git jako mechanizm eksperymentowania
5. **NEVER STOP** — agent działa autonomicznie do ręcznego zatrzymania
6. **Simplicity criterion** — prostota jest wartością, nie kompromisem

---

## Telegram Voice Report (po ukończeniu sesji)

```bash
say -v Zosia "Sesja autoresearch zakończona. Sprawdź wyniki w results dot tsv."
```

---

## Quickref Commands

```bash
# Status eksperymentów
cat /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/results.tsv

# Ostatni log
tail -n 50 /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/run.log

# Aktualny stan gałęzi
cd /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx && git log --oneline -10

# Wyniki val_bpb
grep "^val_bpb:" /Users/karolbohdanowicz/my-ai-agents/autoresearch-mlx/run.log
```
