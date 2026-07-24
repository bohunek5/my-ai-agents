#!/bin/zsh
cd "$(dirname "$0")"
PORT="${PORT:-3001}" TARGET_URL="${TARGET_URL:-http://localhost:3000}" npm start
