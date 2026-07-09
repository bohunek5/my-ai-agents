import subprocess

def send_by_chat_id(chat_id, message_text):
    applescript = f'''
    tell application "Messages"
        set targetChat to chat id "{chat_id}"
        send "{message_text}" to targetChat
    end tell
    '''
    try:
        res = subprocess.run(['osascript', '-e', applescript], capture_output=True, text=True)
        if res.returncode == 0:
            print("Successfully sent message by Chat ID!")
            print(res.stdout)
        else:
            print("Error sending message by Chat ID:")
            print(res.stderr)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    send_by_chat_id("any;-;+48726400332", "Test message by chat id from Antigravity")
