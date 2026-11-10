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

## Vue Beheer als aparte PWA (voorbereid 10 november 2026)
- GitHub-map: `vue-beheer/`; installatieadres: `https://laurensijdo74-lab.github.io/Pooltoernooi/vue-beheer/`.
- Bestanden: `index.html`, `beheer.webmanifest`, `beheer-sw.js`, `beheer-icon-192.png`, `beheer-icon-512.png`.
- Eigen manifest-ID, start-URL, scope en cache-prefix, gescheiden van de toeschouwersapp.
- De applicatielogica en Firebase-configuratie zijn niet aangepast. De bestaande hoofdmap en `/vue/` blijven ongewijzigd.
- Let op: icons uit eerdere upload hadden JPEG-inhoud met `.png`-extensie; opnieuw als echte PNG opgeslagen.
- Controle: syntaxis en bestanden lokaal te verifiëren; installatie en online toegang pas aantoonbaar na publicatie en test op Samsung.
- Bewaar de vorige werkende index per map als terugval.
