import subprocess

applescript = '''
tell application "Messages"
    set chatList to chats
    set resultList to {}
    repeat with c in chatList
        try
            set chatID to id of c
            set chatName to name of c
            set chatService to name of service of c
            set end of resultList to chatID & " | Name: " & chatName & " | Service: " & chatService
        end try
    end repeat
    return resultList
end tell
'''

try:
    res = subprocess.run(['osascript', '-e', applescript], capture_output=True, text=True)
    if res.returncode == 0:
        print("Chats list from Messages application:")
        # AppleScript lists are comma-separated strings
        lines = res.stdout.strip().split(", ")
        for line in lines[:20]:
            print(line)
    else:
        print("Error getting chats list:")
        print(res.stderr)
except Exception as e:
    print(f"Exception: {e}")
