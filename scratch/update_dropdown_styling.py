import os

html_dir = "/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline"

target_css_1 = """      .mockup-nav .magic-dropdown {
        position: absolute;
        top: calc(100% + 15px) !important; /* dymek z odstepem */
        left: 50%;
        transform: translateX(-50%) perspective(1000px) rotateX(-10deg) scale(0.95);
        background: rgba(240, 240, 242, 0.96) !important; /* szary bloczek */
        backdrop-filter: blur(20px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        box-shadow: 0 25px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.4) !important;
        border-radius: 18px !important;
        border: none !important; /* bez ramek */
        width: 600px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
        padding: 25px;
        overflow: visible !important;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        pointer-events: none;
      }"""

replacement_css_1 = """      .mockup-nav .magic-dropdown {
        position: absolute;
        top: calc(100% + 15px) !important; /* dymek z odstepem */
        left: 50%;
        transform: translateX(-50%) perspective(1000px) rotateX(-10deg) scale(0.95);
        background: #ffffff !important; /* white block like filter widget */
        backdrop-filter: blur(20px) saturate(180%) !important;
        -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
        box-shadow: 0 25px 50px rgba(0,0,0,0.08) !important;
        border-radius: 24px !important; /* more rounded border */
        border: 1px solid rgba(0, 0, 0, 0.08) !important; /* light border */
        width: 600px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 1000;
        padding: 25px;
        overflow: visible !important;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        pointer-events: none;
      }"""

target_css_2 = """      /* Pointer Arrow at the top of the bubble */
      .mockup-nav .magic-dropdown::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(240, 240, 242, 0.96);
        pointer-events: none;
        z-index: 1001;
      }"""

replacement_css_2 = """      /* Pointer Arrow at the top of the bubble */
      .mockup-nav .magic-dropdown::before {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ffffff;
        pointer-events: none;
        z-index: 1001;
      }"""

files_updated = []

for filename in os.listdir(html_dir):
    if filename.endswith(".html") and filename != "old_index.html":
        filepath = os.path.join(html_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        updated = False
        if target_css_1 in content:
            content = content.replace(target_css_1, replacement_css_1)
            updated = True
        else:
            # Try dynamic whitespace replacement
            normalized_target = " ".join(target_css_1.split())
            # Find a match in normalized form if normal string replace failed
            pass
            
        if target_css_2 in content:
            content = content.replace(target_css_2, replacement_css_2)
            updated = True
            
        if updated:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            files_updated.append(filename)

print(f"Successfully updated dropdown styling in: {files_updated}")
