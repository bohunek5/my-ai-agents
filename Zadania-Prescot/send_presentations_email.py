import subprocess
import os

files = [
    "/Users/karolbohdanowicz/Downloads/prezentacja_v1_biznesowa.md",
    "/Users/karolbohdanowicz/Downloads/prezentacja_v2_techniczna.md",
    "/Users/karolbohdanowicz/Downloads/prezentacja_v3_operacyjna.md",
    "/Users/karolbohdanowicz/Downloads/prezentacja_v4_zbalansowana.md"
]

body = ""
for i, f in enumerate(files, 1):
    try:
        with open(f, 'r', encoding='utf-8') as file:
            body += f"--- WARIANT V{i} ---\n\n"
            body += file.read()
            body += "\n\n" + "="*50 + "\n\n"
    except Exception as e:
        body += f"Nie udało się odczytać {f}: {e}\n\n"

# Escapowanie cudzysłowów dla AppleScript
escaped_body = body.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

script = f'''
tell application "Mail"
    set msg to make new outgoing message with properties {{subject:"Prezentacje Onboardingowe Prescot LED (V1-V4)", content:"{escaped_body}", visible:true}}
    tell msg
        make new to recipient at end of to recipients with properties {{address:"karol.bohdanowicz@prescot.pl"}}
    end tell
    send msg
end tell
'''

temp_script = "/tmp/send_prescot_mail.scpt"
with open(temp_script, "w", encoding='utf-8') as f:
    f.write(script)

subprocess.run(["osascript", temp_script])
