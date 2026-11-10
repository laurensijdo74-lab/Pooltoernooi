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


## Vue Beheer PWA - installatie-identiteit (10 november 2026)
- Map: `Pooltoernooi/vue-beheer/`, los van de hoofdmap en de toeschouwersapp.
- Manifest: unieke `id` `/Pooltoernooi/vue-beheer/?identity=vue-beheer-2026`, start-URL `/Pooltoernooi/vue-beheer/?app=vue-beheer`, scope `/Pooltoernooi/vue-beheer/`.
- Manifest cacheversie v3; serviceworker cache v3. Bestaande toernooigegevens/Firebase-logica niet gewijzigd.
- Installatie moet op Samsung Chrome worden getest; een al geregistreerde PWA kan nog door Android worden herkend.
- Oude werkende `index.html` als terugval bewaren; geen live-test uitgevoerd.
