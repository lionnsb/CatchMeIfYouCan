# 🕹️ Catch Me If You Can – GPS Fangspiel

> Ein browserbasiertes Multiplayer-Spiel, bei dem sich Spieler:innen in der echten Welt bewegen und sich über eine Karte „fangen“. Inklusive Lobby-System, Radar-Sichtbarkeit und Zeitlimit – gespielt per Smartphone.

---

## 📦 Projektstruktur

```txt
CatchMeIfYouCan/
├── gui/         # React Web-App mit Karte & UI
├── api/         # Backend/API für Lobby, Spielerpositionen, etc.
├── shared/      # Gemeinsame Typen und Schnittstellen (optional)
├── docs/        # Konzept, Mockups, technische Dokumentation
└── README.md
```

---

## ✅ To-do Übersicht

### 📱 GUI (Frontend)
- [x] Startseite mit Lobby erstellen / beitreten
- [ ] Kartenintegration mit GPS (z. B. Leaflet)
- [ ] Radar-Visualisierung (Pings, Sichtbarkeit)
- [ ] „Gefangen“-Button & Statusanzeige
- [ ] Responsives Design (Mobile First)

### 🛠️ API (Backend)
- [x] Lobby erstellen / beitreten via Lobby-Code
- [ ] Spielerregistrierung & Rollenverteilung
- [ ] Positionsdaten empfangen & verarbeiten
- [ ] Sichtbarkeitslogik (Radar)
- [ ] Spielende & Gewinnerauswertung

### ☁️ Infrastruktur
- [ ] Firebase / WebSockets für Live-Updates
- [ ] Deployment (Netlify/Vercel + Render/Firebase)
- [ ] .env Beispiel für Umgebungsvariablen

### 📐 Konzept & Design
- [x] Spielidee und Ablauf dokumentiert
- [x] Mockup-Struktur geplant
- [ ] Visuelles UI-Design (Farben, Icons, etc.)
- [ ] Logo und Branding

---

## 🔧 Stack & Tools (Vorschlag)

| Bereich         | Technologie         |
|----------------|---------------------|
| Frontend        | React, Tailwind CSS |
| Karten-Rendering| Leaflet / Mapbox    |
| Echtzeitdaten   | Firebase / WebSockets |
| Backend         | Node.js + Express   |
| Authentifizierung | Google OAuth / Firebase Auth |
| Hosting         | Vercel / Netlify    |
| Geolocation     | HTML5 Geolocation API |

---

## 📜 Lizenz

MIT License – Feel free to fork, verbessern oder einsetzen 🙌

---

## 🤝 Mitwirkende

- **Projektleitung, Idee & Umsetzung:** _[Dein Name hier]_  
- Weitere Mitwirkende: _Coming soon..._
