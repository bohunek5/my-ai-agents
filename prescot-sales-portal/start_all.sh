#!/bin/zsh
PORTAL_DIR="/Users/karolbohdanowicz/my-ai-agents/prescot-sales-portal"

echo "🚀 Odpalam Dashboard Prescot (Tryb Lokalny)..."

# Zabij stare procesy na portach 5173 i 3001
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null

# Start Backend
cd "$PORTAL_DIR/backend" && node server.js &
BACKEND_PID=$!

# Start Frontend
cd "$PORTAL_DIR" && npm run dev -- --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

# Otwórz w safari
sleep 3
open "http://localhost:5173"

# Czekaj na sygnał wyjścia
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
