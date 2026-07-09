import sqlite3
import os
import re

def extract_text_from_attributed_body(blob):
    if not blob:
        return None
    # Let's search for NSString or NSMutableString in the binary plist / streamtyped
    # In streamtyped, NSString marker is b'NSString'
    # Followed by some bytes, and then the text.
    # A robust fallback is to find the b'NSString' marker, search for b'+' (which indicates serialized string length next)
    # or simply extract string using regex.
    # Let's see if we can do this by looking for 'NSString' (hex 4e53537472696e67)
    # The pattern is: NSString\x01\x94\x84\x01+<length_byte> or length_bytes.
    # Let's search for b'NSString\x01\x94\x84\x01+' (or hex 4e53537472696e67019484012b)
    # Let's check if that pattern exists:
    marker = b'NSString\x01\x94\x84\x01+'
    idx = blob.find(marker)
    if idx != -1:
        start = idx + len(marker)
        # The next byte(s) represent the length of the string.
        # It's an ObjC serialized integer. For small lengths it is a single byte.
        # Let's write a robust parser.
        # If the length is encoded in a specific way:
        # Let's read the length. In streamtyped, a variable length integer can be encoded.
        # Usually, if it's less than 128, it's just the byte itself.
        length = blob[start]
        # Wait, if length is 0x81, it might be a multi-byte integer.
        # Let's check how it's encoded.
        # If the length is a byte, let's extract that many bytes.
        # Let's inspect the next few bytes.
        text_start = start + 1
        # If it's a multi-byte length:
        if length & 0x80:
            # Let's see how many bytes.
            # In streamtyped, numbers are written in a custom format or serialized plist.
            # Let's print out what we get if we just try different lengths.
            pass
        
        # Let's try to decode the bytes as UTF-8
        # Since we might have some trailing formatting info, we can also search for the next marker.
        # Let's write a simple extraction that decodes the bytes and checks if they are printable.
        # Let's print out the exact slice:
        try:
            val = blob[text_start:text_start+length].decode('utf-8')
            return val
        except Exception:
            pass

    # If the above fails, let's try a regex search for readable text.
    # The text usually follows b'NSString' and some headers.
    # Let's find all b'NSString' and print the bytes after them.
    # Let's write a general parser that handles b'NSMutableString' as well.
    for m in [b'NSString', b'NSMutableString']:
        idx = blob.find(m)
        if idx != -1:
            # Let's look for the first '+' sign after the marker
            plus_idx = blob.find(b'+', idx)
            if plus_idx != -1 and plus_idx - idx < 20:
                start = plus_idx + 1
                length = blob[start]
                # If length is encoded as a serialized integer, let's check:
                # Sometimes it is 0x81 or similar.
                # Let's print and inspect.
                text_start = start + 1
                if length == 0x81: # usually 0x81 followed by another byte
                    # Let's check the next byte
                    length = blob[start+1]
                    text_start = start + 2
                try:
                    val = blob[text_start:text_start+length].decode('utf-8')
                    return val
                except:
                    pass
    return None

db_path = os.path.expanduser('~/Library/Messages/chat.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

query = """
SELECT 
    ROWID,
    attributedBody
FROM 
    message
WHERE 
    text IS NULL AND attributedBody IS NOT NULL
ORDER BY 
    date DESC 
LIMIT 10;
"""

cursor.execute(query)
rows = cursor.fetchall()
for r in rows:
    rowid = r[0]
    blob = r[1]
    extracted = extract_text_from_attributed_body(blob)
    print(f"RowID {rowid}: Extracted: {repr(extracted)}")
