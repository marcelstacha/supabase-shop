Projektanforderungen für den Online-Shop

Kategorien?

Übersichtsseite:
Die Übersichtsseite zeigt die Zusammenfassung aller angezeigten Produkte
Name, Typ:Smartphone/Tablet/Foldable, Produktfoto
?Möglichkeit, Produkte in den Warenkorb zu legen.?

Produktseiten:
Jede Produktseite zeigt alle Details eines Produkts
Name, Typ:Smartphone/Tablet/Foldable, Produktfoto, Beschreibung/Details
Auswahl von Varianten (z. B. Farbe, Speichergröße).
Möglichkeit, Produkte als Favoriten hinzuzufügen.
Möglichkeit, Produkte in den Warenkorb zu legen.

Warenkorb:
Der Warenkorb speichert Produkte mit der gewählten Konfiguration (z. B. Farbe, Speichergröße) und Menge.
Der Warenkorb bleibt auch nach dem Abmelden bestehen und ist beim erneuten Einloggen sichtbar.

Nutzerregistrierung und -login:
Nutzer können ein Konto erstellen und sich einloggen.
Der Warenkorb und die Bestellhistorie sind mit dem Nutzerkonto verknüpft.

Such- und Filterfunktionen:
Nutzer können nach Produkten suchen.
Filtermöglichkeiten (z. B. nach Preis, Marke, Bewertungen).

Checkout-Prozess:
Nutzer können den Checkout-Prozess durchlaufen.
Eingabe von Lieferadresse und Zahlungsmethoden.
Bestellbestätigung nach Abschluss des Kaufs.

Bestellhistorie:
Nutzer können ihre vergangenen Bestellungen einsehen und den Status verfolgen.

Support-Chat:
Ein Support-Chat, um Nutzern bei Fragen oder Problemen zu helfen.
(Z.B. Fragen wie: "Welche Displaygröße hat das Pixel 9 Pro?")




------------------------------------------------

   Logo    (        Suche🔍        )  🧑 ♥️ 🧺


Filter(Marke,Foldable)     Sortieren(Name,Preis)
----------  ----------  ----------  ----------

    #1          #2          #3          #4

----------  ----------  ----------  ----------











               F O O T E R
-------------------------------------------------






Produktliste
------------
Oneplus 13
Oneplus Open
Samsung Galaxy S25 Ultra
Samsung Galaxy Flip 6
Samsung Galaxy Fold 6
Google Pixel 9 Pro
Google Pixel 9 Pro XL
Google Pixel 9 Pro Fold
Xiaomi MIX Flip
Xiaomi MIX Fold 4



Phone Specs
-----------
name
brand
description
dimensions (size)
weight
screen size
soc
fingerprint
battery size
charging
charging wireless















This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
