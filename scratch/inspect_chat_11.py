import sqlite3
import os
import datetime
from test_extractor import extract_text_from_attributed_body

db_path = os.path.expanduser('~/Library/Messages/chat.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

query = """
SELECT 
    m.ROWID,
    m.text,
    m.attributedBody,
    m.is_from_me,
    h.id as sender_id,
    m.date
FROM 
    message m
JOIN 
    chat_message_join cmj ON m.ROWID = cmj.message_id
LEFT JOIN 
    handle h ON m.handle_id = h.ROWID
WHERE 
    cmj.chat_id = 11
ORDER BY 
    m.date DESC 
LIMIT 15;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("Last 15 messages in Chat 11:")
for r in rows:
    ts = r[5]
    dt = datetime.datetime(2001, 1, 1) + datetime.timedelta(seconds=ts / 1e9)
    txt = r[1]
    if txt is None:
        txt = extract_text_from_attributed_body(r[2])
    print(f"RowID {r[0]} | Date: {dt} | IsFromMe: {r[3]} | Sender: {r[4]} | Text: {repr(txt)}")
