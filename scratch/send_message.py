#!/usr/bin/env python3
import sys
import subprocess
import os

SENT_LOG = os.path.expanduser('~/my-ai-agents/scratch/sent_messages.txt')

def send_imessage(recipient, message):
    script = f'''
tell application "Messages"
    set targetService to 1st service whose service type = iMessage
    set targetBuddy to buddy "{recipient}" of targetService
    send "{message}" to targetBuddy
end tell
'''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    if result.returncode == 0:
        # Log the sent message
        with open(SENT_LOG, 'a') as f:
            f.write(f"{recipient}:{message[:50]}\n")
        print("SUCCESS")
    else:
        # Fallback: try SMS via phone number
        script2 = f'''
tell application "Messages"
    set targetService to 1st service whose service type = SMS
    set targetBuddy to buddy "{recipient}" of targetService
    send "{message}" to targetBuddy
end tell
'''
        result2 = subprocess.run(['osascript', '-e', script2], capture_output=True, text=True)
        if result2.returncode == 0:
            with open(SENT_LOG, 'a') as f:
                f.write(f"{recipient}:{message[:50]}\n")
            print("SUCCESS")
        else:
            print(f"ERROR: {result.stderr.strip()} / {result2.stderr.strip()}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: send_message.py <recipient> <message>")
        sys.exit(1)
    recipient = sys.argv[1]
    message = sys.argv[2]
    send_imessage(recipient, message)
