import sqlite3
import os

db_path = os.path.expanduser('~/Library/Messages/chat.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

query = """
SELECT 
    c.ROWID,
    c.chat_identifier,
    c.display_name,
    c.service_name,
    COUNT(m.ROWID) as msg_count
FROM 
    chat c
JOIN 
    chat_message_join cmj ON c.ROWID = cmj.chat_id
JOIN 
    message m ON cmj.message_id = m.ROWID
GROUP BY 
    c.ROWID
ORDER BY 
    msg_count DESC
LIMIT 10;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("Top 10 chats by message count:")
for r in rows:
    print(f"Chat ID: {r[0]} | Identifier: {r[1]} | Display Name: {r[2]} | Service: {r[3]} | Msg Count: {r[4]}")
