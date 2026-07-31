#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/karolbohdanowicz/my-ai-agents"
APP="$HOME/Applications/AI iMessage Agent Bar.app"
BINARY="$APP/Contents/MacOS/AIiMessageAgentBar"
SOURCE="$ROOT/apps/AI-iMessage-Agent-Bar/AppDelegate.swift"
INFO_PLIST="$ROOT/apps/AI-iMessage-Agent-Bar/Info.plist"
REPO_APP="$ROOT/apps/AI-iMessage-Agent-Bar.app"
LABEL="com.local.imessage-ai-agent-bar"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

if [[ ! -f "$SOURCE" || ! -f "$INFO_PLIST" ]]; then
  echo "Missing status bar source files in $ROOT/apps/AI-iMessage-Agent-Bar" >&2
  exit 1
fi

mkdir -p \
  "$APP/Contents/MacOS" \
  "$REPO_APP/Contents/MacOS" \
  "$HOME/Library/LaunchAgents"

/usr/bin/xcrun swiftc -O -framework AppKit "$SOURCE" -o "$BUILD_DIR/AIiMessageAgentBar"

for app_path in "$REPO_APP" "$APP"; do
  cp "$BUILD_DIR/AIiMessageAgentBar" "$app_path/Contents/MacOS/AIiMessageAgentBar"
  cp "$INFO_PLIST" "$app_path/Contents/Info.plist"
  chmod 755 "$app_path/Contents/MacOS/AIiMessageAgentBar"
done

mkdir -p "$HOME/Library/LaunchAgents"

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
    <string>$BINARY</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>ProcessType</key>
  <string>Interactive</string>
</dict>
</plist>
PLIST

launchctl bootout "gui/$(id -u)" "$PLIST" >/dev/null 2>&1 || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
launchctl enable "gui/$(id -u)/$LABEL"

echo "Installed $LABEL"
