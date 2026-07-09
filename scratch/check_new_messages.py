#!/usr/bin/env python3
import sqlite3
import os
import sys

STATE_FILE = os.path.expanduser('~/my-ai-agents/scratch/last_processed_rowid.txt')
SENT_LOG = os.path.expanduser('~/my-ai-agents/scratch/sent_messages.txt')
DB_PATH = os.path.expanduser('~/Library/Messages/chat.db')

def extract_text(row_text, attributed_body):
    if row_text:
        return row_text
    if not attributed_body:
        return None
    blob = attributed_body
    for marker in [b'NSString\x01\x94\x84\x01+', b'NSMutableString\x01\x94\x84\x01+']:
        idx = blob.find(marker)
        if idx != -1:
            start = idx + len(marker)
            length = blob[start]
            text_start = start + 1
            if length == 0x81:
                length = blob[start + 1]
                text_start = start + 2
            try:
                return blob[text_start:text_start + length].decode('utf-8')
            except Exception:
                pass
    for m in [b'NSString', b'NSMutableString']:
        idx = blob.find(m)
        if idx != -1:
            plus_idx = blob.find(b'+', idx)
            if plus_idx != -1 and plus_idx - idx < 30:
                start = plus_idx + 1
                length = blob[start]
                text_start = start + 1
                if length == 0x81:
                    length = blob[start + 1]
                    text_start = start + 2
                try:
                    return blob[text_start:text_start + length].decode('utf-8')
                except Exception:
                    pass
    return None

def get_last_rowid():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE) as f:
                return int(f.read().strip())
        except Exception:
            pass
    return 0

def save_last_rowid(rowid):
    with open(STATE_FILE, 'w') as f:
        f.write(str(rowid))

def get_sent_log():
    if os.path.exists(SENT_LOG):
        with open(SENT_LOG) as f:
            return set(f.read().splitlines())
    return set()

last_rowid = get_last_rowid()
sent_log = get_sent_log()

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

query = """
SELECT
    m.ROWID,
    m.text,
    m.attributedBody,
    h.id as sender_id,
    c.guid as chat_guid,
    m.is_from_me
FROM
    message m
JOIN
    chat_message_join cmj ON m.ROWID = cmj.message_id
JOIN
    chat c ON cmj.chat_id = c.ROWID
LEFT JOIN
    handle h ON m.handle_id = h.ROWID
WHERE
    m.ROWID > ?
ORDER BY
    m.ROWID ASC
"""

cursor.execute(query, (last_rowid,))
rows = cursor.fetchall()
conn.close()

new_max_rowid = last_rowid
found_new = False

for row in rows:
    rowid, text, attributed_body, sender, chat_guid, is_from_me = row
    new_max_rowid = max(new_max_rowid, rowid)

    # Skip self-sent outgoing messages (is_from_me=1) unless they're self-texts
    if is_from_me == 1:
        continue

    msg_text = extract_text(text, attributed_body)
    if not msg_text or not msg_text.strip():
        continue

    # Skip messages we already replied to (avoid loops)
    log_key = f"{rowid}:{sender}:{msg_text[:50]}"
    if log_key in sent_log:
        continue

    print(f"NEW_MESSAGE|ROWID:{rowid}|SENDER:{sender}|CHAT_GUID:{chat_guid}|TEXT:{msg_text.strip()}")
    found_new = True

if new_max_rowid > last_rowid:
    save_last_rowid(new_max_rowid)

if not found_new:
    print("NO_NEW_MESSAGES")
