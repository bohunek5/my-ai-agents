#!/bin/bash
# ╔══════════════════════════════════════════════════════════════╗
# ║                                                              ║
# ║   ░█████╗░███╗░░██╗████████╗██╗░██████╗░██████╗░░░░░░       ║
# ║   ██╔══██╗████╗░██║╚══██╔══╝██║██╔════╝░██╔══██╗░░░░░       ║
# ║   ███████║██╔██╗██║░░░██║░░░██║██║░░██╗░██████╔╝░░░░░       ║
# ║   ██╔══██║██║╚████║░░░██║░░░██║██║░░╚██╗██╔══██╗░░░░░       ║
# ║   ██║░░██║██║░╚███║░░░██║░░░██║╚██████╔╝██║░░██║░░░░░       ║
# ║   ╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░╚═╝░╚═════╝░╚═╝░░╚═╝░░░░░       ║
# ║                                                              ║
# ║   ANTIGRAVITY ECOSYSTEM LAUNCHER v3.0                        ║
# ║   n8n + OpenClaw + Ollama (Nemotron)                         ║
# ╚══════════════════════════════════════════════════════════════╝

# ── Kolory i UI ───────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

clear
echo ""
echo -e "${CYAN}${BOLD}╔══════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}${BOLD}║   🤖  ANTIGRAVITY ECOSYSTEM LAUNCHER v3.0           ║${NC}"
echo -e "${CYAN}${BOLD}║   n8n  •  OpenClaw  •  Ollama/Nemotron              ║${NC}"
echo -e "${CYAN}${BOLD}╚══════════════════════════════════════════════════════╝${NC}"
echo ""

# ── Funkcja statusu ───────────────────────────────────────────
check_service() {
    local name=$1 url=$2 port=$3
    if curl -s --max-time 1 "$url" > /dev/null 2>&1; then
        echo -e "  ${GREEN}●${NC} ${BOLD}$name${NC} ${GREEN}ONLINE${NC} → ${BLUE}$url${NC}"
        return 0
    else
        echo -e "  ${RED}○${NC} ${BOLD}$name${NC} ${RED}OFFLINE${NC} (port $port)"
        return 1
    fi
}

echo -e "${BOLD}▸ Status ekosystemu:${NC}"
check_service "Ollama    " "http://localhost:11434" "11434"
N8N_ALIVE=$(check_service "n8n       " "http://localhost:5678/healthz" "5678"; echo $?)
check_service "OpenClaw  " "http://localhost:18777" "18777"
echo ""

# ── Ollama — sprawdź modele ───────────────────────────────────
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    MODELS=$(curl -s http://localhost:11434/api/tags | python3 -c \
      "import json,sys; m=json.load(sys.stdin).get('models',[]); print(' • '.join([x['name'] for x in m]))" 2>/dev/null)
    echo -e "${BOLD}▸ Modele Ollama:${NC} ${CYAN}$MODELS${NC}"
    echo ""
else
    echo -e "${YELLOW}⚠  Ollama nie działa — uruchom: ${BOLD}ollama serve${NC}"
    echo ""
fi

# ── Uruchom OpenClaw (jeśli nie działa) ──────────────────────
if ! curl -s --max-time 1 http://localhost:18777 > /dev/null 2>&1; then
    echo -e "${BOLD}▸ Startuję OpenClaw...${NC}"
    cd ~/openclaw-atom/node_modules/openclaw-atom
    node openclaw.mjs gateway --allow-unconfigured > /tmp/openclaw.log 2>&1 &
    OPENCLAW_PID=$!
    sleep 2
    if curl -s --max-time 2 http://localhost:18777 > /dev/null 2>&1; then
        echo -e "  ${GREEN}✓${NC} OpenClaw uruchomiony ${GREEN}(PID: $OPENCLAW_PID)${NC}"
    else
        echo -e "  ${YELLOW}⚡ OpenClaw startuje... sprawdź /tmp/openclaw.log${NC}"
    fi
    cd /Users/karolbohdanowicz/my-ai-agents
    echo ""
fi

# ── Uruchom n8n ───────────────────────────────────────────────
if [ "$N8N_ALIVE" = "0" ]; then
    echo -e "${YELLOW}⚠  n8n już działa! Otwieranie przeglądarki...${NC}"
    open "http://localhost:5678" 2>/dev/null
    exit 0
fi

echo -e "${BOLD}▸ Startuję n8n z 8GB RAM + fs access...${NC}"
echo -e "  ${CYAN}→ http://localhost:5678${NC}"
echo ""
echo -e "${CYAN}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Auto-open po 6 sekundach
(sleep 6 && open "http://localhost:5678" && echo -e "${GREEN}🌐 Browser otwarty!${NC}") &

# Start n8n z 8GB heap + odblokowane fs dla Code nodes
export NODE_OPTIONS="--max-old-space-size=8192"
export N8N_LOG_LEVEL="warn"
export NODE_FUNCTION_ALLOW_BUILTIN="fs,path,os"
export NODE_FUNCTION_ALLOW_EXTERNAL="*"

npx -y n8n@latest
