import sqlite3
import os

db_path = os.path.expanduser('~/Library/Messages/chat.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("SELECT ROWID, chat_identifier, guid FROM chat LIMIT 15;")
for r in cursor.fetchall():
    print(f"RowID: {r[0]} | Chat Identifier: {r[1]} | GUID: {r[2]}")
