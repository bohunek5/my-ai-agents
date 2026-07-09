import sqlite3
import os
import datetime

db_path = os.path.expanduser('~/Library/Messages/chat.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

query = """
SELECT 
    m.ROWID,
    m.text,
    m.date,
    m.is_from_me,
    h.id as sender_id,
    m.is_emote,
    m.associated_message_guid
FROM 
    message m
LEFT JOIN 
    handle h ON m.handle_id = h.ROWID
WHERE 
    m.text IS NOT NULL
ORDER BY 
    m.date DESC 
LIMIT 20;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("Last 20 messages with non-null text:")
for r in rows:
    ts = r[2]
    dt = datetime.datetime(2001, 1, 1) + datetime.timedelta(seconds=ts / 1e9)
    print(f"RowID: {r[0]} | Date: {dt} | IsFromMe: {r[3]} | Sender: {r[4]} | IsEmote: {r[5]} | Assoc: {r[6]}")
    print(f"  Text: {r[1]}")
    print("-" * 50)
