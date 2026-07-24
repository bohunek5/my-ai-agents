#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/karolbohdanowicz/my-ai-agents"
APP_SUPPORT="$HOME/Library/Application Support/iMessageAIAgent"
LABEL="com.local.imessage-ai-agent"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
STATUS_FILE="$APP_SUPPORT/status"
LOG_FILE="$APP_SUPPORT/agent.log"
PID_FILE="$APP_SUPPORT/agent.pid"
PYTHON_APP_BIN="/Library/Developer/CommandLineTools/Library/Frameworks/Python3.framework/Versions/3.9/Resources/Python.app/Contents/MacOS/Python"
if [[ -x "$PYTHON_APP_BIN" ]]; then
  PYTHON_BIN="$PYTHON_APP_BIN"
else
  PYTHON_BIN="$(command -v python3)"
fi
REPO_APP="$ROOT/apps/AI-iMessage-Agent.app"
DESKTOP_APP="$HOME/Desktop/AI-iMessage-Agent.app"
BAR_APP="$HOME/Applications/AI iMessage Agent Bar.app"
REPO_BAR_APP="$ROOT/apps/AI-iMessage-Agent-Bar.app"
COMMAND="${1:-toggle}"

mkdir -p "$APP_SUPPORT" "$HOME/Library/LaunchAgents"

notify() {
  /usr/bin/osascript -e "display notification \"$2\" with title \"$1\"" >/dev/null 2>&1 || true
}

open_full_disk_access_settings() {
  open "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles" >/dev/null 2>&1 || true
}

set_finder_label() {
  local label_index="$1"
  for app_path in "$REPO_APP" "$DESKTOP_APP"; do
    if [[ -e "$app_path" ]]; then
      /usr/bin/osascript >/dev/null 2>&1 <<OSA || true
tell application "Finder"
  set label index of item POSIX file "$app_path" to $label_index
end tell
OSA
    fi
  done
}

set_app_icon() {
  local variant="$1"
  for app_path in "$REPO_APP" "$DESKTOP_APP"; do
    if [[ -d "$app_path" && -f "$app_path/Contents/Resources/AppIcon-$variant.icns" ]]; then
      cp "$app_path/Contents/Resources/AppIcon-$variant.icns" "$app_path/Contents/Resources/AppIcon.icns"
      touch "$app_path"
    fi
  done
  /usr/bin/qlmanage -r >/dev/null 2>&1 || true
  killall Dock >/dev/null 2>&1 || true
}

open_status_bar() {
  local app_path=""
  if [[ -d "$BAR_APP" ]]; then
    app_path="$BAR_APP"
  elif [[ -d "$REPO_BAR_APP" ]]; then
    app_path="$REPO_BAR_APP"
  fi
  if [[ -n "$app_path" ]] && ! pgrep -f "AIiMessageAgentBar" >/dev/null 2>&1; then
    /usr/bin/open -gj "$app_path" >/dev/null 2>&1 || true
  fi
}

is_running() {
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]] && kill -0 "$pid" >/dev/null 2>&1; then
      return 0
    fi
    rm -f "$PID_FILE"
  fi
  printf "off\n" > "$STATUS_FILE"
  return 1
}

turn_off() {
  launchctl bootout "gui/$(id -u)" "$PLIST" >/dev/null 2>&1 || true
  rm -f "$PLIST"
  if [[ -f "$PID_FILE" ]]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [[ -n "$pid" ]]; then
      kill "$pid" >/dev/null 2>&1 || true
    fi
    rm -f "$PID_FILE"
  fi
  printf "off\n" > "$STATUS_FILE"
  set_app_icon off
  set_finder_label 2
  notify "AI iMessage wylaczony" "Agent AI w tle zostal zatrzymany."
}

turn_on() {
  if is_running; then
    printf "on\n" > "$STATUS_FILE"
    set_app_icon on
    set_finder_label 6
    open_status_bar
    notify "AI iMessage juz wlaczony" "Agent AI dziala w tle."
    return 0
  fi

  : > "$LOG_FILE"
  launchctl bootout "gui/$(id -u)" "$PLIST" >/dev/null 2>&1 || true
  rm -f "$PLIST"
  rm -f "$PID_FILE"

  cat > "$PLIST" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$LABEL</string>
  <key>WorkingDirectory</key>
  <string>$ROOT</string>
  <key>ProgramArguments</key>
  <array>
    <string>$PYTHON_BIN</string>
    <string>$ROOT/tools/imessage_ai_agent.py</string>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>$PATH:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin</string>
    <key>IMESSAGE_AI_MODEL</key>
    <string>${IMESSAGE_AI_MODEL:-gpt-5.6}</string>
    <key>IMESSAGE_AI_REASONING_EFFORT</key>
    <string>${IMESSAGE_AI_REASONING_EFFORT:-medium}</string>
    <key>IMESSAGE_AI_POLL_SECONDS</key>
    <string>8</string>
    <key>IMESSAGE_AI_STARTUP_SMS</key>
    <string>${IMESSAGE_AI_STARTUP_SMS:-1}</string>
  </dict>
  <key>StandardOutPath</key>
  <string>$LOG_FILE</string>
  <key>StandardErrorPath</key>
  <string>$LOG_FILE</string>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
PLIST

  launchctl bootstrap "gui/$(id -u)" "$PLIST"
  launchctl enable "gui/$(id -u)/$LABEL" >/dev/null 2>&1 || true

  sleep 2
  if grep -q "PERMISSION_ERROR\\|authorization denied" "$LOG_FILE" 2>/dev/null; then
    turn_off
    printf "off\n" > "$STATUS_FILE"
    set_app_icon off
    set_finder_label 2
    notify "AI iMessage brak uprawnien" "Full Disk Access: dodaj Python.app z CommandLineTools i AI iMessage Agent Bar.app."
    open_full_disk_access_settings
    exit 77
  fi

  if is_running; then
    printf "on\n" > "$STATUS_FILE"
    set_app_icon on
    set_finder_label 6
    open_status_bar
    notify "AI iMessage wlaczony" "Agent AI dziala w tle, a status jest w pasku menu."
  else
    printf "off\n" > "$STATUS_FILE"
    set_app_icon off
    set_finder_label 2
    notify "AI iMessage nie wystartowal" "Sprawdz log: Library/Application Support/iMessageAIAgent/agent.log"
    exit 1
  fi
}

case "$COMMAND" in
  on)
    turn_on
    ;;
  off)
    turn_off
    ;;
  status)
    if is_running; then
      echo "on"
    else
      echo "off"
    fi
    ;;
  toggle)
    if is_running; then
      turn_off
    else
      turn_on
    fi
    ;;
  *)
    echo "Usage: $0 [on|off|toggle|status]" >&2
    exit 2
    ;;
esac
