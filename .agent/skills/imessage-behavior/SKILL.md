---
name: imessage-behavior
description: Wskazówki i standardy komunikacji z użytkownikiem za pomocą iMessage/SMS.
---

# Obsługa komunikacji iMessage/SMS z użytkownikiem

Ta umiejętność definiuje poprawne zachowanie podczas wysyłania komunikatów i potwierdzeń do użytkownika na iMessage.

## Zasady komunikacji

1. **Szary dymek (Incoming Message)**:
   - Zawsze wysyłaj wiadomości iMessage na numer telefonu użytkownika: `+48603045005` lub `+48726400332` zamiast na adres email `prezes@zeglarstwomazury.pl`.
   - Dzięki temu na telefonie odbiorcy wiadomość pojawi się jako szary dymek (przychodząca), a nie niebieski (wysłana przez samego siebie).

2. **Format wiadomości**:
   - Pisz po polsku, zwięźle i konkretnie.
   - Wymieniaj wdrożone poprawki w punktach.
   - Podawaj status budowania (`npm run build`) oraz wypchnięcia do Git.

3. **Uruchamianie AppleScript**:
   - Użyj poniższego szablonu AppleScript, aby wysłać iMessage na numer telefonu:
     ```applescript
     tell application "Messages"
         try
             set targetService to 1st service whose service type = iMessage
             set targetBuddy to buddy "+48603045005" of targetService
             send "Treść wiadomości" to targetBuddy
         on error
             set targetService to 1st service whose service type = SMS
             set targetBuddy to buddy "+48603045005" of targetService
             send "Treść wiadomości" to targetBuddy
         end try
     end tell
     ```
