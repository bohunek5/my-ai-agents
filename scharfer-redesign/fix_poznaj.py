file_path = 'src/app/(desktop)/poznaj/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("t('faq1Q')", "t('faqQ1')")
content = content.replace("t('faq1A')", "t('faqA1')")
content = content.replace("t('faq2Q')", "t('faqQ2')")
content = content.replace("t('faq2A')", "t('faqA2')")
content = content.replace("t('faq3Q')", "t('faqQ3')")
content = content.replace("t('faq3A')", "t('faqA3')")
content = content.replace("t('faq4Q')", "t('faqQ4')")
content = content.replace("t('faq4A')", "t('faqA4')")
content = content.replace("t('faq5Q')", "t('faqQ5')")
content = content.replace("t('faq5A')", "t('faqA5')")
content = content.replace("t('faq6Q')", "t('faqQ6')")
content = content.replace("t('faq6A')", "t('faqA6')")

content = content.replace("Szczegółowe zalety technologii", "{t('detailedTech')}")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

