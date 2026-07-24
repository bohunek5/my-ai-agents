---
name: ollama-protocol
description: Strict rules for handling Ollama instances, limiting CPU/RAM usage (30%), and preventing output repetition via advanced scripting and parameters.
---

# Ollama Protocol (OLLAMA_PROTOCOL)

You MUST follow these strict rules whenever you interact with, script for, or launch Ollama. The goal is to prevent Ollama from overloading the host machine (MacBook Pro) and to prevent it from repeating itself.

## 1. Resource Limits (30% CPU & RAM)

Ollama must never use 100% of the system resources. Always apply strict limits to keep usage around 30%.

### Scripting API Requests
When making API calls to Ollama (e.g., via Python `requests`), ALWAYS inject the `options` object with strict resource constraints:
```json
{
  "model": "your-model",
  "prompt": "your-prompt",
  "options": {
    "num_thread": 4,       // Limit CPU threads (approx 30% on modern MacBooks)
    "num_ctx": 4096,       // Restrict Context Window to save RAM
    "num_gpu": 1,          // Ensure minimal overhead
    "repeat_penalty": 1.15 // Prevent repetitive text generation
  }
}
```

### Docker/System Execution
If launching Ollama via Docker, ALWAYS enforce resource limits explicitly:
`docker run --cpus="3.0" --memory="8g" ...` (Adjust appropriately for 30% of system specs).

## 2. Advanced Scripting & Anti-Repetition

Ollama tends to get stuck in loops or repeat itself if the prompt or script is too simplistic. 

- **Complex Prompts:** Never use basic, one-line prompts. Use structured, complex prompt engineering with clear `<system>`, `<instructions>`, and `<output_format>` blocks.
- **Repeat Penalty:** As shown above, always set `"repeat_penalty"` to `1.15` - `1.2` to discourage looping.
- **Temperature:** Use a reasonable temperature (e.g., `0.7` to `0.8`) to keep responses varied but focused.
- **Chunking:** Do not send massive amounts of text in a single request. If processing many lessons or large data, script it so that it processes small chunks asynchronously with a delay (`time.sleep()`) between requests to let the CPU cool down.
- **Error Handling & Circuit Breaker:** Any script talking to Ollama MUST have try/except blocks and a timeout. If Ollama hangs or takes too long, the script must abort or retry gracefully, not freeze the system.

## 3. Script Structure Example (Python)

```python
import requests
import time
import json

def call_ollama(prompt):
    payload = {
        "model": "llama3",
        "prompt": f"<system>Act as a precise assistant.</system>\n\n<task>{prompt}</task>",
        "stream": False,
        "options": {
            "num_thread": 4,        # 30% CPU (assuming 12 core)
            "num_ctx": 4096,        # Limited RAM
            "temperature": 0.7,
            "repeat_penalty": 1.2   # Anti-repetition
        }
    }
    
    try:
        # Timeout prevents infinite hangs
        response = requests.post("http://localhost:11434/api/generate", json=payload, timeout=60)
        response.raise_for_status()
        return response.json().get("response", "")
    except Exception as e:
        print(f"Ollama Error: {e}")
        return None
        
# Always include a delay in loops to prevent 100% sustained CPU usage
for task in tasks:
    result = call_ollama(task)
    time.sleep(2) # Cool down CPU
```

By following this protocol, you guarantee that Ollama serves as a helpful local tool without crashing the user's MacBook Pro.
