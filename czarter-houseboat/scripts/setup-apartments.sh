#!/bin/bash

# Skrypt do automatycznego setup apartamentów z Opis.md

echo "🏠 Setup apartamentów z Markdown..."

# Ścieżki
OFERTA_DIR="Oferta/Apartamenty_Stranda"
PUBLIC_DIR="public/images/stranda"

# Utwórz katalog docelowy jeśli nie istnieje
mkdir -p "$PUBLIC_DIR"

# Licznik
count=0

# Przejdź przez wszystkie foldery apartamentów
for apt_dir in "$OFERTA_DIR"/*/; do
    # Pobierz ID apartamentu (nazwa folderu)
    apt_id=$(basename "$apt_dir")
    
    # Sprawdź czy istnieje Opis.md
    if [ -f "$apt_dir/Opis.md" ]; then
        echo "✅ Znaleziono apartament: $apt_id"
        
        # Sprawdź czy istnieje folder images
        if [ -d "$apt_dir/images" ]; then
            # Utwórz folder docelowy
            target_dir="$PUBLIC_DIR/${apt_id}_images"
            mkdir -p "$target_dir"
            
            # Skopiuj wszystkie zdjęcia
            image_count=$(find "$apt_dir/images" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" \) | wc -l | tr -d ' ')
            
            if [ "$image_count" -gt 0 ]; then
                cp "$apt_dir/images"/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP} "$target_dir/" 2>/dev/null
                echo "   📸 Skopiowano $image_count zdjęć do $target_dir"
                ((count++))
            else
                echo "   ⚠️  Brak zdjęć w $apt_dir/images"
            fi
        else
            echo "   ⚠️  Brak folderu images/"
        fi
    fi
done

echo ""
echo "✨ Gotowe! Skonfigurowano $count apartamentów"
echo ""
echo "Następne kroki:"
echo "  1. git add -A"
echo "  2. git commit -m 'feat: auto-setup apartments from Markdown'"
echo "  3. git push"
