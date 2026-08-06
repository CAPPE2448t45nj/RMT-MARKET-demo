# RMT MARKET – demoversion

Detta är en första frontend-prototyp för RMT MARKET.

## Starta sidan

Öppna `index.html` direkt i webbläsaren, eller kör en enkel lokal server:

```bash
python -m http.server 8000
```

Öppna sedan `http://localhost:8000`.

## Det som redan finns

- Rosa/vit Discord-inspirerad design
- Mobilanpassning
- Produktkort
- Varukorg
- Demo för Discord-inloggning
- Demo för PayPal Checkout
- Beskrivning av ticketflödet

## Nästa tekniska steg

1. Skapa backend, exempelvis med Node.js/Next.js.
2. Lägga in Discord OAuth2 Authorization Code Grant.
3. Spara Discord-användar-ID och order i databas.
4. Skapa PayPal-order på servern.
5. Verifiera betalning server-side/webhook.
6. Skapa privat Discord-ticket med en bot efter bekräftad betalning.
7. Bygga adminpanel för produkter, pris, lager och orderstatus.

## Hemliga uppgifter

Lägg aldrig Discord Bot Token, Discord Client Secret eller PayPal Secret direkt i frontend-koden.
De ska ligga som miljövariabler på servern.
