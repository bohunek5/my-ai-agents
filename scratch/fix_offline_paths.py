import os
import re

directory = "/Users/karolbohdanowicz/my-ai-agents/scratch/cooken-offline"
html_files = [f for f in os.listdir(directory) if f.endswith(".html")]

cursor_css = """
    /* Enforce cursor: pointer on all interactive elements */
    a, button, .mockup-product-card, .category-card, .slider-arrow, .color-swatch-dot, .size-swatch, .thumbnail, [onclick], .mockup-btn {
      cursor: pointer !important;
    }
"""

for filename in html_files:
    filepath = os.path.join(directory, filename)
    print(f"Processing {filename}...")
    
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        
    # Replace absolute URLs with relative ones in links
    content = content.replace('href="/shop.html', 'href="shop.html')
    content = content.replace('href="/product.html', 'href="product.html')
    content = content.replace('href="/index.html', 'href="index.html')
    content = content.replace('href="/about.html', 'href="about.html')
    content = content.replace('href="/contact.html', 'href="contact.html')
    content = content.replace('href="/blog.html', 'href="blog.html')
    content = content.replace('href="/cart.html', 'href="cart.html')
    
    # Replace absolute URLs inside JavaScript string literals or redirects
    content = content.replace('href = `/shop.html', 'href = `shop.html')
    content = content.replace('href = `/product.html', 'href = `product.html')
    content = content.replace('window.location.href = `/shop.html', 'window.location.href = `shop.html')
    content = content.replace('window.location.href = "/shop.html', 'window.location.href = "shop.html')
    content = content.replace('window.location.href = \'/shop.html', 'window.location.href = \'shop.html')
    
    # Clean leading slashes on logo and media files
    content = content.replace('src="/images/', 'src="images/')
    content = content.replace('src="/videos/', 'src="videos/')
    content = content.replace('poster="/images/', 'poster="images/')
    
    # Inject global pointer cursor rules if not already present
    if "cursor: pointer !important;" not in content:
        # Find first closing style tag
        if "</style>" in content:
            content = content.replace("</style>", f"{cursor_css}</style>", 1)
            
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(content)

print("Done processing all HTML files successfully.")
