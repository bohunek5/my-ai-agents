with open('main.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_code = """    const emoji = flagEmojis[lang] || lang.toUpperCase();
    currentLangBtn.innerHTML = `${emoji} <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style="margin-left: 5px; opacity: 0.6;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;"""

new_code = """    const emoji = flagEmojis[lang] || lang.toUpperCase();
    const langText = lang.toUpperCase();
    currentLangBtn.innerHTML = `<span style="font-size: 1.1rem;">${emoji}</span> <span style="font-size: 0.85rem; font-weight: 500;">${langText}</span> <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style="opacity: 0.5;"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;"""

js = js.replace(old_code, new_code)

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated main.js language button logic")
