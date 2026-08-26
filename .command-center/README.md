# Command Center · Rutyny

`routines.json` jest lokalną bazą automatyzacji. Możesz edytować ją w panelu **Rutyny**, w panelu **Pliki** albo polecić Codexowi zmianę definicji.

- `engine`: `codex`, `agy`, `ollama` lub `terminal`
- `trigger`: `manual`, `interval` lub `daily`
- `nextRunAt`: czas uruchomienia w milisekundach Unix
- logi: `logs/<routine-id>/`

Scheduler działa, gdy Agent Command Center jest uruchomiony. Nie wpisuj do promptów haseł ani kluczy API.
