import sqlite3
import os

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
LIMIT 5;
"""

cursor.execute(query)
rows = cursor.fetchall()
print("Inspecting attributedBody for 5 messages where text is None:")
for r in rows:
    rowid = r[0]
    blob = r[1]
    print(f"RowID: {rowid}, Blob length: {len(blob)}")
    
    # Try decoding blob as utf-8 or ascii, ignoring errors, or finding printable characters
    try:
        # AttributedBody is often a binary plist or typed stream. Let's find strings inside it.
        # Often the text starts after some metadata.
        # Let's see if we can extract ASCII/UTF-8 strings.
        # A simple way to extract strings from binary data is to search for UTF-8 patterns or look for specific markers.
        # In NSAttributedString archive, the text is usually stored as a string object.
        # Let's print out the first 200 bytes of raw data or hex, or search for text.
        print("Raw representation (hex):", blob[:100].hex())
        
        # Let's try to extract plain text by looking for the length prefix or reading readable characters.
        # In macOS Catalina/Big Sur/Monterey/Ventura, the attributedBody is a typed stream containing NSAttributedString.
        # If we check for the string content, it often appears as a sequence of bytes.
        # Let's write a simple regex or parser.
        # We can also check if we can run python code that uses Objective-C (pyobjc) to decode it:
        # from Foundation import NSUnarchiver, NSKeyedUnarchiver
        # but pyobjc may not be installed. Let's check if it is or can be.
        import sys
        print("sys.path:", sys.path)
    except Exception as e:
        print(f"Error: {e}")
    print("-" * 50)
