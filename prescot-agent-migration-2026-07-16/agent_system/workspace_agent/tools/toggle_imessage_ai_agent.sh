#!/usr/bin/env bash
set -euo pipefail

ROOT="/Users/karolbohdanowicz/my-ai-agents"
APP_SUPPORT="$HOME/Library/Application Support/iMessageAIAgent"
LABEL="com.local.imessage-ai-agent"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
STATUS_FILE="$APP_SUPPORT/status"
LOG_FILE="$APP_SUPPORT/agent.log"
PID_FILE="$APP_SUPPORT/agent.pid"
PYTHON_BIN="$(command -v python3)"
REPO_APP="$ROOT/apps/AI-iMessage-Agent.app"
DESKTOP_APP="$HOME/Desktop/AI-iMessage-Agent.app"
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
    notify "AI iMessage juz wlaczony" "Agent AI dziala w tle."
    return 0
  fi

  : > "$LOG_FILE"
  launchctl bootout "gui/$(id -u)" "$PLIST" >/dev/null 2>&1 || true
  rm -f "$PLIST"

  (
    cd "$ROOT"
    export OLLAMA_MODEL="message-reply-local"
    export OLLAMA_URL="http://127.0.0.1:11434/api/chat"
    export IMESSAGE_AI_POLL_SECONDS="8"
    exec "$PYTHON_BIN" "$ROOT/tools/imessage_ai_agent.py"
  ) >> "$LOG_FILE" 2>&1 &
  echo "$!" > "$PID_FILE"

  sleep 2
  if grep -q "PERMISSION_ERROR\\|authorization denied" "$LOG_FILE" 2>/dev/null; then
    turn_off
    printf "off\n" > "$STATUS_FILE"
    set_app_icon off
    set_finder_label 2
    notify "AI iMessage brak uprawnien" "Dodaj AI-iMessage-Agent.app do Full Disk Access i wlacz ponownie."
    open_full_disk_access_settings
    exit 77
  fi

  if is_running; then
    printf "on\n" > "$STATUS_FILE"
    set_app_icon on
    set_finder_label 6
    notify "AI iMessage wlaczony" "Agent AI odpisuje na iMessage w tle przez lokalna Ollama."
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
