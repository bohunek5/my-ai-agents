#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import tempfile
from pathlib import Path
from typing import Any


DEFAULT_MODEL = "gpt-5.6"
DEFAULT_REASONING_EFFORT = "medium"
ROOT = Path(__file__).resolve().parents[1]


class AIError(RuntimeError):
    pass


class AIUnavailable(AIError):
    pass


def env_bool(name: str, default: bool = False) -> bool:
    value = os.getenv(name)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "y", "on"}


def load_env_file(path: Path, override: bool = False) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if override or key not in os.environ:
            os.environ[key] = value


def load_env_files(paths: list[Path], override: bool = False) -> None:
    for path in paths:
        load_env_file(path, override=override)


def configured() -> bool:
    return bool(os.getenv("OPENAI_API_KEY"))


def _openai_client():
    if not configured():
        raise AIUnavailable("Brak OPENAI_API_KEY.")
    try:
        from openai import OpenAI
    except Exception as exc:  # pragma: no cover - depends on local env
        raise AIUnavailable(f"Brak pakietu openai: {exc}") from exc
    return OpenAI(api_key=os.environ["OPENAI_API_KEY"])


def _find_codex_cli() -> str:
    configured_path = os.getenv("CODEX_CLI_BIN", "").strip()
    if configured_path and Path(configured_path).exists():
        return configured_path
    found = shutil.which("codex")
    if found:
        return found
    candidates = [
        *Path.home().glob(".antigravity-ide/extensions/openai.chatgpt-*/bin/macos-aarch64/codex"),
        Path("/opt/homebrew/bin/codex"),
        Path("/usr/local/bin/codex"),
    ]
    for path in sorted(candidates, reverse=True):
        if path.exists() and os.access(path, os.X_OK):
            return str(path)
    return ""


def codex_cli_available() -> bool:
    return bool(_find_codex_cli())


def _generate_text_codex(
    *,
    instructions: str,
    input_text: str,
    max_output_tokens: int | None = None,
    env_prefix: str = "OPENAI",
) -> str:
    codex_bin = _find_codex_cli()
    if not codex_bin:
        raise AIUnavailable("Brak OPENAI_API_KEY i brak komendy codex w PATH.")

    timeout = float(os.getenv(f"{env_prefix}_CODEX_TIMEOUT", os.getenv("AI_CODEX_TIMEOUT", "120")))
    workdir = Path(os.getenv(f"{env_prefix}_CODEX_WORKDIR", os.getenv("AI_CODEX_WORKDIR", str(ROOT))))
    model = os.getenv(f"{env_prefix}_CODEX_MODEL", os.getenv("AI_CODEX_MODEL", "")).strip()
    prompt = (
        "Jestes lokalnym backendem tekstowym dla prywatnego agenta Karola. "
        "Nie wykonuj zmian w plikach, nie uruchamiaj narzedzi i nie komentuj technicznie. "
        "Zastosuj sie do instrukcji i zwroc wylacznie finalna tresc odpowiedzi.\n\n"
        f"INSTRUKCJE:\n{instructions}\n\n"
        f"DANE:\n{input_text}\n"
    )

    with tempfile.NamedTemporaryFile("w+", encoding="utf-8", delete=False) as handle:
        output_path = Path(handle.name)
    cmd = [
        codex_bin,
        "exec",
        "--cd",
        str(workdir),
        "--sandbox",
        "read-only",
        "--ephemeral",
        "--ignore-rules",
        "--output-last-message",
        str(output_path),
    ]
    if model:
        cmd.extend(["--model", model])
    cmd.append("-")

    try:
        result = subprocess.run(
            cmd,
            input=prompt,
            cwd=workdir,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        text = output_path.read_text(encoding="utf-8", errors="replace").strip()
    except subprocess.TimeoutExpired as exc:
        raise AIError(f"Codex CLI przekroczyl limit {int(timeout)}s.") from exc
    finally:
        try:
            output_path.unlink()
        except OSError:
            pass

    if result.returncode != 0:
        error = (result.stderr or result.stdout or "").strip()
        raise AIError(f"Codex CLI failed: {error[:500]}")
    if not text:
        raise AIError("Codex CLI zwrocil pusta odpowiedz.")
    return text


def _text_from_response(response: Any) -> str:
    text = getattr(response, "output_text", None)
    if text:
        return str(text).strip()

    chunks: list[str] = []
    for item in getattr(response, "output", []) or []:
        for content in getattr(item, "content", []) or []:
            value = getattr(content, "text", None)
            if value:
                chunks.append(str(value))
    return "\n".join(chunks).strip()


def generate_text(
    *,
    instructions: str,
    input_text: str,
    model: str | None = None,
    reasoning_effort: str | None = None,
    max_output_tokens: int | None = None,
    env_prefix: str = "OPENAI",
) -> str:
    if not configured():
        allow_codex = env_bool(
            f"{env_prefix}_CODEX_FALLBACK",
            env_bool("AI_CODEX_FALLBACK", True),
        )
        if allow_codex:
            return _generate_text_codex(
                instructions=instructions,
                input_text=input_text,
                max_output_tokens=max_output_tokens,
                env_prefix=env_prefix,
            )
    client = _openai_client()
    selected_model = (
        model
        or os.getenv(f"{env_prefix}_MODEL")
        or os.getenv("OPENAI_MODEL")
        or DEFAULT_MODEL
    )
    effort = (
        reasoning_effort
        or os.getenv(f"{env_prefix}_REASONING_EFFORT")
        or os.getenv("OPENAI_REASONING_EFFORT")
        or DEFAULT_REASONING_EFFORT
    )
    timeout = float(os.getenv(f"{env_prefix}_REQUEST_TIMEOUT", os.getenv("OPENAI_REQUEST_TIMEOUT", "120")))
    store = env_bool(f"{env_prefix}_STORE", env_bool("OPENAI_STORE", False))
    max_tokens = max_output_tokens or int(os.getenv(f"{env_prefix}_MAX_OUTPUT_TOKENS", "900"))

    kwargs: dict[str, Any] = {
        "model": selected_model,
        "instructions": instructions,
        "input": input_text,
        "store": store,
        "timeout": timeout,
        "max_output_tokens": max_tokens,
    }
    if effort and effort.lower() != "none":
        kwargs["reasoning"] = {"effort": effort}

    local_fallbacks = [
        (),
        ("timeout",),
        ("reasoning",),
        ("timeout", "reasoning"),
        ("store",),
        ("timeout", "reasoning", "store"),
    ]
    response = None
    last_type_error: TypeError | None = None
    for drop_keys in local_fallbacks:
        attempt = dict(kwargs)
        for key in drop_keys:
            attempt.pop(key, None)
        try:
            response = client.responses.create(**attempt)
            break
        except TypeError as exc:
            last_type_error = exc
            continue
        except Exception as exc:
            if "reasoning" in attempt:
                attempt.pop("reasoning", None)
                try:
                    response = client.responses.create(**attempt)
                    break
                except Exception as retry_exc:
                    raise AIError(str(retry_exc)) from retry_exc
            raise AIError(str(exc)) from exc

    if response is None:
        raise AIError(str(last_type_error) if last_type_error else "Nie udalo sie wywolac Responses API.")

    text = _text_from_response(response)
    if not text:
        raise AIError("Model zwrocil pusta odpowiedz.")
    return text


def _strip_json_fence(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def parse_json_object(text: str) -> dict[str, Any]:
    cleaned = _strip_json_fence(text)
    try:
        value = json.loads(cleaned)
    except json.JSONDecodeError:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise
        value = json.loads(cleaned[start : end + 1])
    if not isinstance(value, dict):
        raise ValueError("Model nie zwrocil obiektu JSON.")
    return value


def generate_json(
    *,
    instructions: str,
    input_data: dict[str, Any],
    model: str | None = None,
    reasoning_effort: str | None = None,
    max_output_tokens: int | None = None,
    env_prefix: str = "OPENAI",
) -> dict[str, Any]:
    payload = json.dumps(input_data, ensure_ascii=False, indent=2)
    text = generate_text(
        instructions=instructions,
        input_text=payload,
        model=model,
        reasoning_effort=reasoning_effort,
        max_output_tokens=max_output_tokens,
        env_prefix=env_prefix,
    )
    return parse_json_object(text)


def clean_sms_reply(text: str, max_chars: int = 520) -> str:
    cleaned = " ".join((text or "").strip().split())
    cleaned = re.sub(r"^(odpowied[zź]|sms|wiadomo[sś][cć])\s*:\s*", "", cleaned, flags=re.IGNORECASE)
    cleaned = cleaned.strip().strip('"').strip("'").strip()
    if len(cleaned) <= max_chars:
        return cleaned
    clipped = cleaned[: max_chars - 1].rstrip()
    for sep in [". ", "! ", "? "]:
        idx = clipped.rfind(sep)
        if idx > max_chars * 0.55:
            return clipped[: idx + 1].strip()
    return clipped + "…"


def generate_imessage_reply(sender: str, incoming: str, conversation_context: list[str]) -> str:
    instructions = (
        "Jestes prywatnym asystentem Karola do iMessage/SMS. Odpowiadasz jako Karol, po polsku, naturalnie, krotko i ostroznie. "
        "Najpierw przeczytaj caly kontekst rozmowy, ustal do czego odnosi sie ostatnia wiadomosc i dopiero wtedy napisz jedna gotowa odpowiedz. "
        "Nie odpowiadaj automatycznie na samo 'xd', reakcje, tapbacki, pojedyncze potwierdzenia ani wiadomosci bez sprawy do zalatwienia; wtedy zwroc NIE_ODPISUJ. "
        "Nie probuj byc zabawny na sile. Nie dopisuj romantycznych, czulych, flirtujacych ani emocjonalnych tekstow, jesli nie wynikaja jednoznacznie z kilku ostatnich wiadomosci. "
        "Nie dodawaj buziakow, serduszek ani emoji, chyba ze Karol regularnie uzywa ich w tej samej rozmowie i pasuja do ostatniej wiadomosci. "
        "Jesli nie rozumiesz aluzji albo kontekstu, nie rzucaj zartem; zadaj jedno konkretne pytanie albo zwroc NIE_ODPISUJ. "
        "Nie pisz ogolnikow typu: dam znac, odezwe sie, sprawdze, wroce do tematu, jesli nie dodajesz konkretu. "
        "Jesli da sie rozwiazac temat od razu, odpowiedz decyzja lub propozycja. Jesli brakuje danych, zadaj konkretne pytanie blokujace zamiast mglistej odpowiedzi. "
        "Nie pokazuj rozumowania, nie pisz naglowkow, nie dodawaj komentarzy technicznych. "
        "Nie wymyslaj cen, terminow, obietnic, faktow ani tego, ze cos sprawdziles. "
        "Jesli odpowiedz wymaga osobistej decyzji Karola, pieniędzy, kodu, danych wrazliwych, ryzykownej deklaracji, konfliktu, zdrowia/prawa albo nie da sie sensownie odpowiedziec z kontekstu, zwroc dokladnie: NIE_ODPISUJ: powod. "
        "Jesli rozmowa jest luzna, odpisz luzno, ale bez eskalowania tonu. Jesli ktos tylko potwierdza, zwykle nie odpisuj. "
        "Zwracaj tylko tresc SMS albo NIE_ODPISUJ."
    )
    context_messages = int(os.getenv("IMESSAGE_AI_PROMPT_CONTEXT_MESSAGES", "30"))
    payload = {
        "nadawca": sender,
        "ostatnia_wiadomosc": incoming,
        "ostatni_kontekst_rozmowy": conversation_context[-context_messages:],
        "styl": "zwiezly, naturalny, konkretny, powściągliwy, bez sztucznego tonu i bez żartów na siłę",
    }
    text = generate_text(
        instructions=instructions,
        input_text=json.dumps(payload, ensure_ascii=False, indent=2),
        env_prefix="IMESSAGE_AI",
        max_output_tokens=int(os.getenv("IMESSAGE_AI_MAX_OUTPUT_TOKENS", "350")),
    )
    return clean_sms_reply(text, int(os.getenv("IMESSAGE_AI_MAX_REPLY_CHARS", "280")))
