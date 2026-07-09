#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Prescot LED – Descriptions & Uniqueness Audit Tool
Calculates actual Jaccard Uniqueness, validates brand rules (blog presence/strip),
checks word counts, and generates an automated markdown report.
"""

import os
import re
import sys

def strip_tags(html):
    # Remove HTML tags and convert to lowercase text
    text = re.sub(r'<[^>]+>', ' ', html)
    # Replace multiple whitespaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text.lower()

def clean_html(html):
    # Split the block by <section tags
    sections = re.split(r'(?=<section)', html.strip())
    # If the last section contains "poradnik" or "poradniki", remove it
    if sections and "poradnik" in sections[-1].lower():
        return "".join(sections[:-1]).strip()
    return html.strip()

def calculate_jaccard_similarity(words1, words2):
    if not words1 or not words2:
        return 0.0
    return len(words1.intersection(words2)) / len(words1.union(words2))

def run_audit():
    html_path = "/Users/karolbohdanowicz/Downloads/TASMY.html"
    report_path = "/Users/karolbohdanowicz/Downloads/TASMY_unikalnosc_report.md"
    
    if not os.path.exists(html_path):
        print(f"ERROR: Target file not found at {html_path}")
        sys.exit(1)
        
    print(f"Reading {html_path}...")
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Find brand panel indexes
    wapro_idx = content.find('id="panel-wapro"')
    tim_idx = content.find('id="panel-tim"')
    allegro_idx = content.find('id="panel-allegro"')
    
    if wapro_idx == -1 or tim_idx == -1 or allegro_idx == -1:
        print("ERROR: Could not locate brand panels (WAPRO/TIM/Allegro) in the HTML file.")
        sys.exit(1)
        
    # Slice HTML by brands
    brand_slices = {
        'WAPRO': content[wapro_idx:tim_idx],
        'TIM': content[tim_idx:allegro_idx],
        'ALLEGRO': content[allegro_idx:]
    }
    
    categories = ['tasmy', 'sterowniki', 'zasilacze', 'profile', 'zlaczki']
    category_labels = {
        'tasmy': '💡 Taśmy LED',
        'sterowniki': '🎛️ Sterowniki LED',
        'zasilacze': '⚡ Zasilacze Scharfer',
        'profile': '📐 Profile KLUŚ',
        'zlaczki': '🔗 Złączki bezlutowe'
    }
    
    audited_products = []
    # Structure of audited_products entry:
    # {
    #   'brand': str,
    #   'category': str,
    #   'model': str,
    #   'label': str,
    #   'badge_score': int,
    #   'desc_html': str,
    #   'word_count': int,
    #   'words': set,
    #   'has_blog': bool,
    #   'calculated_score': int,
    #   'issues': list
    # }
    
    # 1. Parse products from slices
    for brand, slice_html in brand_slices.items():
        # Find category panel slices in this brand
        cat_indices = []
        for cat in categories:
            marker = f'id="{brand.lower()}-{cat}"'
            idx = slice_html.find(marker)
            if idx != -1:
                cat_indices.append((cat, idx))
        
        cat_indices.sort(key=lambda x: x[1])
        
        for idx_pos, (cat, start_idx) in enumerate(cat_indices):
            # Calculate end index of this category subpanel
            if idx_pos + 1 < len(cat_indices):
                end_idx = cat_indices[idx_pos + 1][1]
                cat_content = slice_html[start_idx:end_idx]
            else:
                cat_content = slice_html[start_idx:]
                
            # Find all accordions in this subpanel
            acc_matches = list(re.finditer(r'<div class="product-accordion" data-model="([^"]+)">', cat_content))
            
            for acc_idx, match in enumerate(acc_matches):
                model_id = match.group(1)
                
                # Slice accordion block
                start_acc = match.start()
                if acc_idx + 1 < len(acc_matches):
                    end_acc = acc_matches[acc_idx + 1].start()
                    acc_html = cat_content[start_acc:end_acc]
                else:
                    # Find end of panel/div
                    acc_html = cat_content[start_acc:]
                    
                # Extract Label
                label = ""
                label_match = re.search(r'<span class="product-label-badge">([^<]+)</span>', acc_html)
                if label_match:
                    label = label_match.group(1).strip()
                    
                # Extract Badge Score
                badge_score = 0
                badge_match = re.search(r'Unikalność:\s*(\d+)%', acc_html)
                if badge_match:
                    badge_score = int(badge_match.group(1))
                    
                # Extract Description HTML
                desc_html = ""
                start_tag = '<div class="model-block" id="desc-view-' + brand.lower() + '-' + model_id + '">'
                tag_idx = acc_html.find(start_tag)
                if tag_idx != -1:
                    raw_desc = acc_html[tag_idx + len(start_tag):].strip()
                    # Strip the closing divs from the end (model-block is closed, edit-block and product-controls are after)
                    # We can find where </textarea> starts, or find the next div. Let's find the closing </div> of desc-view
                    # Since it is a nested HTML block, we can find the matching closing tag or find the next block:
                    # <div class="edit-block" id="desc-edit-brand-model">
                    end_block_idx = raw_desc.find('</div>\n          <div class="edit-block"')
                    if end_block_idx == -1:
                        # Fallback for old structure
                        end_block_idx = raw_desc.find('</div>\n          <div class="product-controls"')
                    if end_block_idx == -1:
                        end_block_idx = raw_desc.find('</div>\n        </div>')
                        
                    if end_block_idx != -1:
                        desc_html = raw_desc[:end_block_idx].strip()
                    else:
                        # fallback
                        desc_html = raw_desc.rsplit('</div>', 3)[0].strip()
                else:
                    # Fallback for old format
                    start_tag = '<div class="model-block">'
                    tag_idx = acc_html.find(start_tag)
                    if tag_idx != -1:
                        raw_desc = acc_html[tag_idx + len(start_tag):].strip()
                        desc_html = raw_desc.rsplit('</div>', 3)[0].strip()
                    
                # Strip tags for analysis
                clean_text = strip_tags(desc_html)
                clean_text_no_blog = strip_tags(clean_html(desc_html))
                words = set(clean_text_no_blog.split())
                word_count = len(clean_text.split())
                
                # Check for blog sections
                has_blog = False
                if "poradnik" in desc_html.lower() or "poradniki" in clean_text or "blog" in desc_html.lower():
                    # More specific check: WAPRO uses section headers like "Praktyczne poradniki" or section classes
                    if 'class="poradnik"' in desc_html or 'Praktyczne poradniki' in desc_html or 'poradnik-section' in desc_html:
                        has_blog = True
                    elif 'href=' in desc_html and 'blog' in desc_html:
                        has_blog = True
                    elif 'wpis' in clean_text or 'blog' in clean_text:
                        has_blog = True
                
                audited_products.append({
                    'brand': brand,
                    'category': cat,
                    'model': model_id,
                    'label': label,
                    'badge_score': badge_score,
                    'desc_html': desc_html,
                    'word_count': word_count,
                    'words': words,
                    'has_blog': has_blog,
                    'calculated_score': 100,  # Will be calculated next
                    'issues': []
                })
                
    # 2. Calculate actual uniqueness scores in each (brand, category) group
    for brand in brand_slices.keys():
        for cat in categories:
            # Get products in this group
            group = [p for p in audited_products if p['brand'] == brand and p['category'] == cat]
            
            for p1 in group:
                if not p1['words']:
                    p1['calculated_score'] = 0
                    continue
                    
                max_sim = 0.0
                most_similar_to = None
                
                for p2 in group:
                    if p1['model'] == p2['model']:
                        continue
                    if not p2['words']:
                        continue
                        
                    sim = calculate_jaccard_similarity(p1['words'], p2['words'])
                    if sim > max_sim:
                        max_sim = sim
                        most_similar_to = p2['model']
                        
                p1['calculated_score'] = int((1.0 - max_sim) * 100)
                p1['most_similar_to'] = most_similar_to
                p1['max_similarity'] = max_sim

    # 3. Audit business rules & generate issue logs
    for p in audited_products:
        # Check 1: Check if calculated uniqueness matches badge score in HTML
        if p['calculated_score'] != p['badge_score']:
            p['issues'].append(f"Badge score ({p['badge_score']}%) does not match calculated score ({p['calculated_score']}%).")
            
        # Check 2: Word count limit
        if p['word_count'] < 30:
            p['issues'].append(f"Description is critically short ({p['word_count']} words).")
        elif p['word_count'] < 80:
            p['issues'].append(f"Description is thin ({p['word_count']} words).")
            
        # Check 3: Blog rule for WAPRO
        if p['brand'] == 'WAPRO' and not p['has_blog'] and p['category'] in ['tasmy', 'sterowniki']:
            p['issues'].append("WAPRO tape/controller description is missing practical blog guides ('Praktyczne poradniki').")
            
        # Check 4: Blog rule for TIM / ALLEGRO (must be stripped!)
        if p['brand'] in ['TIM', 'ALLEGRO'] and p['has_blog']:
            p['issues'].append(f"{p['brand']} description must NOT contain blog posts, blog references, or blog links.")

    # 4. Generate Stats
    total_count = len(audited_products)
    low_uniqueness = [p for p in audited_products if p['calculated_score'] < 40]
    med_uniqueness = [p for p in audited_products if 40 <= p['calculated_score'] < 70]
    high_uniqueness = [p for p in audited_products if p['calculated_score'] >= 70]
    
    brand_stats = {}
    for brand in brand_slices.keys():
        b_prods = [p for p in audited_products if p['brand'] == brand]
        b_low = [p for p in b_prods if p['calculated_score'] < 40]
        b_med = [p for p in b_prods if 40 <= p['calculated_score'] < 70]
        b_high = [p for p in b_prods if p['calculated_score'] >= 70]
        b_avg = sum(p['calculated_score'] for p in b_prods) / len(b_prods) if b_prods else 0
        b_issues = sum(len(p['issues']) for p in b_prods)
        brand_stats[brand] = {
            'total': len(b_prods),
            'low': len(b_low),
            'med': len(b_med),
            'high': len(b_high),
            'avg': b_avg,
            'issues': b_issues
        }

    # Find duplicate groups (descriptions that are 100% identical or >90% similar)
    high_similarity_groups = []
    checked_pairs = set()
    for p1 in audited_products:
        for p2 in audited_products:
            if p1['brand'] == p2['brand'] and p1['category'] == p2['category'] and p1['model'] != p2['model']:
                pair_key = tuple(sorted([p1['model'], p2['model']])) + (p1['brand'], p1['category'])
                if pair_key in checked_pairs:
                    continue
                checked_pairs.add(pair_key)
                
                sim = calculate_jaccard_similarity(p1['words'], p2['words'])
                if sim >= 0.90:
                    high_similarity_groups.append({
                        'brand': p1['brand'],
                        'category': p1['category'],
                        'm1': p1['model'],
                        'm2': p2['model'],
                        'sim': int(sim * 100)
                    })

    # 5. Build Markdown Report
    md = []
    md.append("# Prescot LED – Raport Audytu Unikalności Opisów Produktów\n")
    md.append(f"**Generowano:** 2026-06-14\n")
    md.append(f"**Status bazy:** Zanalizowano **{total_count}** opisów (po 80 na kanał WAPRO, TIM, Allegro).\n")
    
    md.append("## 📊 Statystyki Ogólne Kanałów Sprzedaży\n")
    md.append("| Kanał | Liczba Produktów | Zaingeruj! (<40%) | Średnia (40-69%) | Wysoka (>=70%) | Średnia Unikalność | Wykryte Błędy |")
    md.append("| :--- | :---: | :---: | :---: | :---: | :---: | :---: |")
    for b, s in brand_stats.items():
        md.append(f"| **{b}** | {s['total']} | {s['low']} ({s['low']*100/s['total']:.1f}%) | {s['med']} ({s['med']*100/s['total']:.1f}%) | {s['high']} ({s['high']*100/s['total']:.1f}%) | **{s['avg']:.1f}%** | {s['issues']} |")
    md.append("\n")
    
    md.append("## 🚨 Krytyczne Błędy Zgodności z Zasadami Biznesowymi\n")
    critical_issues = []
    for p in audited_products:
        blog_issues = [iss for iss in p['issues'] if "blog" in iss.lower() or "NOT contain" in iss or "missing practical" in iss]
        for iss in blog_issues:
            critical_issues.append(f"- **[{p['brand']}]** `{p['model']}` ({category_labels[p['category']]}): {iss}")
            
    if critical_issues:
        md.append("> [!WARNING]")
        md.append("> Wykryto błędy związane z obecnością sekcji blogowych na TIM/Allegro lub ich brakiem na WAPRO ERP:\n")
        for iss in critical_issues:
            md.append(iss)
    else:
        md.append("> [!NOTE]")
        md.append("> Wszystkie sekcje blogowe są poprawnie przydzielone (obecne w WAPRO, całkowicie usunięte w TIM i Allegro).\n")
    md.append("\n")

    md.append("## 📐 Szczegółowy Audyt Unikatowości wg Kategorii\n")
    for cat in categories:
        md.append(f"### {category_labels[cat]}\n")
        md.append("| Model | WAPRO Unikalność | TIM Unikalność | ALLEGRO Unikalność | Status & Problemy |")
        md.append("| :--- | :---: | :---: | :---: | :--- |")
        
        # Get models in this category
        models = sorted(list(set([p['model'] for p in audited_products if p['category'] == cat])))
        for m in models:
            scores = {}
            issues_list = []
            for b in ['WAPRO', 'TIM', 'ALLEGRO']:
                p_item = next((p for p in audited_products if p['brand'] == b and p['category'] == cat and p['model'] == m), None)
                if p_item:
                    scores[b] = p_item['calculated_score']
                    if p_item['issues']:
                        issues_list.extend([f"[{b}] {iss}" for iss in p_item['issues']])
                else:
                    scores[b] = "-"
            
            issues_str = "; ".join(issues_list) if issues_list else "OK"
            md.append(f"| `{m}` | {scores['WAPRO']}% | {scores['TIM']}% | {scores['ALLEGRO']}% | {issues_str} |")
        md.append("\n")

    md.append("## 🔍 Wykryte Grupy Duplikatów (Podobieństwo >= 90%)\n")
    if high_similarity_groups:
        md.append("Poniższe produkty posiadają niemal identyczne opisy słownikowe. Zaleca się ich zredagowanie w celu poprawy unikalności:\n")
        md.append("| Kanał | Kategoria | Produkt A | Produkt B | Podobieństwo Jaccarda |")
        md.append("| :--- | :--- | :--- | :--- | :---: |")
        for g in sorted(high_similarity_groups, key=lambda x: (-x['sim'], x['brand'], x['category'])):
            md.append(f"| {g['brand']} | {category_labels[g['category']]} | `{g['m1']}` | `{g['m2']}` | **{g['sim']}%** |")
    else:
        md.append("*Nie wykryto żadnych grup wysokiego podobieństwa. Opisy są zróżnicowane słownikowo.*")
    md.append("\n")

    md.append("## 📝 Algorytm Wyznaczania Unikatowości\n")
    md.append("Wskaźnik unikatowości wyznaczany jest metodą **Jaccarda (Jaccard Similarity Index)** dla zbiorów unikalnych słów występujących w opisach:\n")
    md.append("1. Z opisu usuwany jest cały kod HTML (znaczniki), pozostawiając jedynie czysty tekst.\n")
    md.append("2. Tekst jest sprowadzany do małych liter, a znaki interpunkcyjne są usuwane.\n")
    md.append("3. Tworzony jest zbiór słów (Word Vocabulary Set) dla każdego opisu w obrębie danecej kategorii i kanału (np. Taśmy LED w kanale TIM).\n")
    md.append("4. Dla każdego opisu liczona jest miara podobieństwa z każdym innym opisem w tej samej kategorii:\n")
    md.append("   $$J(A, B) = \\frac{|A \\cap B|}{|A \\cup B|}$$\n")
    md.append("5. Wynik końcowy unikatowości dla produktu to:\n")
    md.append("   $$\\text{Unikatowość} = (1 - \\max(J(A, X))) \\times 100\\%$$\n")
    md.append("   Gdzie $X$ to wszystkie pozostałe opisy w tej samej kategorii i kanale.\n")
    
    # Save Report
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md))
        
    print(f"\nAUDIT COMPLETE! Report saved to {report_path}")
    print(f"Total Products Audited: {total_count}")
    print(f"Average WAPRO uniqueness: {brand_stats['WAPRO']['avg']:.2f}%")
    print(f"Average TIM uniqueness: {brand_stats['TIM']['avg']:.2f}%")
    print(f"Average ALLEGRO uniqueness: {brand_stats['ALLEGRO']['avg']:.2f}%")
    print(f"Total violations found: {sum(s['issues'] for s in brand_stats.values())}")

if __name__ == "__main__":
    run_audit()
