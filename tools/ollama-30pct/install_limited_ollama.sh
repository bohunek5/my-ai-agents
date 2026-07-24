#!/usr/bin/env bash
set -euo pipefail

LABEL="com.local.ollama-limited"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OLLAMA_BIN="$(command -v ollama || true)"

if [[ -z "$OLLAMA_BIN" ]]; then
  echo "ollama not found in PATH" >&2
  exit 1
fi

TOTAL_RAM_BYTES="$(sysctl -n hw.memsize)"
MAX_RSS_BYTES="$(( TOTAL_RAM_BYTES * 30 / 100 ))"

mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs"

ollama create message-reply-local -f "$ROOT_DIR/Modelfile.message-reply"

cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>
  <key>ProgramArguments</key>
  <array>
    <string>$OLLAMA_BIN</string>
    <string>serve</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>OLLAMA_HOST</key>
    <string>127.0.0.1:11434</string>
    <key>OLLAMA_NUM_PARALLEL</key>
    <string>1</string>
    <key>OLLAMA_MAX_LOADED_MODELS</key>
    <string>1</string>
    <key>OLLAMA_KEEP_ALIVE</key>
    <string>5m</string>
  </dict>
  <key>HardResourceLimits</key>
  <dict>
    <key>ResidentSetSize</key>
    <integer>$MAX_RSS_BYTES</integer>
  </dict>
  <key>SoftResourceLimits</key>
  <dict>
    <key>ResidentSetSize</key>
    <integer>$MAX_RSS_BYTES</integer>
  </dict>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>StandardOutPath</key>
  <string>$HOME/Library/Logs/ollama-limited.out.log</string>
  <key>StandardErrorPath</key>
  <string>$HOME/Library/Logs/ollama-limited.err.log</string>
</dict>
</plist>
PLIST

launchctl bootout "gui/$(id -u)" "$PLIST" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
launchctl enable "gui/$(id -u)/$LABEL"

echo "Installed $LABEL"
echo "RAM limit: $MAX_RSS_BYTES bytes (~30% of $TOTAL_RAM_BYTES)"
echo "Model: message-reply-local"
