
# 🧠 Grundidee – Das Fangspiel mit GPS und Karte

Die Idee ist ein browserbasiertes Online-Spiel, bei dem sich Spieler:innen draußen bewegen und „Fangen“ im echten Leben spielen – unterstützt durch GPS und eine interaktive Karte.

Spieler:innen erstellen eine Lobby, teilen den Link mit Freund:innen und spielen innerhalb eines vorher festgelegten Radius (z. B. 100–300 m).  
Ziel: Nicht gefangen werden – oder alle fangen – innerhalb eines Zeitlimits.

----------

## 📑 Inhaltsverzeichnis

1.  [🔧 Funktionale Anforderungen](#-funktionale-anforderungen)
    
2.  [⚙️ Technische Module](#%EF%B8%8F-technische-module)
    
3.  [🎨 Designideen](#-designideen)
    
4.  [🧪 Mockup-Bereiche (Designplanung)](#-mockup-bereiche-designplanung)
    
5.  [🗂️ Vorschlag Tech-Stack](#%EF%B8%8F-vorschlag-tech-stack)
    
6.  [📋 Optionale Features](#-optionale-features-f%C3%BCr-sp%C3%A4tere-releases)
    

----------

## 🔧 Funktionale Anforderungen

### 1️⃣ Startseite

-   📘 Einführung mit Icons
    
-   ➕ **Lobby erstellen**
    
-   🔗 **Lobby beitreten** (per Link oder Code)
    
-   📍 Hinweis zu GPS-Nutzung & Datenschutz
    

### 2️⃣ Lobby-System

-   🆔 Automatischer Lobby-Link/ID
    
-   👥 Anzeige vorhandener Spieler:innen
    
-   🎭 Rollenwahl: Fänger vs. Verstecker (manuell oder zufällig)
    
-   ⚙️ Einstellungen:
    
    -   Radius (100/200/300 m oder benutzerdefiniert)
        
    -   Zeitlimit (5–30 Minuten)
        
    -   Radar-Update (z. B. alle 10 Sekunden)
        
    -   💬 Optional: Lobby-Chat
        

### 3️⃣ Spielansicht

-   🗺️ Live-Karte (Leaflet / Mapbox / Google Maps)
    
-   👁️ Sichtbarkeit:
    
    -   Fänger sieht dauerhaft / radarbasiert
        
    -   Verstecker sehen Fänger nur punktuell
        
-   🔴 Fänger = Rot | 🟢 Verstecker = Grün
    
-   📡 Radar-Kreise
    
-   📣 Kommunikation & „Gefangen“-Button
    
-   🕒 Status: Gefangene & Restzeit
    

### 4️⃣ Spielende

-   ⏹️ Automatischer Spielschluss:
    
    -   Zeit abgelaufen → Verstecker gewinnen
        
    -   Alle gefangen → Fänger gewinnt
        
-   🏆 Gewinneranzeige & 📤 Neustartoption
    

----------

## ⚙️ Technische Module

### 🗺️ GPS & Karten-Integration

-   📍 HTML5 Geolocation API
    
-   🧩 Map-Rendering via Leaflet / Mapbox
    
-   🚧 Geo-Fencing – Begrenzung des Spielgebiets
    

### 📡 Radar & Sichtbarkeit

-   🔁 Server prüft Standort regelmäßig
    
-   👁️ Sichtbarkeitslogik mit Intervallen
    
-   🔄 Radar-Ping-Animationen (optional)
    

### 👥 Lobby- & Spielerverwaltung

-   🔐 Temporäre IDs oder Login via Google/Facebook
    
-   🔄 Realtime-Daten via Firebase oder WebSockets
    
-   💾 Spielstände speichern (optional)
    

### ⏱️ Game-Timer

-   🌐 Globaler Countdown für alle
    
-   ⏳ Sichtbare Zeit für alle Spieler:innen
    

### 🚨 Cheater-Erkennung

-   🏃‍♂️ Unnatürlich schnelle Bewegung → Warnung/Sperre
    
-   🧭 Standort-Sprünge checken
    
-   📊 Bewegungsanalyse mit Toleranzwerten
    

----------

## 🎨 Designideen

-   📱 Mobile First – optimiert für Smartphones
    
-   🎨 Farben:
    
    -   🔴 Fänger
        
    -   🟢 Verstecker
        
    -   🔵 Neutral
        
-   🧼 Minimalistische Karte
    
-   🌊 Animationen:
    
    -   Radar-Pings
        
    -   Timer-Puls
        
    -   Interaktive Effekte bei Aktionen
        

----------

## 🧪 Mockup-Bereiche (Designplanung)

### ✅ Startseite

-   🧢 Logo & Claim
    
-   📖 Kurze Einführung
    
-   🔘 Große Buttons: Lobby erstellen / beitreten
    

### ✅ Lobby-Ansicht

-   🔑 Lobby-Code oben
    
-   🧑‍🤝‍🧑 Spieler-Übersicht mit Rollenwahl
    
-   ⚙️ Einstellmöglichkeiten
    
-   ▶️ Start-Button (nur für Host)
    

### ✅ Spielansicht

-   🗺️ Vollbildkarte mit GPS-Punkt
    
-   👤 Icons & Namen auf der Map
    
-   📡 Radar-Visualisierung
    
-   ⏳ Countdown & 📍 „Ich wurde gefangen“-Button
    

### ✅ Spielende

-   🎯 Ergebnisübersicht & Siegertext
    
-   📊 Statistik (z. B. Laufdistanz)
    
-   🔁 Buttons für Neustart / Verlassen
    

----------

## 🗂️ Vorschlag Tech-Stack

Bereich

Technologie

Frontend

React, Tailwind CSS

Karte

Leaflet / Mapbox

Echtzeitdaten

Firebase Realtime DB / WebSockets

Backend (optional)

Node.js + Express

Authentifizierung

Firebase Auth / Google OAuth

Hosting

Vercel / Netlify

Standortdienste

HTML5 Geolocation API

----------

## 📋 Optionale Features (für spätere Releases)

-   🧑‍🚀 Login & Spielerprofil (Statistiken, Avatare)
    
-   👥 Mehrere Fänger oder Team-Modus
    
-   🎮 Neue Spielmodi: Punktejagd, Capture the Flag
    
-   🎬 Replay: Spielverlauf auf der Map nachvollziehen
    
-   🎙️ Voice-Chat (lokal oder flüstern)
