#!/usr/bin/env python3
"""
Small campaign-state CLI for AI-assisted ad production.

It keeps decisions out of chat history and in a repeatable JSON file:
brief -> canon -> angles -> copy gate -> templates -> render approval -> upload approval.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


STAGES = {
    1: "design_canon",
    2: "creative_angles",
    3: "copy_and_visual_concepts",
    4: "rendered_creatives",
    5: "meta_upload_paused",
}

REQUIRED_BY_STAGE = {
    1: ["campaign", "offer_name", "brand_canon", "design_source"],
    2: ["approved_angles"],
    3: ["copy_gate.status", "copy_file", "visual_concepts_file"],
    4: ["creative_engine", "templates", "rendered_files", "render_approval"],
    5: ["meta_structure", "upload_status", "publish_approval"],
}

BANNED_COPY_PATTERNS = {
    "em_dash": "—",
    "en_dash": "–",
}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise SystemExit(f"State file does not exist: {path}")
    return json.loads(path.read_text(encoding="utf-8"))


def save_state(path: Path, state: dict[str, Any]) -> None:
    state["updated_at"] = now_iso()
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def dotted_get(data: dict[str, Any], key: str) -> Any:
    current: Any = data
    for part in key.split("."):
        if not isinstance(current, dict) or part not in current:
            return None
        current = current[part]
    return current


def dotted_set(data: dict[str, Any], key: str, value: Any) -> None:
    current = data
    parts = key.split(".")
    for part in parts[:-1]:
        current = current.setdefault(part, {})
    current[parts[-1]] = value


def parse_value(value: str) -> Any:
    text = value.strip()
    if text.lower() in {"true", "false"}:
        return text.lower() == "true"
    if text.lower() in {"null", "none"}:
        return None
    if text.startswith("[") or text.startswith("{"):
        return json.loads(text)
    if "," in text:
        return [item.strip() for item in text.split(",") if item.strip()]
    return text


def missing_for_stage(state: dict[str, Any], stage: int) -> list[str]:
    missing: list[str] = []
    for required_stage in range(1, stage + 1):
        for key in REQUIRED_BY_STAGE[required_stage]:
            value = dotted_get(state, key)
            if value in (None, "", [], {}):
                missing.append(key)
    return missing


def check_copy_text(text: str) -> tuple[bool, list[str]]:
    issues: list[str] = []
    for name, char in BANNED_COPY_PATTERNS.items():
        if char in text:
            issues.append(f"{name}: found `{char}`")

    markdown_heading_dash = re.findall(r"^=+\s+.+?\s+-\s+.*?=+$", text, flags=re.MULTILINE)
    if markdown_heading_dash:
        issues.append("section_header_dash: replace dash separators in generated headers")

    if re.search(r"\bto nie\b.+\bto\b", text, flags=re.IGNORECASE):
        issues.append("antithesis: found likely `To nie X. To Y` construction")

    return not issues, issues


def command_init(args: argparse.Namespace) -> None:
    path = Path(args.state)
    if path.exists() and not args.force:
        raise SystemExit(f"State already exists: {path}. Use --force to overwrite.")

    state = {
        "campaign": args.campaign,
        "offer_name": args.offer_name,
        "stage": 1,
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "brand_canon": None,
        "design_source": None,
        "approved_angles": [],
        "copy_gate": {"status": None, "issues": []},
        "copy_file": None,
        "visual_concepts_file": None,
        "creative_engine": None,
        "templates": {},
        "rendered_files": [],
        "render_approval": None,
        "meta_structure": None,
        "upload_status": None,
        "publish_approval": None,
        "notes": [],
    }
    save_state(path, state)
    print(f"Created {path}")


def command_set(args: argparse.Namespace) -> None:
    path = Path(args.state)
    state = load_state(path)
    dotted_set(state, args.key, parse_value(args.value))
    save_state(path, state)
    print(f"Set {args.key}")


def command_note(args: argparse.Namespace) -> None:
    path = Path(args.state)
    state = load_state(path)
    state.setdefault("notes", []).append({"at": now_iso(), "text": args.text})
    save_state(path, state)
    print("Added note")


def command_check_copy(args: argparse.Namespace) -> None:
    path = Path(args.state)
    state = load_state(path)
    copy_path = Path(args.copy_file)
    text = copy_path.read_text(encoding="utf-8")
    passed, issues = check_copy_text(text)

    state["copy_file"] = str(copy_path)
    state["copy_gate"] = {
        "status": "PASS" if passed else "FAIL",
        "checked_at": now_iso(),
        "issues": issues,
    }
    save_state(path, state)

    print(f"copy_gate: {'PASS' if passed else 'FAIL'}")
    for issue in issues:
        print(f"- {issue}")
    if not passed:
        raise SystemExit(1)


def command_status(args: argparse.Namespace) -> None:
    state = load_state(Path(args.state))
    stage = int(state.get("stage", 1))
    missing = missing_for_stage(state, stage)

    print(f"campaign: {state.get('campaign')}")
    print(f"stage: {stage} ({STAGES.get(stage, 'unknown')})")
    print(f"offer: {state.get('offer_name')}")
    print(f"canon: {state.get('brand_canon')}")
    print(f"angles: {state.get('approved_angles')}")
    print(f"copy_gate: {dotted_get(state, 'copy_gate.status')}")
    print(f"render_approval: {state.get('render_approval')}")
    print(f"publish_approval: {state.get('publish_approval')}")
    if missing:
        print("missing:")
        for key in missing:
            print(f"- {key}")
    else:
        print("missing: none")


def command_advance(args: argparse.Namespace) -> None:
    path = Path(args.state)
    state = load_state(path)
    target_stage = args.to_stage

    if target_stage not in STAGES:
        raise SystemExit(f"Unknown stage: {target_stage}")

    missing = missing_for_stage(state, target_stage)
    if missing:
        print(f"Cannot advance to stage {target_stage}. Missing:")
        for key in missing:
            print(f"- {key}")
        raise SystemExit(1)

    state["stage"] = target_stage
    save_state(path, state)
    print(f"Advanced to stage {target_stage} ({STAGES[target_stage]})")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="AI ad campaign pipeline state and gates")
    parser.add_argument("--state", default="campaign-state.json", help="Path to campaign state JSON")

    subparsers = parser.add_subparsers(dest="command", required=True)

    init_parser = subparsers.add_parser("init", help="Create campaign state")
    init_parser.add_argument("campaign")
    init_parser.add_argument("--offer-name", required=True)
    init_parser.add_argument("--force", action="store_true")
    init_parser.set_defaults(func=command_init)

    set_parser = subparsers.add_parser("set", help="Set a state field")
    set_parser.add_argument("key", help="Dotted key, e.g. brand_canon or templates.R1")
    set_parser.add_argument("value", help="Value, JSON, comma-list, true/false, null")
    set_parser.set_defaults(func=command_set)

    note_parser = subparsers.add_parser("note", help="Append a decision note")
    note_parser.add_argument("text")
    note_parser.set_defaults(func=command_note)

    copy_parser = subparsers.add_parser("check-copy", help="Run deterministic copy gate")
    copy_parser.add_argument("copy_file")
    copy_parser.set_defaults(func=command_check_copy)

    status_parser = subparsers.add_parser("status", help="Show campaign status")
    status_parser.set_defaults(func=command_status)

    advance_parser = subparsers.add_parser("advance", help="Advance after required gates pass")
    advance_parser.add_argument("to_stage", type=int, choices=sorted(STAGES))
    advance_parser.set_defaults(func=command_advance)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
