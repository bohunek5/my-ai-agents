import re

file_path = 'src/app/(mobile)/mobile/page.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix cases like '{t('something')}' -> t('something')
# and "{t('something')}" -> t('something')
content = re.sub(r"'\{t\('([^']+)'\)\}'", r"t('\1')", content)
content = re.sub(r'"\{t\(\'([^\']+)\'\)\}"', r"t('\1')", content)

# Also fix the abbreviations in stories
content = content.replace("title: 'Praca pod 100% obciążeniem'", "title: t('story3Title')")
content = content.replace("body: '{t('story3P1')} Kupujesz 150W i otrzymujesz 150W.'", "body: t('story3P1')")
content = content.replace("title: 'Zgodność z Normami CE, RoHS'", "title: t('story4Title')")
content = content.replace("body: 'Zasilacze Scharfer spełniają rygorystyczne europejskie normy bezpieczeństwa dla urządzeń oświetleniowych, w tym PN-EN 61347-1, EN 61347-2-13, EN 55015, EN 61547.'", "body: t('story4P1')")
content = content.replace("body: '{t('story5P1')} przeciążeniowe, przeciwzwarciowe, termiczne i nadnapięciowe.'", "body: t('story5P1')")
content = content.replace("title: 'Masywne Aluminium i Żywica'", "title: t('story6Title')")
content = content.replace("body: 'Trwałość zasilacza zależy od odprowadzania ciepła. Zasilacze Scharfer zamknięte są w aluminiowej obudowie-radiatorze, a ich wnętrze jest w 100% zalane żywicą epoksydową przewodzącą ciepło.'", "body: t('story6P1')")

# Fix FAQ
content = content.replace("q: 'Jakie jest ryzyko awarii zasilacza IP67 w ujemnych temperaturach?'", "q: t('faqQ1')")
content = content.replace("a: 'Zasilacze Scharfer są testowane w komorach klimatycznych i gwarantują bezpieczny rozruch oraz stabilną pracę nawet przy -30°C. Aluminiowa obudowa i zalewa z żywicy epoksydowej chronią komponenty elektroniczne przed szronem i pękaniem.'", "a: t('faqA1')")

content = content.replace("q: 'Czy zasilacze Scharfer mogą pracować w zamkniętych, płytkich wnękach sufitowych?'", "q: t('faqQ2')")
content = content.replace("a: 'Tak, modele z serii GP są zaprojektowane specjalnie z myślą o instalacjach w miejscach o ograniczonej przestrzeni. Należy jednak pamiętać o zachowaniu minimalnego odstępu montażowego (około 2-3 cm z każdej strony), aby umożliwić pasywne chłodzenie.'", "a: t('faqA2')")

content = content.replace("q: 'Co oznacza certyfikat SELV na obudowie zasilacza?'", "q: t('faqQ3')")
content = content.replace("a: 'SELV (Safety Extra-Low Voltage) oznacza obwód bardzo niskiego napięcia bezpiecznego. Zasilacze Scharfer z tym oznaczeniem gwarantują, że napięcie wyjściowe (np. 12V lub 24V) nie przekroczy bezpiecznych wartości nawet w przypadku awarii wewnętrznej urządzenia.'", "a: t('faqA3')")

content = content.replace("q: 'Jak prawidłowo dobrać moc zasilacza do długości taśmy LED?'", "q: t('faqQ4')")
content = content.replace("a: 'W przeciwieństwie do tańszych urządzeń wymagających 20% zapasu mocy, zasilacze Scharfer mogą pracować pod 100% zadeklarowanym obciążeniem. Aby obliczyć potrzebną moc, pomnóż moc taśmy z jednego metra przez całkowitą długość odcinka (np. 10m x 14.4 W/m = 144W, wybierz zasilacz 150W).'", "a: t('faqA4')")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed quotes and abbreviations.")
