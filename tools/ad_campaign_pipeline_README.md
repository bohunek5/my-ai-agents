# Ad Campaign Pipeline

Narzędzie zapisuje stan kampanii w `campaign-state.json`, żeby decyzje nie siedziały tylko w rozmowie z AI.

## Start

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json init kurs-meta-ads-ecommerce --offer-name "Kurs Meta Ads dla e-commerce"
```

## Etap 1: kanon

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set brand_canon A
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set design_source DESIGN-ads.md
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json advance 1
```

## Etap 2: angle

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set approved_angles 2,3,6
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json advance 2
```

## Etap 3: copy

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json check-copy campaigns/kurs-meta-ads-ecommerce/copy.md
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set visual_concepts_file campaigns/kurs-meta-ads-ecommerce/visual-concepts.md
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json advance 3
```

## Etap 4: kreacje

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set creative_engine webinar-meta-ads-ai-haki/generate.py
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set templates.R1 fundamenty-C
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set templates.R2 antyguru-B
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set templates.R3 ekspert-A
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set rendered_files '["R1.png","R2.png","R3.png"]'
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set render_approval true
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json advance 4
```

## Etap 5: Meta

```bash
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set meta_structure campaigns/kurs-meta-ads-ecommerce/meta-structure.md
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set upload_status PAUSED
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json set publish_approval false
python3 tools/ad_campaign_pipeline.py --state campaigns/kurs-meta-ads-ecommerce/state.json status
```

`publish_approval` ustawiasz na `true` dopiero, gdy reklamy mają zostać aktywowane.
