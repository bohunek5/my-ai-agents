import json
import os
import datetime

LOG_FILE = "/Users/karolbohdanowicz/my-ai-agents/token_telemetry.log"

def log_usage(gemini_tokens=0, ollama_tokens=0):
    timestamp = datetime.datetime.now().isoformat()
    log_entry = {
        "timestamp": timestamp,
        "gemini_2_0": gemini_tokens,
        "ollama_local": ollama_tokens,
        "ratio": f"{gemini_tokens}:{ollama_tokens}"
    }
    
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(log_entry) + "\n")
    
    print(f"TELEMETRY LOGGED: Gemini={gemini_tokens} | Ollama={ollama_tokens} | Ratio={log_entry['ratio']}")

if __name__ == "__main__":
    # Test entry
    log_usage(gemini_tokens=1500, ollama_tokens=0)
