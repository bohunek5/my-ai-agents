import re

path = "/Users/karolbohdanowicz/my-ai-agents/tools/imessage_ai_agent.py"
content = open(path).read()

# Add collections.deque
if "from collections import deque" not in content:
    content = content.replace("import time", "import time\nfrom collections import deque")

if "recent_replies = deque(maxlen=100)" not in content:
    content = content.replace("def main():", "recent_replies = deque(maxlen=100)\n\ndef main():")

# Replace the is_from_me check
old_check = """
            if is_from_me or not sender:
                continue
"""
new_check = """
            if not sender:
                continue
            
            normalized_sender = sender.lower()
            incoming = extract_text(text, attributed_body)
            
            if is_from_me:
                if normalized_sender != "prezes@zeglarstwomazury.pl":
                    continue
                if incoming in recent_replies:
                    log(f"Skipped {rowid} from {sender}: it is our own AI reply")
                    continue

"""
if old_check in content:
    content = content.replace(old_check, new_check)
    
    # We need to make sure we don't call extract_text twice.
    # We can remove the old extract_text call.
    old_extract = "incoming = extract_text(text, attributed_body)\n            if not is_meaningful_text(incoming):"
    new_extract = "if not is_meaningful_text(incoming):"
    content = content.replace(old_extract, new_extract)
    
    # We also need to add the reply to recent_replies
    old_log_replied = "log(f\"Replied to {sender} rowid={rowid} via {send_result}: {reply}\")"
    new_log_replied = "log(f\"Replied to {sender} rowid={rowid} via {send_result}: {reply}\")\n                recent_replies.append(reply)"
    content = content.replace(old_log_replied, new_log_replied)
    
    # Also remove the first normalized_sender assignment later in the code
    old_norm = "normalized_sender = sender.lower()\n            if allowlist and normalized_sender not in allowlist:"
    new_norm = "if allowlist and normalized_sender not in allowlist:"
    content = content.replace(old_norm, new_norm)

    open(path, "w").write(content)
    print("Updated successfully")
else:
    print("Could not find the check block")

