# POOL – wijziging 10 november 2026

## Beheerlinks in Alle toernooien
- De knop **Beheerdersapp** wisselt nu binnen de bestaande beheerapp naar het gekozen toernooi, zonder een nieuw Chrome-tabblad te openen.
- De deelbare beheer-URL gebruikt voortaan `?beheer=<toernooi-id>` in plaats van `?tournament=<toernooi-id>`; de laatste parameter activeert de publieke toeschouwersmodus.
- Bij openen van een beheer-URL wordt na initialisatie het juiste toernooi opgehaald uit de lokale beheercatalogus of, indien aangemeld, uit Firebase.
- De bestaande toeschouwerslink, scorelogica, desktopopmaak en mobiele navigatie zijn niet gewijzigd.

## Controle
- JavaScript-syntax gecontroleerd met Node.js.
- Browser/PWA-installatie en Firebase-toegangsrechten moeten na upload op het daadwerkelijke toestel worden getest.
- Bewaar de voorafgaande aantoonbaar werkende `index.html` als terugvalversie.
