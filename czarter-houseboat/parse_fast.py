import urllib.request
import re
import json

ids_to_scrape = [45, 31, 28, 26, 27]
scraped_data = {}

for idd in ids_to_scrape:
    url = f"https://client37851.idobooking.com/pl/szczegoly-id{idd}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
        # Try to find __INITIAL_STATE__ = {...};
        match = re.search(r'window\.__INITIAL_STATE__\s*=\s*(\{.*?\});', html, re.DOTALL)
        if match:
            state_json = match.group(1)
            state = json.loads(state_json)
            
            # The structure is usually something like state["offerDetails"]["offer"] or state["entities"]["offers"]
            title = f"Item {idd}"
            desc = ""
            images = []
            
            try:
                # Find the offer in entities
                offers = state.get("entities", {}).get("offers", {})
                offer = offers.get(str(idd)) or list(offers.values())[0] if offers else {}
                title = offer.get("name", title)
                desc = offer.get("description", "")
                
                gallery = offer.get("gallery", [])
                for img_obj in gallery:
                    # High res is usually available by replacing dimensions
                    sizes = img_obj.get("sizes", {})
                    # Let's just pick the largest one, or take 'large'
                    # e.g., sizes.get("large", {}).get("url")
                    large = sizes.get("xl", {}).get("url") or sizes.get("large", {}).get("url") or img_obj.get("url")
                    if large:
                        images.append(large)
                        
            except Exception as e:
                print(f"Error extracting JSON for {idd}: {e}")
                
            scraped_data[str(idd)] = {
                "title": title,
                "desc": desc,
                "images": images
            }
            print(f"Successfully scraped ID {idd}: {title}")
        else:
            print(f"Could not find INITIAL_STATE for {idd}")
            
    except Exception as e:
        print(f"Error fetching {idd}: {e}")

with open("ido_rest.json", "w") as f:
    json.dump(scraped_data, f, indent=4)
