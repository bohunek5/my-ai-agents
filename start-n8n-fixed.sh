#!/bin/bash
# 🤖 FIXED ANTIGRAVITY n8n LAUNCHER
# Ten skrypt omija błędy EPERM w folderze .npm przez użycie /tmp/npm_cache

export NPM_CONFIG_CACHE="/tmp/npm_cache"
export NODE_OPTIONS="--max-old-space-size=8192"
export N8N_LOG_LEVEL="warn"
export NODE_FUNCTION_ALLOW_BUILTIN="fs,path,os"
export NODE_FUNCTION_ALLOW_EXTERNAL="*"

mkdir -p /tmp/npm_cache

echo "🚀 Uruchamiam n8n z obejściem EPERM (cache w /tmp/npm_cache)..."
npx -y n8n@latest > /tmp/n8n_output.log 2>&1 &
echo "✅ Proces n8n wystartował w tle. Sprawdź logi w /tmp/n8n_output.log"
sleep 5
curl -s http://localhost:5678/healthz && echo -e "\n🔥 n8n JEST ONLINE!"
