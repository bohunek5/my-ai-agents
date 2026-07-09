import sqlite3
import os

db_path = os.path.expanduser('~/Library/Messages/chat.db')
print(f"Checking if {db_path} exists...")
if os.path.exists(db_path):
    print("File exists!")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        # Let's try to query the schema or message count
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print("Tables in chat.db:")
        for t in tables:
            print(f" - {t[0]}")
        
        # Let's count messages
        cursor.execute("SELECT count(*) FROM message;")
        count = cursor.fetchone()[0]
        print(f"Total messages: {count}")
    except Exception as e:
        print(f"Error opening chat.db: {e}")
else:
    print("File does NOT exist!")
