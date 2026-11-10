# POOL – wijzigingslog

## 10 november 2026 – play-offuitslagen mobiel beheer

- Uitslaginvoer voor overgehevelde beste-nummer-3-play-offs gebruikt rechtstreeks dezelfde opgeslagen play-off als formatkeuze en startteamwissel.
- De oorspronkelijke speeldagvolgorde blokkeert deze invoer niet meer.
- Winsten, beslissingsgrens en synchronisatie via bestaande commit-flow worden bijgewerkt.
- Geen wijzigingen aan desktop-layout.
- Dit is een testversie; Firebase-integratie moet live worden gecontroleerd.

## 10 november 2026 – play-offbediening en doorstroming

- Op de mobiele beheerkaart verdwijnen formatkeuze en startteamwissel na de eerste ingevoerde uitslag.
- Na het bereiken van de beslissende winstgrens wordt ook bij oudere snapshots met een tijdelijke status `wacht` de placeholder in de gelote volgende ronde vervangen door de winnaar.
- Herkent zowel `phx:<ronde>:d<index>` als beide volgordes van de oude `ph:<id>|<id>`-placeholder en opgeslagen metadata.
- De bestaande reguliere wedstrijdregels tonen vervolgens uitsluitend de naam van de winnaar, zodat de regels compacter worden.
- Bestaande desktopindeling behouden; live Firebase-test nog nodig.

## 10 november 2026 – installeerbare mobiele beheerdersapp (PWA)

- Eigen PWA-manifest `beheer.webmanifest`, iconen 192/512 en serviceworker `beheer-sw.js` toegevoegd in de hoofdmap.
- Beheer start op `?app=beheer` in standalone modus; publieke toernooilinks behouden hun bestaande manifest.
- Op mobiel vaste onderste navigatie: Overzicht, Speeldagen, Spelers, Meer. Desktop ongewijzigd.
- Serviceworker slaat alleen statische PWA-bestanden op; uitslagen vereisen verbinding.
- Testversie: installatie en Firebase-sync moeten op Android live worden geverifieerd.
