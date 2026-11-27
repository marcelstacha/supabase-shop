# SupabaseShop

**SupabaseShop** ist ein Demo-Onlineshop für Smartphones und Foldables auf Basis von React, TypeScript und Supabase. Gäste können stöbern und einen lokalen Warenkorb anlegen. Angemeldete Nutzer speichern Warenkorb, Favoriten und Bestellungen in einer Postgres-Datenbank.

> **Hinweis:** Dies ist ein Portfolio-Projekt. Es werden keine tatsächligen Bestellungen ausgeführt oder Zahlungsdaten verarbeitet.

**🔗 Live-Demo:** https://DEIN-LINK.netlify.app

![Screenshot der Produktübersicht](docs/screenshot.png)

---

## Funktionsumfang

### 1. Startseite (`/`)

- **Zufälliges Produktraster:** Zeigt 16 zufällig ausgewählte Geräte, jeweils zufällig mit Vorder- oder Rückseite.
- **Automatische Empfehlungen:** Ermittelt aus den Produktdaten die Spitzenreiter in sechs Kategorien: größter Akku, schnellstes Laden, größtes und kleinstes Display, geringstes Gewicht und dünnstes Gehäuse. Bei Gleichstand wird zufällig eines der Geräte gewählt.

### 2. Produktübersicht (`/products`)

- **Filter:** Alle, Standard oder Faltbar.
- **Sortierung:** Nach Name, Vorstellungsdatum oder Preis, jeweils auf- und absteigend.
- **Animiertes Layout:** Produktkarten ordnen sich beim Filtern und Sortieren animiert neu an (`motion/react`).
- **Bildwechsel bei Hover:** Zeigt beim Überfahren die zweite Produktansicht.

### 3. Produktdetail (`/products/:id`)

- **Technische Daten:** Display, SoC, Akku, Ladeleistung (kabelgebunden und kabellos), Fingerabdrucksensor, Gewicht, Maße und Vorstellungsdatum.
- **Generierte Produktbeschreibung:** Ein Beschreibungstext wird automatisch aus den Produktdaten erzeugt.
- **Favoriten:** Angemeldete Nutzer können Produkte direkt als Favorit markieren.

### 4. Suche

- **Live-Suche** nach Marke und Modell mit Debouncing (400 ms).
- **Eigene Mobile-Variante** mit Overlay für kleine Bildschirme.

### 5. Warenkorb (`/cart`)

- **Gast-Warenkorb:** Ohne Anmeldung wird der Warenkorb im `localStorage` gespeichert.
- **Synchronisierung beim Login:** Nach der Anmeldung wird der lokale Warenkorb automatisch in die Datenbank übernommen.
- **Optimistic Updates:** Entfernte Artikel verschwinden sofort aus der Ansicht. Schlägt die Anfrage fehl, wird der Zustand wiederhergestellt.

### 6. Favoriten (`/favorites`)

- **Vergleichstabelle:** Favoriten werden mit ihren wichtigsten technischen Daten nebeneinander angezeigt.
- **Direkt in den Warenkorb:** Favoriten lassen sich mit einem Klick in den Warenkorb legen.

### 7. Checkout & Profil (`/checkout`, `/user`)

- **Bestellübersicht** mit Versandkosten und Gesamtsumme.
- **Bestellhistorie:** Vergangene Bestellungen werden nach Bestellnummer gruppiert und lassen sich aufklappen.

### Allgemein

- **Responsive Design** von 320 px bis Desktop.
- **Produkt-Cache:** Die Produktliste wird lokal zwischengespeichert, sodass die Seite bei erneutem Besuch sofort Inhalte anzeigt.
- **404-Seite** für unbekannte Routen.

---

## Technische Umsetzung

- **State-Management mit Zustand:** Getrennte Stores pro Bereich (Auth, Produkte, Warenkorb, Favoriten, Bestellungen).
- **Supabase Auth:** Login per E-Mail und Passwort. Änderungen der Session werden über `onAuthStateChange` verarbeitet.
- **Datenbank-Views:** Warenkorb, Favoriten und Bestellungen werden über Views abgefragt, die die Produktdaten bereits enthalten. Das Frontend braucht dadurch nur eine Abfrage pro Ansicht.
- **Formatierung mit `Intl`:** Preise und Zahlen werden einheitlich im deutschen Format dargestellt.

---

## Datenbank

Das Backend ist eine Supabase-Postgres-Datenbank. Das Frontend greift über `@supabase/supabase-js` direkt darauf zu.

| Tabelle / View                 | Inhalt                                          |
| ------------------------------ | ----------------------------------------------- |
| `product`                      | Produktdaten (Specs, Preis, Bildpfad)           |
| `cart` / `cart_view`           | Warenkorbeinträge pro Nutzer                    |
| `favorites` / `fav_view`       | Favoriten pro Nutzer                            |
| `orders`                       | Bestellungen (Bestellnummer, Nutzer, Zeitpunkt) |
| `order_details` / `order_view` | Artikel einer Bestellung                        |

---

## Tech-Stack

- **Framework:** React 18 & TypeScript
- **Build-Tool:** Vite 6
- **Routing:** React Router 7
- **State-Management:** Zustand 5
- **Backend & Auth:** Supabase (`@supabase/supabase-js`)
- **Styling:** Tailwind CSS 4
- **Icons & Animationen:** Heroicons (`@heroicons/react`), Motion (`motion/react`)
- **Deployment:** Netlify

---

## Projektstruktur

```text
supabaseshop/
├── public/
│   ├── assets/                  # Produktbilder
│   └── _redirects               # SPA-Routing für Netlify
├── src/
│   ├── components/
│   │   ├── home/                # Startseite: Splash, Produktraster, Empfehlungen
│   │   ├── layout/              # Navigation, Suche, Überschriften, Footer
│   │   ├── ui/                  # Wiederverwendbare Buttons und Icons
│   │   └── ...                  # Listen und Zeilen für Warenkorb, Favoriten, Bestellungen
│   ├── hooks/                   # useDebounce, useCurrentPhone
│   ├── interfaces/              # TypeScript-Typen der Datenmodelle
│   ├── layouts/                 # Seitenrahmen mit Navigation und Footer
│   ├── pages/                   # Eine Komponente pro Route
│   ├── store/                   # Zustand-Stores
│   ├── utils/                   # Formatierung, localStorage-Helfer, Konstanten
│   ├── supabaseClient.ts        # Supabase-Client
│   ├── App.tsx                  # Routing und Auth-Listener
│   └── main.tsx                 # Einstiegspunkt
├── index.html
├── package.json
└── vite.config.ts
```

---

## Installation & Lokale Entwicklung

### Voraussetzungen

- Node.js (Version 20 oder neuer)
- npm
- Ein Supabase-Projekt mit den oben genannten Tabellen und Views

### Schritte

1. **Abhängigkeiten installieren:**

```bash
npm install
```

2. **Umgebungsvariablen anlegen:** `.env.example` zu `.env` kopieren und die Werte aus dem Supabase-Dashboard eintragen:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
```

3. **Entwicklungsserver starten:**

```bash
npm run dev
```

Die Anwendung ist anschließend lokal (sowie im lokalen Netzwerk via `--host`) erreichbar.

4. **Produktions-Build erstellen:**

```bash
npm run build
```

Erzeugt das optimierte Bundle im Ordner `dist/`.

5. **Code-Qualität prüfen (ESLint):**

```bash
npm run lint
```
