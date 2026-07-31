#!/usr/bin/env python3
import atexit
import json
import os
import re
import signal
import sqlite3
import subprocess
import sys
import time
from collections import deque
import urllib.request
from pathlib import Path

ROOT = Path("/Users/karolbohdanowicz/my-ai-agents")
sys.path.insert(0, str(ROOT / "tools"))
from ai_brain import AIError, AIUnavailable, codex_cli_available, env_bool, generate_imessage_reply, generate_text, load_env_files

APP_SUPPORT = Path.home() / "Library/Application Support/iMessageAIAgent"
STATE_PATH = APP_SUPPORT / "state.json"
LOG_PATH = APP_SUPPORT / "agent.log"
ALLOWLIST_PATH = APP_SUPPORT / "allowlist.txt"
STATUS_PATH = APP_SUPPORT / "status"
PID_PATH = APP_SUPPORT / "agent.pid"
TASKS_DIR = APP_SUPPORT / "tasks"
DB_PATH = Path.home() / "Library/Messages/chat.db"
ENV_PATHS = [
    APP_SUPPORT / ".env",
    ROOT / ".env.local",
    ROOT / ".env",
    ROOT / "firmowy-mail-raport/.env",
]
load_env_files(ENV_PATHS, override=False)
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://127.0.0.1:11434/api/chat")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "message-reply-local")
POLL_SECONDS = int(os.getenv("IMESSAGE_AI_POLL_SECONDS", "8"))
CONTEXT_LIMIT = int(os.getenv("IMESSAGE_AI_CONTEXT_LIMIT", "30"))
ALLOW_OLLAMA_FALLBACK = os.getenv("IMESSAGE_AI_ALLOW_OLLAMA_FALLBACK", "").lower() in {"1", "true", "yes", "on"}
REQUIRE_ALLOWLIST = env_bool("IMESSAGE_AI_REQUIRE_ALLOWLIST", True)
CONTROL_EMAIL = os.getenv("IMESSAGE_AI_CONTROL_EMAIL", "prezes@zeglarstwomazury.pl").strip().lower()
CONTROL_PHONE = os.getenv("IMESSAGE_AI_CONTROL_PHONE", "603045005").strip()
CONTROL_REPLY_TARGET = os.getenv("IMESSAGE_AI_CONTROL_REPLY_TARGET", CONTROL_PHONE).strip()
CONTROL_REPLY_FROM_EMAIL = os.getenv("IMESSAGE_AI_CONTROL_REPLY_FROM_EMAIL", CONTROL_EMAIL).strip().lower()
CONTROL_REPLY_FROM_ACCOUNT_ID = os.getenv("IMESSAGE_AI_CONTROL_REPLY_FROM_ACCOUNT_ID", "").strip()
CONTROL_HANDLES_RAW = os.getenv(
    "IMESSAGE_AI_CONTROL_HANDLES",
    ",".join(filter(None, [CONTROL_PHONE, CONTROL_EMAIL])),
)
CONTROL_HANDLES = [value.strip().lower() for value in CONTROL_HANDLES_RAW.split(",") if value.strip()]
PRIVATE_HANDLES_RAW = os.getenv("IMESSAGE_AI_PRIVATE_HANDLES", "")
PRIVATE_HANDLES = [value.strip().lower() for value in PRIVATE_HANDLES_RAW.split(",") if value.strip()]
CONTROL_COMMANDS_ENABLED = env_bool("IMESSAGE_AI_CONTROL_COMMANDS", True)
CONTROL_SHELL_ENABLED = env_bool("IMESSAGE_AI_CONTROL_SHELL", True)
CONTROL_CODEX_ENABLED = env_bool("IMESSAGE_AI_CONTROL_CODEX", True)
CONTROL_DEFAULT_TO_CODEX = env_bool("IMESSAGE_AI_CONTROL_DEFAULT_TO_CODEX", False)
STARTUP_SMS_ENABLED = env_bool("IMESSAGE_AI_STARTUP_SMS", True)
STARTUP_MESSAGE = os.getenv(
    "IMESSAGE_AI_STARTUP_MESSAGE",
    "Karol, czuwam nad Twoimi wiadomościami i będę odpisywał za Ciebie.",
)
CONTROL_COMMAND_TIMEOUT = int(os.getenv("IMESSAGE_AI_CONTROL_TIMEOUT", "120"))
MAX_SMS_CHARS = int(os.getenv("IMESSAGE_AI_CONTROL_MAX_CHARS", "1200"))
RUNNING_CODEX_TASKS = {}
SHUTDOWN_REQUESTED = False
CLEANUP_COMPLETE = False


def log(message):
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    stamp = time.strftime("%Y-%m-%d %H:%M:%S")
    with LOG_PATH.open("a", encoding="utf-8") as handle:
        handle.write(f"[{stamp}] {message}\n")


def notify(title, body):
    subprocess.run(
        ["osascript", "-e", f'display notification {json.dumps(body)} with title {json.dumps(title)}'],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def write_status(value):
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    STATUS_PATH.write_text(value + "\n", encoding="utf-8")


def write_pid():
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    PID_PATH.write_text(f"{os.getpid()}\n", encoding="utf-8")


def clear_pid():
    try:
        if PID_PATH.exists() and PID_PATH.read_text(encoding="utf-8").strip() == str(os.getpid()):
            PID_PATH.unlink()
    except Exception:
        pass


def normalize_phone(value):
    digits = re.sub(r"\D+", "", value or "")
    if digits.startswith("0048"):
        digits = digits[2:]
    if len(digits) == 9:
        digits = "48" + digits
    return digits


def recipient_candidates(value):
    raw = (value or "").strip()
    if not raw:
        return []
    candidates = {raw}
    if "@" not in raw:
        digits = normalize_phone(raw)
        if digits:
            candidates.add(digits)
            candidates.add(f"+{digits}")
            if digits.startswith("48") and len(digits) == 11:
                candidates.add(digits[2:])
                candidates.add(f"+{digits[2:]}")
    return list(candidates)


def preferred_control_service_id(recipient):
    if CONTROL_REPLY_FROM_ACCOUNT_ID:
        return CONTROL_REPLY_FROM_ACCOUNT_ID
    if not CONTROL_REPLY_FROM_EMAIL:
        return ""
    login = f"E:{CONTROL_REPLY_FROM_EMAIL}"
    candidates = recipient_candidates(recipient)
    try:
        with sqlite3.connect(DB_PATH) as conn:
            if candidates:
                placeholders = ",".join("?" for _ in candidates)
                row = conn.execute(
                    f"""
                    SELECT account_id
                    FROM chat
                    WHERE account_login = ?
                      AND service_name = 'iMessage'
                      AND account_id IS NOT NULL
                      AND account_id != ''
                      AND chat_identifier IN ({placeholders})
                    ORDER BY ROWID DESC
                    LIMIT 1
                    """,
                    [login, *candidates],
                ).fetchone()
                if row and row[0]:
                    return str(row[0])
            row = conn.execute(
                """
                SELECT account_id
                FROM chat
                WHERE account_login = ?
                  AND service_name = 'iMessage'
                  AND account_id IS NOT NULL
                  AND account_id != ''
                ORDER BY ROWID DESC
                LIMIT 1
                """,
                (login,),
            ).fetchone()
            return str(row[0]) if row and row[0] else ""
    except Exception as exc:
        log(f"Could not resolve control service id for {recipient}: {exc}")
        return ""


def handle_matches(value, allowed_values):
    low = (value or "").strip().lower()
    digits = normalize_phone(low)
    for allowed in allowed_values:
        candidate = allowed.strip().lower()
        if not candidate:
            continue
        if "@" in candidate and low == candidate:
            return True
        allowed_digits = normalize_phone(candidate)
        if allowed_digits and digits and digits == allowed_digits:
            return True
    return False


def is_private_sender(sender):
    return bool(PRIVATE_HANDLES and handle_matches(sender, PRIVATE_HANDLES))


def private_message_needs_reply(text):
    low = clean_message_text(text).lower()
    if "?" in low:
        return True
    action_markers = (
        "mozesz",
        "możesz",
        "podeslij",
        "podeślij",
        "wyslij",
        "wyślij",
        "daj",
        "odbierz",
        "zadzwon",
        "zadzwoń",
        "kup",
        "zrob",
        "zrób",
        "sprawdz",
        "sprawdź",
        "potrzebuje",
        "potrzebuję",
        "trzeba",
        "mam problem",
        "kiedy",
        "gdzie",
        "ile",
        "jak ",
        "czemu",
        "dlaczego",
        "czy ",
    )
    return any(marker in low for marker in action_markers)


def is_control_message(sender, is_from_me):
    if not CONTROL_COMMANDS_ENABLED:
        return False
    normalized = (sender or "").strip().lower()
    if is_from_me:
        return bool(CONTROL_EMAIL and normalized == CONTROL_EMAIL)
    return handle_matches(normalized, CONTROL_HANDLES)


def control_reply_target(sender, is_from_me):
    if CONTROL_REPLY_TARGET:
        return CONTROL_REPLY_TARGET
    return sender


def clip_sms(text, limit=MAX_SMS_CHARS):
    cleaned = " ".join(str(text or "").split())
    if len(cleaned) <= limit:
        return cleaned
    return cleaned[: limit - 1].rstrip() + "…"


def tail_text(path, max_chars=900):
    if not path.exists():
        return "Brak pliku logu."
    data = path.read_text(encoding="utf-8", errors="replace")
    return data[-max_chars:].strip() or "Log pusty."


def run_local(command, timeout=20):
    return subprocess.run(
        command,
        cwd=ROOT,
        capture_output=True,
        text=True,
        timeout=timeout,
    )


def process_exists(pid):
    try:
        pid_int = int(pid)
    except (TypeError, ValueError):
        return False
    if pid_int <= 0:
        return False
    try:
        os.kill(pid_int, 0)
        return True
    except OSError:
        return False


def dangerous_shell_command(command):
    low = command.lower()
    patterns = [
        r"\brm\s+-rf\s+/",
        r"\bsudo\b",
        r"\bdd\s+",
        r"\bmkfs\b",
        r"\bdiskutil\s+erase",
        r"\bshutdown\b",
        r"\breboot\b",
        r"\blaunchctl\s+bootout\b",
    ]
    return any(re.search(pattern, low) for pattern in patterns)


def shell_command(command):
    if not CONTROL_SHELL_ENABLED:
        return "Terminal z SMS jest wyłączony. Ustaw IMESSAGE_AI_CONTROL_SHELL=1, jeśli ma działać."
    if dangerous_shell_command(command):
        return "Blokuję tę komendę jako zbyt ryzykowną przez SMS."
    try:
        result = subprocess.run(
            command,
            cwd=ROOT,
            shell=True,
            capture_output=True,
            text=True,
            timeout=CONTROL_COMMAND_TIMEOUT,
        )
    except subprocess.TimeoutExpired:
        return f"Komenda przekroczyła limit {CONTROL_COMMAND_TIMEOUT}s."
    output = "\n".join(part for part in [result.stdout.strip(), result.stderr.strip()] if part)
    if not output:
        output = "(brak wyjścia)"
    return clip_sms(f"exit={result.returncode}\n{output}")


def control_status(state):
    model = os.getenv("IMESSAGE_AI_MODEL") or os.getenv("OPENAI_MODEL") or "gpt-5.6"
    if os.getenv("OPENAI_API_KEY"):
        ai_state = "OpenAI API"
    elif codex_cli_available():
        ai_state = "Codex CLI fallback"
    else:
        ai_state = "brak OPENAI_API_KEY i brak codex CLI"
    try:
        branch = run_local(["git", "rev-parse", "--abbrev-ref", "HEAD"]).stdout.strip()
    except Exception:
        branch = "-"
    try:
        dirty = run_local(["git", "status", "--short"], timeout=10).stdout.splitlines()
        dirty_count = len(dirty)
    except Exception:
        dirty_count = -1
    tasks = [task for task in state.get("control_tasks", []) if not task.get("notified")]
    return clip_sms(
        f"Zielony. Agent działa.\n"
        f"Model: {model}\n"
        f"AI: {ai_state}\n"
        f"Workspace: {ROOT}\n"
        f"Git: {branch}, zmian: {dirty_count}\n"
        f"Aktywne zadania Codex: {len(tasks)}\n"
        f"Komendy: status, log, cmd: <komenda>, codex: <zadanie>, stop"
    )


def next_task_id(state):
    state["control_task_seq"] = int(state.get("control_task_seq", 0)) + 1
    return f"sms-{state['control_task_seq']:04d}"


def start_codex_task(prompt, state):
    if not CONTROL_CODEX_ENABLED:
        return "Codex z SMS jest wyłączony. Ustaw IMESSAGE_AI_CONTROL_CODEX=1."
    TASKS_DIR.mkdir(parents=True, exist_ok=True)
    task_id = next_task_id(state)
    stamp = time.strftime("%Y%m%d-%H%M%S")
    prompt_path = TASKS_DIR / f"{stamp}-{task_id}.md"
    log_path = TASKS_DIR / f"{stamp}-{task_id}.log"
    prompt_text = (
        "Zadanie przyszło z prywatnego kanału iMessage Karola. "
        "Pracuj w repozytorium /Users/karolbohdanowicz/my-ai-agents. "
        "Wykonaj zadanie praktycznie, sprawdź wynik i na końcu daj krótki raport.\n\n"
        f"{prompt.strip()}\n"
    )
    prompt_path.write_text(prompt_text, encoding="utf-8")
    log_handle = log_path.open("w", encoding="utf-8")
    cmd = [
        "codex",
        "exec",
        "-C",
        str(ROOT),
        "--dangerously-bypass-approvals-and-sandbox",
        "--ignore-rules",
        prompt_text,
    ]
    try:
        process = subprocess.Popen(
            cmd,
            cwd=ROOT,
            stdout=log_handle,
            stderr=subprocess.STDOUT,
            text=True,
            start_new_session=True,
        )
    except Exception as exc:
        log_handle.close()
        return f"Nie udało się uruchomić Codexa: {exc}"
    RUNNING_CODEX_TASKS[task_id] = {"process": process, "log_handle": log_handle}
    state.setdefault("control_tasks", []).append(
        {
            "id": task_id,
            "pid": process.pid,
            "pgid": process.pid,
            "prompt": prompt.strip(),
            "prompt_path": str(prompt_path),
            "log_path": str(log_path),
            "started": time.strftime("%Y-%m-%d %H:%M:%S"),
            "notified": False,
        }
    )
    save_state(state)
    return clip_sms(f"Przyjąłem zadanie {task_id} i uruchomiłem Codexa w workspace.\nLog: {log_path}")


def poll_codex_tasks(state):
    changed = False
    notifications = []
    for task in state.get("control_tasks", []):
        if task.get("notified"):
            continue
        task_id = task.get("id")
        runtime = RUNNING_CODEX_TASKS.get(task_id)
        if not runtime:
            if not process_exists(task.get("pid")):
                task["notified"] = True
                task["exit_code"] = "unknown"
                task["finished"] = time.strftime("%Y-%m-%d %H:%M:%S")
                task["note"] = "process not running after agent restart"
                changed = True
            continue
        process = runtime["process"]
        code = process.poll()
        if code is None:
            continue
        try:
            runtime["log_handle"].close()
        except Exception:
            pass
        RUNNING_CODEX_TASKS.pop(task_id, None)
        task["notified"] = True
        task["exit_code"] = code
        task["finished"] = time.strftime("%Y-%m-%d %H:%M:%S")
        log_tail = tail_text(Path(task["log_path"]), 850)
        notifications.append(clip_sms(f"Codex skończył {task_id}, exit={code}.\n{log_tail}"))
        changed = True
    if changed:
        save_state(state)
    return notifications


def unwrap_control_command_text(text):
    cleaned = clean_message_text(text).strip()
    cleaned = cleaned.strip("`").strip()
    wrappers = (
        "napisz:",
        "napisz do prezesa:",
        "wyślij:",
        "wyslij:",
        "wyślij do prezesa:",
        "wyslij do prezesa:",
        "do prezesa:",
        "prezes:",
        "agent:",
        "ai:",
    )
    changed = True
    while changed:
        changed = False
        low = cleaned.lower()
        for wrapper in wrappers:
            if low.startswith(wrapper):
                cleaned = cleaned[len(wrapper) :].strip().strip("`").strip()
                changed = True
                break
    return cleaned


def handle_control_command(incoming, state):
    global SHUTDOWN_REQUESTED
    text = " ".join((incoming or "").strip().split())
    text = unwrap_control_command_text(text)
    low = text.lower()
    if not text:
        return ""
    if low in {"pomoc", "help", "komendy"}:
        return (
            "Komendy: status | log | cmd: <komenda terminala> | codex: <zadanie> | stop. "
            "Bez prefiksu dłuższa wiadomość z tego numeru pójdzie jako zadanie do Codexa."
        )
    if low in {"status", "stan", "zielony"}:
        return control_status(state)
    if low in {"log", "logi"}:
        return clip_sms(tail_text(LOG_PATH, 1000))
    if low in {"stop", "wylacz", "wyłącz", "czerwony"}:
        SHUTDOWN_REQUESTED = True
        return "Wyłączam agenta. Status będzie czerwony/off."
    for prefix in ["cmd:", "terminal:", "!"]:
        if text.startswith(prefix):
            return shell_command(text[len(prefix) :].strip())
    for prefix in ["codex:", "zadanie:", "zrob:", "zrób:"]:
        if low.startswith(prefix):
            return start_codex_task(text[len(prefix) :].strip(), state)
    action_starts = (
        "zrob ",
        "zrób ",
        "napraw ",
        "odpal ",
        "uruchom ",
        "wrzuc ",
        "wrzuć ",
        "stworz ",
        "stwórz ",
        "zbuduj ",
        "sprawdz ",
        "sprawdź ",
        "dodaj ",
        "popraw ",
        "znajdz ",
        "znajdź ",
        "wyszukaj ",
        "przeszukaj ",
        "zobacz ",
        "ogarnij ",
        "przejrzyj ",
        "wyjasnij ",
        "wyjaśnij ",
    )
    if low.startswith(action_starts) and len(text) >= 12:
        return start_codex_task(text, state)
    if CONTROL_DEFAULT_TO_CODEX and len(text) >= 12:
        return start_codex_task(text, state)
    return generate_control_chat_reply(text)


def generate_control_chat_reply(text):
    instructions = (
        "Jestes lokalnym agentem Karola w prywatnym kanale sterowania iMessage. "
        "Odpowiadasz krotko, naturalnie, po polsku. "
        "Nie udawaj, ze cos wykonales. Jesli wiadomosc wyglada jak zadanie do komputera, powiedz krotko, zeby Karol napisal 'codex: ...' albo 'cmd: ...'. "
        "Jesli to zwykla rozmowa, odpowiedz normalnie i konkretnie. "
        "Nie wspominaj o API ani o technikaliach, chyba ze Karol pyta."
    )
    try:
        return generate_text(
            instructions=instructions,
            input_text=text,
            env_prefix="IMESSAGE_AI",
            max_output_tokens=180,
        )
    except Exception as exc:
        log(f"Control chat fallback failed: {exc}")
        return "Jestem. Do spraw technicznych pisz: status, log, codex: <zadanie> albo cmd: <komenda>."


def send_startup_notice(state):
    if not STARTUP_SMS_ENABLED or not CONTROL_REPLY_TARGET:
        return
    try:
        service_id = preferred_control_service_id(CONTROL_REPLY_TARGET)
        result = send_message(CONTROL_REPLY_TARGET, STARTUP_MESSAGE, service_id=service_id)
        log(f"Startup notice sent to {CONTROL_REPLY_TARGET} via {result}: {STARTUP_MESSAGE}")
        recent_replies.append(STARTUP_MESSAGE)
    except Exception as exc:
        log(f"Startup notice failed: {exc}")


def request_shutdown(signum=None, frame=None):
    global SHUTDOWN_REQUESTED
    SHUTDOWN_REQUESTED = True
    write_status("stopping")


def stop_codex_tasks(state):
    changed = False
    runtimes = list(RUNNING_CODEX_TASKS.items())

    for _, runtime in runtimes:
        process = runtime["process"]
        if process.poll() is None:
            try:
                os.killpg(process.pid, signal.SIGTERM)
            except OSError:
                pass

    deadline = time.monotonic() + 4
    while time.monotonic() < deadline:
        if all(runtime["process"].poll() is not None for _, runtime in runtimes):
            break
        time.sleep(0.05)

    for _, runtime in runtimes:
        process = runtime["process"]
        if process.poll() is None:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except OSError:
                pass

    for task_id, runtime in runtimes:
        process = runtime["process"]
        if process.poll() is None:
            try:
                process.wait(timeout=1)
            except subprocess.TimeoutExpired:
                try:
                    process.kill()
                except OSError:
                    pass
        try:
            runtime["log_handle"].close()
        except Exception:
            pass
        RUNNING_CODEX_TASKS.pop(task_id, None)
        for task in state.get("control_tasks", []):
            if task.get("id") != task_id or task.get("notified"):
                continue
            task["notified"] = True
            task["exit_code"] = process.poll()
            task["finished"] = time.strftime("%Y-%m-%d %H:%M:%S")
            task["note"] = "stopped together with iMessage agent"
            changed = True
            break
    if changed:
        save_state(state)


def cleanup_runtime():
    global CLEANUP_COMPLETE
    if CLEANUP_COMPLETE:
        return
    CLEANUP_COMPLETE = True
    try:
        stop_codex_tasks(load_state())
    except Exception as exc:
        log(f"Could not stop every background Codex task: {exc}")
    write_status("off")
    clear_pid()
    log("Agent stopped by control request or signal.")


def extract_text(row_text, attributed_body):
    if row_text:
        return row_text
    if not attributed_body:
        return None
    blob = attributed_body
    markers = [b"NSString\x01\x94\x84\x01+", b"NSMutableString\x01\x94\x84\x01+"]
    for marker in markers:
        idx = blob.find(marker)
        if idx == -1:
            continue
        start = idx + len(marker)
        if start >= len(blob):
            continue
        length = blob[start]
        text_start = start + 1
        if length == 0x81 and start + 1 < len(blob):
            length = blob[start + 1]
            text_start = start + 2
        try:
            return blob[text_start : text_start + length].decode("utf-8")
        except Exception:
            pass
    return None


def load_state():
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    if not STATE_PATH.exists():
        return {}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_state(state):
    APP_SUPPORT.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")


def current_max_rowid():
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute("SELECT COALESCE(MAX(ROWID), 0) FROM message").fetchone()
    return int(row[0] or 0)


def read_allowlist():
    if not ALLOWLIST_PATH.exists():
        return set()
    return {
        line.strip().lower()
        for line in ALLOWLIST_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.strip().startswith("#")
    }


def is_meaningful_text(text):
    if not text:
        return False
    cleaned = clean_message_text(text).replace("\ufffc", "").strip()
    return bool(cleaned)


def clean_message_text(text):
    return " ".join((text or "").replace("\x00", "").replace("\ufffc", "").split())


def looks_like_own_control_reply(text):
    low = clean_message_text(text).lower()
    if not low:
        return False
    own_fragments = [
        STARTUP_MESSAGE.lower(),
        "przyjąłem zadanie sms-",
        "przyjalem zadanie sms-",
        "uruchomiłem codexa",
        "uruchomilem codexa",
        "log: /users/karolbohdanowicz/library/application support/imessageaiagent/tasks/",
        "jestem. napisz: status, log",
        "jeśli to ma być zadanie na komputerze",
        "jesli to ma byc zadanie na komputerze",
        "nie udało się uruchomić codexa",
        "nie udalo sie uruchomic codexa",
        "codex skończył sms-",
        "codex skonczyl sms-",
    ]
    return any(fragment in low for fragment in own_fragments)


def new_messages(after_rowid):
    query = """
    SELECT
        m.ROWID,
        m.text,
        m.attributedBody,
        h.id as sender_id,
        h.service,
        m.is_from_me,
        COALESCE(
            (
                SELECT COUNT(DISTINCT chj.handle_id)
                FROM chat_message_join AS cmj
                JOIN chat_handle_join AS chj ON chj.chat_id = cmj.chat_id
                WHERE cmj.message_id = m.ROWID
            ),
            1
        ) AS participant_count
    FROM message m
    LEFT JOIN handle h ON m.handle_id = h.ROWID
    WHERE m.ROWID > ?
    ORDER BY m.ROWID ASC
    """
    with sqlite3.connect(DB_PATH) as conn:
        return conn.execute(query, (after_rowid,)).fetchall()


def verify_messages_access():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("SELECT ROWID FROM message ORDER BY ROWID DESC LIMIT 1").fetchone()


def load_ai_environment():
    load_env_files(ENV_PATHS, override=False)


def conversation_context(sender, before_rowid, limit=CONTEXT_LIMIT):
    query = """
    SELECT
        m.ROWID,
        m.text,
        m.attributedBody,
        m.is_from_me
    FROM message m
    LEFT JOIN handle h ON m.handle_id = h.ROWID
    WHERE h.id = ? AND m.ROWID < ?
    ORDER BY m.ROWID DESC
    LIMIT ?
    """
    rows = []
    with sqlite3.connect(DB_PATH) as conn:
        rows = conn.execute(query, (sender, before_rowid, limit)).fetchall()

    context = []
    for _, row_text, attributed_body, is_from_me in reversed(rows):
        text = extract_text(row_text, attributed_body)
        if not is_meaningful_text(text):
            continue
        role = "Karol" if is_from_me else sender
        context.append(f"{role}: {' '.join(text.strip().split())}")
    return context


def should_skip_auto_reply(text):
    cleaned = clean_message_text(text)
    low = cleaned.lower()
    low_plain = re.sub(r"[^\wąćęłńóśźż]+", "", low, flags=re.IGNORECASE)
    reaction_prefixes = (
        "dodano „",
        "usunieto „",
        "usunięto „",
        "polubiono „",
        "nie polubiono „",
        "podkreslono „",
        "podkreślono „",
        "zakwestionowano „",
        "zasmiano sie z „",
        "zaśmiano się z „",
    )
    if low.startswith(reaction_prefixes):
        return "reakcja/tapback, nie normalna wiadomosc"
    low_content = {
        "xd",
        "xddd",
        "xdddd",
        "haha",
        "hehe",
        "hahaha",
        "ok",
        "oki",
        "okej",
        "dobra",
        "spoko",
        "aha",
        "mhm",
        "no",
        "ta",
    }
    if low_plain in low_content:
        return "krotka reakcja bez sprawy do zalatwienia"
    suspicion_markers = (
        "z kim pisz",
        "kto pisze",
        "czy to ty",
        "to ty",
        "dlaczego pis",
        "czemu pis",
        "co tak szybko",
        "kręcisz",
        "krecisz",
        "bot",
        "automat",
        "ai ",
        "sztuczna inteligencja",
    )
    if any(marker in low for marker in suspicion_markers) or low_plain in {"co", "coo", "cooo", "coooo"}:
        return "rozmowca kwestionuje tozsamosc albo styl, potrzebna osobista reakcja Karola"
    if re.search(r"\b\d{4,8}\b", low) and any(word in low for word in ["kod", "code", "otp", "weryfik", "logow", "haslo", "password"]):
        return "wyglada jak kod lub logowanie"
    if any(word in low for word in ["bank", "blik", "przelew", "haslo", "password", "2fa"]):
        return "wiadomosc dotyczy pieniedzy lub danych wrazliwych"
    return ""


def is_group_message(participant_count):
    try:
        return int(participant_count) > 1
    except (TypeError, ValueError):
        return False

def generate_reply_ollama(sender, incoming, system_prompt):
    payload = {
        "model": OLLAMA_MODEL,
        "stream": False,
        "messages": [
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"Nadawca: {sender}\nWiadomość: {incoming}\n\nOdpowiedz po polsku:",
            },
        ],
        "options": {
            "temperature": 0.15,
            "top_p": 0.85,
            "num_ctx": 4096,
            "num_predict": 256,
        },
    }
    request = urllib.request.Request(
        OLLAMA_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(request, timeout=120) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data["message"]["content"].strip()

def generate_reply(sender, incoming, context):
    skip_reason = should_skip_auto_reply(incoming)
    if skip_reason:
        log(f"Skipped auto reply for {sender}: {skip_reason}")
        return ""

    try:
        reply = generate_imessage_reply(sender, incoming, context)
        if reply.upper().startswith("NIE_ODPISUJ"):
            log(f"Model chose not to reply to {sender}: {reply}")
            return ""
        return reply
    except (AIUnavailable, AIError) as e:
        log(f"OpenAI reply failed: {e}")
        if not ALLOW_OLLAMA_FALLBACK:
            return ""
    except Exception as e:
        log(f"OpenAI unexpected error: {e}")
        if not ALLOW_OLLAMA_FALLBACK:
            return ""

    try:
        system = (
            "Odpisujesz na iMessage/SMS po polsku, jako Karol. "
            "Pisz krotko, naturalnie i nie wymyslaj faktow. "
            "Jesli temat wymaga osobistej decyzji albo danych wrazliwych, zwroc pusty tekst."
        )
        return generate_reply_ollama(sender, f"Kontekst:\n{chr(10).join(context)}\n\nWiadomosc:\n{incoming}", system)
    except Exception as e:
        log(f"Ollama fallback failed: {e}")
        return ""


def send_message(recipient, body, service_id=""):
    script = """
on run argv
    set targetRecipient to item 1 of argv
    set messageBody to item 2 of argv
    set preferredServiceId to item 3 of argv
    tell application "Messages"
        if preferredServiceId is not "" then
            set targetService to service id preferredServiceId
            set targetBuddy to buddy targetRecipient of targetService
            send messageBody to targetBuddy
            return "OK:iMessage:" & preferredServiceId
        end if
        try
            set targetService to 1st service whose service type = iMessage
            set targetBuddy to buddy targetRecipient of targetService
            send messageBody to targetBuddy
            return "OK:iMessage"
        on error
            set targetService to 1st service whose service type = SMS
            set targetBuddy to buddy targetRecipient of targetService
            send messageBody to targetBuddy
            return "OK:SMS"
        end try
    end tell
end run
"""
    result = subprocess.run(
        ["osascript", "-e", script, recipient, body, service_id or ""],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or result.stdout.strip())
    return result.stdout.strip()


recent_replies = deque(maxlen=100)

def main():
    signal.signal(signal.SIGTERM, request_shutdown)
    signal.signal(signal.SIGINT, request_shutdown)
    load_ai_environment()
    if not DB_PATH.exists():
        write_status("off")
        notify("AI iMessage wylaczony", "Nie znaleziono bazy Messages.")
        raise SystemExit(1)

    state = load_state()
    if "last_rowid" not in state:
        try:
            state["last_rowid"] = current_max_rowid()
        except sqlite3.DatabaseError as exc:
            write_status("off")
            log(f"PERMISSION_ERROR: {exc}")
            notify(
                "AI iMessage brak uprawnien",
                "Dodaj Python.app z CommandLineTools oraz AI iMessage Agent Bar.app do Full Disk Access.",
            )
            raise SystemExit(77)
        save_state(state)
        log(f"Initialized at ROWID {state['last_rowid']}")

    try:
        verify_messages_access()
    except sqlite3.DatabaseError as exc:
        write_status("off")
        log(f"PERMISSION_ERROR: {exc}")
        notify(
            "AI iMessage brak uprawnien",
            "macOS blokuje Messages. Dodaj Python.app z CommandLineTools do Full Disk Access.",
        )
        raise SystemExit(77)

    model = os.getenv("IMESSAGE_AI_MODEL") or os.getenv("OPENAI_MODEL") or "gpt-5.6"
    write_status("on")
    write_pid()
    atexit.register(cleanup_runtime)
    notify("AI iMessage wlaczony", f"Agent dziala w tle przez OpenAI ({model}).")
    log(
        f"Agent started with OpenAI model={model}, ollama_fallback={ALLOW_OLLAMA_FALLBACK}, "
        f"control_handles={CONTROL_HANDLES}, control_target={CONTROL_REPLY_TARGET}"
    )
    send_startup_notice(state)

    while not SHUTDOWN_REQUESTED:
        state = load_state()
        last_rowid = int(state.get("last_rowid", 0))
        allowlist = read_allowlist()
        max_seen = last_rowid

        for notice in poll_codex_tasks(state):
            try:
                service_id = preferred_control_service_id(CONTROL_REPLY_TARGET)
                send_result = send_message(CONTROL_REPLY_TARGET, notice, service_id=service_id)
                log(f"Control task notice sent via {send_result}: {notice}")
                recent_replies.append(notice)
            except Exception as exc:
                log(f"Control task notice failed: {exc}")

        try:
            rows = new_messages(last_rowid)
        except sqlite3.DatabaseError as exc:
            write_status("off")
            log(f"PERMISSION_ERROR: {exc}")
            notify(
                "AI iMessage brak uprawnien",
                "macOS blokuje Messages. Dodaj Python.app z CommandLineTools do Full Disk Access.",
            )
            raise SystemExit(77)

        row_text_cache = {}
        latest_auto_row_by_sender = {}
        for rowid, text, attributed_body, sender, service, is_from_me, participant_count in rows:
            if not sender:
                continue
            if is_group_message(participant_count):
                continue
            incoming = extract_text(text, attributed_body)
            row_text_cache[int(rowid)] = incoming
            if not is_meaningful_text(incoming):
                continue
            if is_from_me or is_control_message(sender, bool(is_from_me)):
                continue
            incoming_clean = clean_message_text(incoming)
            if should_skip_auto_reply(incoming_clean):
                continue
            latest_auto_row_by_sender[sender.lower()] = int(rowid)

        for rowid, text, attributed_body, sender, service, is_from_me, participant_count in rows:
            max_seen = max(max_seen, int(rowid))
            if not sender:
                continue
            
            normalized_sender = sender.lower()
            incoming = row_text_cache.get(int(rowid))
            
            if not is_meaningful_text(incoming):
                log(f"Skipped {rowid} from {sender}: empty text")
                continue

            incoming_clean = clean_message_text(incoming)

            if is_group_message(participant_count):
                log(f"Skipped {rowid} from {sender}: group chat with {participant_count} participants")
                continue

            if is_control_message(sender, bool(is_from_me)):
                if incoming_clean in recent_replies or looks_like_own_control_reply(incoming_clean):
                    log(f"Skipped {rowid} from {sender}: it is our own control reply")
                    continue
                try:
                    log(f"Control rowid={rowid} from {sender}, is_from_me={is_from_me}: {incoming_clean}")
                    reply = handle_control_command(incoming_clean, state)
                    if reply:
                        target = control_reply_target(sender, bool(is_from_me))
                        service_id = preferred_control_service_id(target)
                        send_result = send_message(target, reply, service_id=service_id)
                        log(f"Control replied to {target} rowid={rowid} via {send_result}: {reply}")
                        recent_replies.append(reply)
                except Exception as exc:
                    log(f"CONTROL ERROR rowid={rowid} sender={sender}: {exc}")
                if SHUTDOWN_REQUESTED:
                    break
                continue

            if is_from_me:
                continue

            if REQUIRE_ALLOWLIST and not allowlist:
                log(f"Skipped {rowid} from {sender}: allowlist is required but empty")
                continue

            if allowlist and not handle_matches(normalized_sender, allowlist):
                log(f"Skipped {rowid} from {sender}: not in allowlist")
                continue

            if latest_auto_row_by_sender.get(normalized_sender) != int(rowid):
                log(f"Skipped {rowid} from {sender}: newer actionable message in same batch or non-actionable reaction")
                continue

            if is_private_sender(sender) and not private_message_needs_reply(incoming_clean):
                log(f"Skipped {rowid} from {sender}: private safe mode, no direct question/request")
                continue

            try:
                log(f"Incoming rowid={rowid} from {sender}: {incoming_clean}")
                context = conversation_context(sender, int(rowid), CONTEXT_LIMIT)
                reply = generate_reply(sender, incoming_clean, context)
                if not reply:
                    log(f"Skipped {rowid} from {sender}: empty reply")
                    continue
                log(f"Generated rowid={rowid} to {sender}: {reply}")
                send_result = send_message(sender, reply)
                log(f"Replied to {sender} rowid={rowid} via {send_result}: {reply}")
                recent_replies.append(reply)
            except Exception as exc:
                log(f"ERROR rowid={rowid} sender={sender}: {exc}")

        if max_seen > last_rowid:
            state["last_rowid"] = max_seen
            save_state(state)

        if SHUTDOWN_REQUESTED:
            break

        time.sleep(POLL_SECONDS)

    cleanup_runtime()


if __name__ == "__main__":
    main()
