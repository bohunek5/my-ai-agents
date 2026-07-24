import os

html_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline"

target_sig = "      .mockup-header {"
replacement = """      .mockup-search-container, .wishlist-trigger, .mockup-action-icon[aria-label="Konto użytkownika"] {
        display: none !important;
      }
      .mockup-header-logo img {
        filter: brightness(0) !important; /* Force logo to be visible black on white mobile header */
      }
      .mockup-header {"""

files_updated = []

for filename in os.listdir(html_dir):
    if filename.endswith(".html") and filename != "old_index.html":
        filepath = os.path.join(html_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Check if we already added it to avoid duplicates
        if ".mockup-search-container, .wishlist-trigger" in content:
            # If it's already there (like in shop.html), skip or ensure brightness filter is there
            if ".mockup-header-logo img {\\n        filter: brightness(0)" not in content and ".mockup-header-logo img {\\n        filter: none" in content:
                # In shop.html we had 'filter: none', let's replace it with 'filter: brightness(0)'
                content = content.replace("filter: none !important; /* Use dark logo on white header */", "filter: brightness(0) !important; /* Force logo to be visible black on white mobile header */")
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                files_updated.append(filename + " (updated filter)")
            continue
            
        if target_sig in content:
            content = content.replace(target_sig, replacement)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            files_updated.append(filename)

print(f"Successfully updated mobile headers in: {files_updated}")
