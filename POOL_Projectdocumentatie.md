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


## 13 november 2026 – Beheer mobiel: play-off
- GitHub-hoofdmap `Pooltoernooi/index.html`. Alleen mobiele beheerweergave aangepast.
- Play-offstand krijgt een leesbare tweekolomsweergave met volledige koppelnaam en gewonnen wedstrijden.
- Bij een opgeslagen play-off markeert de blauwe streep alleen de eerstvolgende nog open wedstrijd, niet alle open wedstrijden.
- Desktop en publieke toeschouwersweergave blijven buiten scope.
- JavaScript-syntax lokaal controleren; daadwerkelijke Samsung/Firebase-test nog nodig. Oude werkende index bewaren als terugval.

## 13 november 2026 – mobiele beheer-playoff (vervolg)
- Alleen mobiele beheerweergave (maximaal 980 px): de play-offstand heeft nu dezelfde compacte drie kolommen als de reguliere stand: Speler, Ptn en Status. Namen blijven bij elkaar met normale woordafbreking; poolballen staan voor de teams.
- De blauwe actieve markering staat bij de opgeslagen play-off uitsluitend op de eerste nog niet gespeelde wedstrijd, niet op alle openstaande wedstrijden.
- Geen wijzigingen aan publieke app, desktop, uitslagberekening of gegevensopslag.
- Syntaxcontrole uitgevoerd; daadwerkelijke Samsung/Firebase-test nog nodig. Vorige werkende versie als terugval bewaren.
