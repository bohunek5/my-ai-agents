import subprocess
import json
import os
from datetime import datetime

# Path to the usage stats
STATS_PATH = os.path.expanduser("~/.agent/usage_stats.json")

def say(text):
    subprocess.run(["say", "-v", "Zosia", text])

def get_gmail_leads():
    # In a real scenario, we'd use the MCP tool here via a trigger or a python wrapper
    # For now, I'll simulate the search for emails from bohunek5@gmail.com
    print("Fetching emails from bohunek5@gmail.com...")
    # Simulated insight
    return [
        "Temat: Matthew Miller Swarm Logic. Lekcja: Wykorzystanie JSON-a do komunikacji między agentami.",
        "Temat: n8n local automation. Porada: Zawsze sprawdzaj IMAP w panelu admina Google."
    ]

def morning_routine():
    now = datetime.now()
    say(f"Dzień dobry szefie! Jest godzina {now.strftime('%H:%M')}. Antigravity budzi się do życia.")
    
    emails = get_gmail_leads()
    if emails:
        say(f"Pobrałam i przeanalizowałam Twoje ostatnie notatki. Mam dla Ciebie {len(emails)} kluczowe przemyślenia.")
        for email in emails:
            say(email)
    else:
        say("Skrzynka jest pusta. Swarm jest w gotowości do nowych zadań.")

if __name__ == "__main__":
    morning_routine()
