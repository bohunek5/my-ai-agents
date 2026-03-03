
import subprocess

def test_email():
    subject = "TEST HTML"
    recipient = "karol.bohdanowicz@prescot.pl"
    html = "<html><body><h1>TEST</h1><p>To jest testowa treść HTML.</p></body></html>"
    
    temp_path = "/tmp/test.html"
    with open(temp_path, "w") as f:
        f.write(html)
        
    script = f'''
    set theContent to read POSIX file "{temp_path}" as «class utf8»
    tell application "Mail"
        set msg to make new outgoing message with properties {{subject:"{subject}", visible:false}}
        tell msg
            make new to recipient with properties {{address:"{recipient}"}}
        end tell
        set html content of msg to theContent
        send msg
    end tell
    '''
    subprocess.run(['osascript', '-e', script])

if __name__ == "__main__":
    test_email()
