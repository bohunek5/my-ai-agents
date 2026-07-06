import re

file_path = "/Users/karolbohdanowicz/my-ai-agents/scharfer-redesign/src/components/InteractiveDiagram.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# Add useLanguage import
if "import { useLanguage }" not in content:
    content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useLanguage } from '@/context/LanguageContext';")

# Add const { t } = useLanguage(); inside component
if "const { t } = useLanguage();" not in content:
    content = content.replace("const [activeFeature, setActiveFeature] = useState<number | null>(null);", "const { t } = useLanguage();\n  const [activeFeature, setActiveFeature] = useState<number | null>(null);")

# Replace features array
new_features = """  const features: Feature[] = [
    {
      title: t('feature1Title'),
      desc: t('feature1Desc'),
      x1: 300, y1: 90, x2: 510, y2: 195,
      mobileLeft: '25.0%', mobileTop: '21%'
    },
    {
      title: t('feature2Title'),
      desc: t('feature2Desc'),
      x1: 300, y1: 260, x2: 460, y2: 250,
      mobileLeft: '24.5%', mobileTop: '42.5%'
    },
    {
      title: t('feature3Title'),
      desc: t('feature3Desc'),
      x1: 300, y1: 430, x2: 540, y2: 295,
      mobileLeft: '24.0%', mobileTop: '53.75%'
    },
    {
      title: t('feature4Title'),
      desc: t('feature4Desc'),
      x1: 1100, y1: 65, x2: 650, y2: 265,
      mobileLeft: '50%', mobileTop: '65%'
    },
    {
      title: t('feature5Title'),
      desc: t('feature5Desc'),
      x1: 1100, y1: 195, x2: 730, y2: 305,
      mobileLeft: '48%', mobileTop: '26%'
    },
    {
      title: t('feature6Title'),
      desc: t('feature6Desc'),
      x1: 1100, y1: 325, x2: 790, y2: 335,
      mobileLeft: '84%', mobileTop: '58%'
    },
    {
      title: t('feature7Title'),
      desc: t('feature7Desc'),
      x1: 1100, y1: 455, x2: 730, y2: 330,
      mobileLeft: '43%', mobileTop: '62%'
    }
  ];"""

content = re.sub(r'  const features: Feature\[\] = \[.*?\];', new_features, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(content)
print("Updated InteractiveDiagram.tsx")
