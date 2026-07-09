import sqlite3
import os
import datetime

db_path = os.path.expanduser('~/Library/Messages/chat.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Query incoming messages
query = """
SELECT 
    m.ROWID,
    m.text,
    m.date,
    h.id as sender_id,
    c.chat_identifier,
    c.guid as chat_guid,
    c.display_name
FROM 
    message m
JOIN 
    chat_message_join cmj ON m.ROWID = cmj.message_id
JOIN 
    chat c ON cmj.chat_id = c.ROWID
LEFT JOIN 
    handle h ON m.handle_id = h.ROWID
WHERE 
    m.is_from_me = 0
ORDER BY 
    m.date DESC 
LIMIT 20;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("Last 20 INCOMING messages:")
for r in rows:
    ts = r[2]
    dt = datetime.datetime(2001, 1, 1) + datetime.timedelta(seconds=ts / 1e9)
    print(f"RowID: {r[0]} | Date: {dt} | Sender: {r[3]}")
    print(f"  Chat Identifier: {r[4]} (GUID: {r[5]}) Display Name: {r[6]}")
    print(f"  Text: {r[1]}")
    print("-" * 50)
