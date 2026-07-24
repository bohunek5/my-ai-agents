import os

directory = "/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline"
html_files = [f for f in os.listdir(directory) if f.endswith(".html")]

scrolled_and_bubble_css = """
    /* Premium floating bubble mega menu on PC */
    @media (min-width: 769px) {
      .mockup-nav .magic-dropdown {
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
      }
      
      /* Pointer Arrow at the top of the bubble */
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
      }
      
      /* Invisible hover bridge */
      .mockup-nav .magic-dropdown::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 0;
        width: 100%;
        height: 20px;
        background: transparent;
      }
      
      .mockup-nav .magic-dropdown-title {
        color: #0b1a30 !important; /* ciemny napis */
        border-bottom: 1px solid rgba(0,0,0,0.06) !important;
      }
      
      .mockup-nav .magic-dropdown ul li a {
        color: #0b1a30 !important; /* ciemne napisy */
      }
      
      .mockup-nav .magic-dropdown ul li a:hover {
        background: rgba(11, 26, 48, 0.05) !important;
        color: var(--accent-color) !important;
      }
    }

    /* Search bar scrolled states - turns dark navy when header is scrolled */
    .mockup-header.scrolled .mockup-search-container {
      background: rgba(11, 26, 48, 0.05) !important;
      border-color: #0b1a30 !important;
    }
    .mockup-header.scrolled .mockup-search-container input {
      color: #0b1a30 !important;
    }
    .mockup-header.scrolled .mockup-search-container input::placeholder {
      color: rgba(11, 26, 48, 0.6) !important;
      opacity: 1 !important;
    }
    .mockup-header.scrolled .mockup-search-container button svg {
      stroke: #0b1a30 !important;
    }
"""

for filename in html_files:
    filepath = os.path.join(directory, filename)
    print(f"Injecting bubble mega menu and scrolled search styles to {filename}...")
    
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Inject CSS rules right before closing style tag if not present
    if "/* Premium floating bubble mega menu on PC */" not in content:
        if "</style>" in content:
            content = content.replace("</style>", f"{scrolled_and_bubble_css}</style>", 1)
            
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

print("Done successfully.")
