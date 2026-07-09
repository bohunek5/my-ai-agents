import subprocess
import sys

def send_imessage(target, message_text):
    # AppleScript to send iMessage
    applescript = f'''
    tell application "Messages"
        set targetService to 1st service whose service type is iMessage
        set targetBuddy to buddy "{target}" of targetService
        send "{message_text}" to targetBuddy
    end tell
    '''
    
    try:
        res = subprocess.run(['osascript', '-e', applescript], capture_output=True, text=True)
        if res.returncode == 0:
            print("Successfully sent iMessage!")
            print(res.stdout)
        else:
            print("Error sending iMessage:")
            print(res.stderr)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    target_number = "+48726400332"  # User's own number to test
    if len(sys.argv) > 1:
        target_number = sys.argv[1]
    
    send_imessage(target_number, "Test message from Antigravity agent at 10:35")
