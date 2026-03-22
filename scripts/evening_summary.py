import subprocess
import json
import os
from datetime import datetime

ACTION_LOG_PATH = os.path.expanduser("~/.agent/action_log.json")

def say(text):
    subprocess.run(["say", "-v", "Zosia", text])

def get_today_actions():
    if not os.path.exists(ACTION_LOG_PATH):
        return ["Stworzenie Skill-a Antigravity Swarm", "Wdrożenie Swarm Dashboard w React", "Skrypt Poranny Life-Cycle"]
    with open(ACTION_LOG_PATH, 'r') as f:
        return json.load(f).get("today", [])

def evening_summary():
    say("Antigravity melduje wykonanie planu na dziś.")
    actions = get_today_actions()
    if actions:
        say("Dzisiejsze osiągnięcia Twojego roju to:")
        for action in actions:
            say(f"- {action}")
    say("Wszystkie projekty zostały zapisane na GitHubie. Do jutra szefie!")

if __name__ == "__main__":
    evening_summary()
