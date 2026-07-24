# Prescot Agent Migration

Data utworzenia: 2026-07-16

Ten pakiet zawiera robocze materialy Prescot oraz konfiguracje agentow/skilli/MCP do przeniesienia na drugi komputer.

## Struktura

- `prescot_projects/` - projekty i katalogi zwiazane z Prescot.
- `prescot_assets/` - pojedyncze pliki/logo/CSV/komendy Prescot znalezione w workspace.
- `agent_system/codex/` - konfiguracja, reguly, skille i pluginy Codexa.
- `agent_system/agents_dotdir/` - dodatkowe skille z `~/.agents`.
- `agent_system/workspace_agent/` - lokalne agenty, skrypty, narzedzia i `.agent` z repo.
- `mcp/` - kopia `mcp_config.json`.
- `optional_gemini_antigravity_prescot/` - przefiltrowane pliki Prescot z Gemini/Antigravity.
- `_manifests/` - listy plikow, katalogow, rozmiar i informacje o budowie paczki.

## Swiadomie pominiete

- `node_modules/`
- `.next/`, `dist/`, `build/`
- cache/temp
- `.env`, `.env.*`
- pliki z `auth`, `token`, `secret`
- klucze `.pem`, `.key`
- pliki specjalne/sockety

## Po rozpakowaniu na drugim komputerze

1. Skopiuj zawartosc `agent_system/codex/` do `~/.codex/`.
2. Skopiuj zawartosc `agent_system/agents_dotdir/` do `~/.agents/`.
3. Projekty z `prescot_projects/` przenies do wybranego katalogu roboczego.
4. Jesli uzywasz lokalnego MCP, przenies `mcp/mcp_config.json` do odpowiedniego katalogu `.agent/` albo porownaj z obecnym configiem.
5. Otworz `~/.codex/config.toml` i popraw stare sciezki z `/Users/karolbohdanowicz/...` na sciezki z nowego komputera.
6. Zaloguj Codexa/Google/GitHub od nowa zamiast kopiowac sekrety.

