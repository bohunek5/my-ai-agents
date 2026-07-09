import sqlite3
import os
from test_extractor import extract_text_from_attributed_body

db_path = os.path.expanduser('~/Library/Messages/chat.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

query = """
SELECT 
    ROWID,
    text,
    attributedBody,
    is_from_me,
    handle_id,
    date
FROM 
    message
WHERE 
    ROWID IN (275354, 275355, 275356)
"""

cursor.execute(query)
rows = cursor.fetchall()
for r in rows:
    rowid = r[0]
    txt = r[1]
    blob = r[2]
    is_me = r[3]
    h_id = r[4]
    dt = r[5]
    extracted = extract_text_from_attributed_body(blob)
    print(f"RowID {rowid} | Text: {repr(txt)} | Extracted: {repr(extracted)} | IsFromMe: {is_me} | HandleID: {h_id} | Date: {dt}")
