import sqlite3
import os
import datetime

db_path = os.path.expanduser('~/Library/Messages/chat.db')

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Let's inspect the message table columns
cursor.execute("PRAGMA table_info(message);")
columns = cursor.fetchall()
print("Message columns:")
for col in columns:
    print(f" - {col[1]} ({col[2]})")

# Let's inspect the last 5 messages
query = """
SELECT 
    m.ROWID,
    m.guid,
    m.text,
    m.date,
    m.date_read,
    m.is_from_me,
    h.id as handle_id,
    h.service,
    m.cache_has_attachments
FROM 
    message m
LEFT JOIN 
    handle h ON m.handle_id = h.ROWID
ORDER BY 
    m.date DESC 
LIMIT 5;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("\nLast 5 messages:")
for r in rows:
    # Convert Mac epoch to datetime
    # Mac epoch starts on Jan 1, 2001. Timestamp is in nanoseconds on modern macOS.
    ts = r[3]
    if ts > 10**12: # nanoseconds
        dt = datetime.datetime(2001, 1, 1) + datetime.timedelta(seconds=ts / 10**9)
    else: # seconds
        dt = datetime.datetime(2001, 1, 1) + datetime.timedelta(seconds=ts)
    
    print(f"RowID: {r[0]}")
    print(f"  Guid: {r[1]}")
    print(f"  Text: {r[2]}")
    print(f"  Date: {dt} (raw: {ts})")
    print(f"  IsFromMe: {r[5]}")
    print(f"  Sender: {r[6]} (Service: {r[7]})")
    print(f"  Has attachments: {r[8]}")
    print("-" * 50)
