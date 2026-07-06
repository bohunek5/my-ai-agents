file_path = 'src/app/(desktop)/kontakt/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("Często zadawane pytania (FAQ)", "{t('faqSectionTitle')}")
content = content.replace("Wszystko, co musisz wiedzieć o zasilaczach LED Scharfer", "{t('faqSectionDesc')}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
