# POOL — Pooltoernooi Online

> Projectdocumentatie op basis van de aangeleverde hoofdindex (`index.html`) en de projectafspraken tot 8 november 2026.

## 1. Projectdoel en scope

Een online pooltoernooisysteem met een beheerdersapp voor deelnemers, loting, wedstrijden, uitslagen en planning, en een openbare toeschouwersweergave voor live standen en wedstrijden. Meerdere locaties en toernooien moeten naast elkaar kunnen bestaan. De applicatie is een browsergebaseerde HTML/JavaScript-app met GitHub Pages als hosting en Firebase voor authenticatie en synchronisatie.

## 2. Omgevingen en links

- GitHub-repository: `laurensijdo74-lab/Pooltoernooi`.
- Hoofdsite: `https://laurensijdo74-lab.github.io/Pooltoernooi/`.
- Vue-publieke site: `https://laurensijdo74-lab.github.io/Pooltoernooi/vue/`.
- Publieke links voor andere toernooien kunnen de parameter `?tournament=<id>` gebruiken.
- Firebase-project: `pooltoernooi`; Authentication met e-mail/wachtwoord en Firestore voor toernooigegevens en rollen.
- De hoofdindex bevat een Firebase-module; de werkelijke Firestore-regels, actuele accounts en eventuele afzonderlijke Vue-/Karroesel-indexbestanden zijn niet volledig meegeleverd.

## 3. Technische architectuur

- Eén HTML-bestand bevat CSS, de rekenkern (`window.POOL`), de beheerders- en kijkinterface en online integratie.
- Rekenkernfuncties omvatten planning, loting, poulestanden, play-offs, kwalificatie, wisselen, vervangen en uitslagen.
- Toernooidata worden lokaal in `localStorage` opgeslagen; herstelpunten en een lokale toernooicatalogus worden apart bijgehouden.
- JSON-export/import maakt handmatige back-ups mogelijk; in ondersteunde browsers is koppelen aan een lokaal bestand mogelijk.
- Firebase Firestore bewaart centrale toernooistatus; online luisteren maakt updates zichtbaar voor andere beheerders en publieke kijkers.
- Publieke weergave kan realtime luisteren en heeft een periodieke verversing als vangnet.
- Publieke toegang en schrijfrechten horen door Firestore-regels afgedwongen te worden. Controleer deze bij uitrol.

## 4. Datamodel (hoofdlijnen)

Een toernooi bevat onder andere `id`, `naam`, `instellingen`, `online`, `locaties`, `locatieId`, `spelers`, `plan`, `rondes`, `ph` (plaatshouders), `derden`, `uitgestapt` en `log`. Spelers hebben een ID, naam, reserve-indicator, dagvoorkeuren en verhinderdatums. Poules bevatten deelnemers en een wedstrijdschema met winnaar en registratietijd.

## 5. Toernooi aanmaken en beheren

- Via **☰ → Nieuw toernooi** is een wizard met zes stappen beschikbaar: basisgegevens, deelnemers, speelopzet, planning, uiterlijk en controleren.
- **☰ → Alle toernooien** toont toernooien gegroepeerd per locatie (locaties alfabetisch) en binnen de locatie chronologisch op startdatum, oud naar nieuw.
- Per toernooi: **Openen**, **Dupliceren** en waar toegestaan **Verwijderen**.
- Verwijderen is alleen toegestaan voor **lokale concepttoernooien zonder loting**; er is een bevestiging. Gelote/actieve toernooien zijn beschermd. Online toernooien kunnen niet via deze knop worden verwijderd, omdat veilige verwijdering uit Firebase ontbreekt. Het huidige toernooi moet eerst verlaten worden.
- Dupliceren maakt een eigen ID en zet de kopie aanvankelijk op besloten.
- Voor meerdere beheerders geldt: controleer altijd het geselecteerde toernooi; vermijd gelijktijdige wijzigingen aan dezelfde uitslag.

## 6. Deelnemers en reserves

- Namen kunnen afzonderlijk of via **Namen plakken** worden ingevoerd; koppels zijn één deelnemer met een teamnaam.
- Bij import kan een dagvoorkeur en verhinderdatum worden meegegeven.
- Vóór de eerste loting kunnen deelnemers als reserve worden gemarkeerd. Nieuwe aanmeldingen na de eerste loting worden reserve.
- Na loting kunnen namen worden gecorrigeerd zonder deelnemer-ID te wijzigen.
- **Loting → Wissel spelers** wisselt twee deelnemers tussen poules als in beide betrokken poules nog geen scores staan.
- **Loting → Speler vervangen** vervangt een uitvaller zolang de betreffende poule geen scores heeft.
- In latere rondes toont de app vervangingskandidaten: beste beschikbare uit hetzelfde oorspronkelijke weekend, beste nummers drie uit de vorige ronde, volgende uit de oorspronkelijke poule en overige beschikbare spelers.
- Vervangen bouwt het wedstrijdschema van de betrokken poule opnieuw op; eerdere ronde-uitslagen blijven bestaan.

## 7. Loting en speelschema

- Drie methoden: **Start de loting** (automatisch), **Handmatig loten**, **Indelen in lijstvolgorde**.
- Automatische loting vult per positie alle poules en houdt zo veel mogelijk rekening met voorkeursdagen en verhinderdatums.
- Handmatig loten biedt **Rest willekeurig aanvullen** en **Bevestig loting**.
- Opnieuw loten kan zolang er in de ronde nog geen scores staan; dit kan latere rondes terugzetten.
- Latere rondes kunnen worden geloot zodra de reguliere wedstrijden van de voorgaande ronde zijn gespeeld, ook wanneer sommige play-offs nog openstaan.
- Openstaande play-offplekken worden als tijdelijke plaatshouder ingeloot; na de beslissing wordt de winnaar ingevuld.
- Bij vijf spelers zijn er twintig reguliere wedstrijden per poule: iedereen speelt tweemaal tegen elke andere speler. De links geplaatste speler breekt; bij de return wisselt de break.

## 8. Wedstrijden, uitslagen en standen

- In **Speeldagen** tik je op de winnaar; winst is één punt en er is geen remise.
- Een uitslag kan worden gewist door opnieuw op dezelfde winnaar te tikken; **Herstel vorige wedstrijd** is ook beschikbaar.
- Afgeronde speeldagen worden vergrendeld; voor correcties eerst ontgrendelen.
- Standaard moeten eerdere speeldagen afgerond zijn voor uitslaginvoer op latere dagen. Deze beperking is in de instellingen uit te zetten.
- **Planning** laat datum en locatie per speeldag wijzigen zolang er geen uitslagen zijn ingevoerd.
- Scorebord kan in eigen venster voor tv/tweede scherm worden geopend.
- Na een speeldag kunnen automatisch gegenereerde, deelbare verslagen met meerdere invalshoeken worden gemaakt.

## 9. Doorgaan, beste nummer drie en play-offs

- Gewoonlijk gaan de beste twee per poule door; afhankelijk van de ingestelde opzet gaat ook de beste nummer drie van twee poules in hetzelfde weekend door.
- De beste nummers drie worden vergeleken op winstpercentage. Bij gelijke score volgt een play-off.
- Bij gelijke standen op de doorgangsgrens maakt de app automatisch een play-off aan.
- Voor twee deelnemers: Best of 1, 3 of 5; voor grotere groepen een competitievariant. Zo nodig volgt een extra beslissingsronde.
- **Loot wie breekt** verdeelt breaks zo eerlijk mogelijk.
- **Winst wegens verhindering** registreert een walk-over; geregistreerde walk-overs zijn herstelbaar.
- De finale bepaalt de kampioen en de tweede en derde plaats; gelijke standen op die plaatsen worden met play-offs beslist.

## 10. Break & Run en statistieken

- **Instellingen → Toernooi → Break & Run bijhouden** schakelt registratie per toernooi in.
- Per speeldag is een uitklapbare registratie met wedstrijdselectie en plus-/minknoppen aanwezig.
- De ranking wordt toernooibreed berekend en voor toeschouwers als voetnoot getoond.
- Projectafspraak: maximaal één break & run per wedstrijd, toegekend aan de breaker. **Aandachtspunt:** de aangeleverde code bevat nog een teller met plus/min per deelnemer; deze beperking is niet aantoonbaar afgedwongen.
- Eerder gevraagd: statistieken-tab met gespeeld, gewonnen, verloren en winst op eigen break; playoffs meetellen en rijen niet selecteerbaar. Controleer de actuele afzonderlijke kijkindex voor de exacte implementatie.

## 11. Toeschouwersapp

- Openbare weergave zonder account voor gelote wedstrijden, standen en uitslagen.
- Mobiel zijn de standen compact en moeten namen leesbaar blijven; de wedstrijden tonen duidelijke winnaars en scores.
- Bovenaan is een aftelklok voor de eerstvolgende relevante speeldag (regulier 14:00, playoff 13:00) met LIVE-indicatie.
- De publieke pagina kan handmatig worden ververst en ontvangt online updates.
- Via QR-code of korte URL kan de kijklink op de lotings-PDF en via WhatsApp gedeeld worden.
- Voor Vue is een eigen `/vue/`-route en startschermicoon besproken; voor Karroesel een eigen icoon met KAR. Of alle losse assets aanwezig zijn, is niet met deze hoofdindex te bevestigen.

## 12. Thema’s en locaties

De hoofdindex definieert de volgende thema’s: **Karroesel**, **Biljartgroen**, **Sportcafé**, **Bruincafé**, **Neonbar** en **Modern licht**. Een thema is per locatie instelbaar en beïnvloedt kleuren, koppen en achtergrond. Er is een voorbeeldweergave, keuze voor eigen kleuren, lettertype en logo-upload.

**Karroesel:** warme cafésfeer met donker hout, koper en amber, rechtstreeks als CSS in de hoofdindex. Het eerder genoemde losse bestand `assets/themes/karroesel/karroesel-background.png` is niet als bronbestand aangetroffen en is niet nodig voor het huidige CSS-thema.

**Vue:** groen biljartthema met specifieke mobiele kijkweergave en poolbreakanimatie.

## 13. Beheer-FAQ en changelog

De beheerdersapp bevat een doorzoekbare FAQ via **☰ → Hulp & FAQ**, met uitklapbare rubrieken en vragen. De vraag over herinstroom van een eerder uitgeschakelde deelnemer is expliciet opgenomen. De changelog is bereikbaar via **☰ → Changelog**.

## 14. Opslag, herstel en synchronisatie

- Automatisch lokaal bewaren in de browser.
- Herstelpunten bij belangrijke handelingen, plus handmatige herstelpunten.
- Back-up via JSON-bestand en herstel via **Open bestand…**.
- Optioneel koppelen aan een lokaal bestand via geschikte Chrome/Edge-browser.
- Firebase-authenticatie en online toernooi-opslag; openbaar of besloten is per toernooi instelbaar.
- Online verwijderen ontbreekt bewust in de huidige beheerfunctie.

## 15. Belangrijke projectafspraken en open punten

1. Alle aanpassingen aan de hoofdindex moeten bestaande toernooifuncties, opslag en kijkweergave behouden.
2. Vue en Karroesel hebben elk een eigen visuele identiteit; controleer of wijzigingen in de hoofdindex ook doorwerken naar eventuele aparte publieke indexbestanden.
3. Veilig online verwijderen van concepttoernooien vereist een apart, geautoriseerd Firebase-proces.
4. Verifieer de daadwerkelijke Firestore-regels en rollen voordat meer beheerders toegang krijgen.
5. Controleer of de Break & Run-regel (maximaal één per wedstrijd en uitsluitend breaker) al volledig wordt afgedwongen.
6. De wizard bevat een gewenste starttijd, maar de publieke aftelklok gebruikt in de aangeleverde code vaste tijden.
7. Bij correcties in eerdere rondes na loting van een volgende ronde is extra voorzichtigheid nodig: wijzigingen werken niet altijd automatisch door in de reeds gelote ronde.
8. Bewaar de laatste goedgekeurde index als terugvalversie voordat nieuwe functies worden toegevoegd.

## 16. Praktische publicatie en beheer

1. Bewaar een kopie van de bestaande hoofdindex.
2. Upload de gewijzigde `index.html` naar de juiste map in de GitHub-repository en commit.
3. Test beheerderslogin, geselecteerd toernooi, loting, vervanging, uitslagen en online synchronisatie.
4. Test de publieke link op mobiel en desktop; controleer ook aparte Vue- en Karroeselroutes.
5. Test back-up en herstel vóór een echte wedstrijddag.

## 17. Volledige ingebouwde beheerders-FAQ

De onderstaande 55 vraag-en-antwoordparen zijn overgenomen uit de aangeleverde hoofdindex.

### Nieuw toernooi en beheer

**Hoe maak ik een nieuw toernooi?**

Open ☰ → Nieuw toernooi. Doorloop de zes stappen: basisgegevens, deelnemers, speelopzet, planning, uiterlijk en controleren. Klik op Toernooi aanmaken. Daarna vul je eventueel ontbrekende namen aan en voer je de loting uit.

**Hoe start ik het toernooi?**

Na het aanmaken is er geen aparte startknop nodig. Vul minstens vier deelnemers in, open Loting en kies een lotingsmethode. Daarna kun je via Speeldagen de uitslagen registreren.

**Kan ik een tweede toernooi voorbereiden?**

Ja. Gebruik ☰ → Nieuw toernooi. Het vorige toernooi wordt afzonderlijk bewaard. Met ☰ → Alle toernooien wissel je tussen toernooien of maak je een kopie.

**Hoe wissel ik tussen toernooien?**

Open ☰ → Alle toernooien en kies Openen bij het gewenste toernooi. Controleer bovenaan de toernooinaam voordat je uitslagen invoert.

**Hoe dupliceer ik een toernooi?**

Open ☰ → Alle toernooien en klik Dupliceren. De kopie krijgt een eigen toernooi-ID en staat aanvankelijk op besloten.

**Kan ik een andere starttijd instellen?**

In de wizard kun je een gewenste starttijd vastleggen. Let op: de publieke aftelklok gebruikt in deze versie nog 14:00 voor reguliere wedstrijden en 13:00 voor play-offs.

### Deelnemers en reserves

**Hoe voeg ik spelers of koppels toe?**

Ga naar Spelers, typ een naam en kies Toevoegen. Voor koppels voer je de volledige teamnaam als één deelnemer in.

**Hoe voer ik veel namen tegelijk in?**

Ga naar Spelers → Namen plakken. Gebruik één naam per regel. Optioneel kun je na een puntkomma of tab een voorkeursdag en verhinderdatum invullen.

**Hoe maak ik iemand reserve?**

Vink vóór de eerste loting Reserve aan bij de deelnemer. Na de eerste loting worden nieuw toegevoegde deelnemers automatisch reserve.

**Hoe breng ik een reserve in?**

Open Loting, kies de gelote ronde en klik Speler vervangen. Klik vervolgens op de uitvallende deelnemer in de poulekaart. Kies de reserve in de keuzelijst en bevestig Vervangen. Dit kan alleen zolang in die poule nog geen uitslag is ingevoerd.

**Hoe wissel ik spelers uit twee poules?**

Ga naar Loting en kies de juiste ronde. Klik Wissel spelers, selecteer een speler in de eerste poule en daarna een speler in de tweede poule. De wedstrijdschema’s worden opnieuw opgebouwd. Dit kan alleen als in beide poules nog geen score is ingevoerd.

**Hoe laat ik een uitgeschakelde speler uit ronde 1 opnieuw instromen in ronde 2?**

Open Loting → Speler vervangen en selecteer de uitvaller. De app toont een voorstel uit hetzelfde oorspronkelijke weekend en alternatieven, waaronder beschikbare nummers 3 of deelnemers uit de oorspronkelijke poule. Vervangen kan niet als de betreffende poule al scores heeft.

**Kan ik een naam na de loting corrigeren?**

Ja. Pas de naam aan op het tabblad Spelers. De bestaande deelnemer-ID blijft behouden.

**Waarom kan ik een speler niet wisselen?**

Wisselen wordt geblokkeerd zodra een betrokken poule een score heeft, of als de deelnemer nog een onbekende play-offplaats is.

### Loting en indeling

**Hoe doe ik een automatische loting?**

Open Loting, selecteer de ronde en klik Start de loting. De app houdt zo veel mogelijk rekening met dagvoorkeuren en verhinderdatums.

**Hoe loot ik handmatig?**

Kies Loting → Handmatig loten. Selecteer per positie een speler. Met Rest willekeurig aanvullen kun je open plekken automatisch vullen. Klik daarna Bevestig loting.

**Hoe deel ik in lijstvolgorde in?**

Kies Loting → Indelen in lijstvolgorde. Poule 1 krijgt de eerste namen uit de deelnemerslijst, poule 2 de volgende, enzovoort. Ook bij Namen plakken kun je deze optie kiezen.

**Kan ik opnieuw loten?**

Ja, zolang er in de ronde nog geen uitslagen zijn. Kies Loting → Opnieuw loten en bevestig. Let op: ook al gelote latere rondes worden dan teruggezet.

**Wat als dagvoorkeuren niet haalbaar zijn?**

De app meldt welke dag te veel voorkeuren heeft. Je kunt voorkeuren aanpassen of via Toch loten doorgaan; niet alle voorkeuren worden dan gevolgd.

**Kan ik een volgende ronde loten voordat alle play-offs klaar zijn?**

Ja, zodra alle reguliere poulewedstrijden van de vorige ronde zijn ingevuld. Openstaande play-offplaatsen worden als tijdelijke A / B-plaats ingeloot. De winnaar neemt die plek later automatisch over.

**Hoe druk ik de loting af?**

Open de gelote ronde op Loting en klik Afdrukken. Je kunt in de browser afdrukken of opslaan als PDF.

### Speeldagen en uitslagen

**Hoe voer ik een uitslag in?**

Open Speeldagen en kies de poule. Tik op de naam van de winnaar. De stand wordt direct bijgewerkt. De speler links breekt.

**Hoe wis ik een foutieve uitslag?**

Tik bij een nog open speeldag opnieuw op de geselecteerde winnaar om die uitslag te wissen. Of gebruik Herstel vorige wedstrijd. Op een toetsenbord werken ook 1 / pijl links, 2 / pijl rechts en Backspace.

**Waarom kan ik een afgeronde dag niet wijzigen?**

Een afgeronde speeldag wordt automatisch vergrendeld. Klik Ontgrendelen om een correctie mogelijk te maken. Vergrendel daarna opnieuw.

**Waarom kan ik een latere speeldag niet invoeren?**

Standaard moeten eerdere speeldagen eerst afgerond zijn. Bij Instellingen → Toernooi kun je Speeldagen op volgorde afwerken uitschakelen, bijvoorbeeld als een dag uitvalt.

**Kan ik een speeldag verplaatsen?**

Ga naar Planning en wijzig de datum van de betreffende speeldag. Zodra in die poule uitslagen zijn ingevoerd, is het datumveld vergrendeld.

**Hoe wijzig ik de pauze?**

Ga naar Instellingen → Toernooi → Pauze in de speeldag. Kies halverwege, geen pauze of na een bepaald wedstrijdnummer.

**Hoe toon ik een scorebord op tv?**

Open een speeldag en klik Scorebord in eigen venster. Dat venster kan op een tweede scherm of tv worden getoond.

**Hoe maak ik een verslag van een speeldag?**

Na de reguliere wedstrijden verschijnt het automatisch samengestelde verslag onder de speeldag. Kies Andere invalshoek voor een andere variant, pas tekst aan en klik Kopieer verslag.

### Standen, play-offs en doorgaan

**Hoe worden punten geteld?**

Een gewonnen wedstrijd levert één punt op. Er is geen remise. Iedereen speelt in de reguliere poule twee keer tegen iedere tegenstander; de break wisselt bij de return.

**Wie gaat door naar de volgende ronde?**

Normaal de beste twee van elke poule. Afhankelijk van de ingestelde opzet gaat ook de beste nummer 3 per weekend door.

**Wat gebeurt er bij een gelijke stand?**

Als een gelijke stand de doorgangsgrens raakt, maakt de app een play-off aan. Bij twee spelers kun je Best of 1, 3 of 5 kiezen; bij meer spelers een competitievariant. Bij opnieuw gelijk volgt zo nodig een extra play-off.

**Hoe wordt de beste nummer 3 bepaald?**

De nummers 3 van twee poules in hetzelfde weekend worden op winstpercentage vergeleken. Bij gelijk volgt een onderlinge play-off, standaard Best of 3.

**Hoe bepaal ik wie breekt in een play-off?**

Gebruik de knop 🎲 Loot wie breekt in het play-offblok voordat uitslagen zijn ingevoerd. De app verdeelt de breaks zo eerlijk mogelijk.

**Wat als een speler niet kan deelnemen aan een play-off?**

Gebruik Winst wegens verhindering in de play-off. Daarmee krijgt de tegenstander een walk-over. Een foutieve walk-over kun je op Loting bij Geregistreerde walk-overs ongedaan maken.

**Hoe wijzig ik een play-offvorm?**

Selecteer in het play-offblok bij Formaat de gewenste variant, vóórdat er uitslagen zijn ingevoerd. Als er al scores staan, moet de play-off eerst opnieuw worden opgezet.

**Hoe wordt de kampioen bepaald?**

In de finale bepaalt de eindvolgorde de kampioen en de plaatsen 2 en 3. Gelijke standen die deze plaatsen raken, worden via play-offs beslist.

### Break & Run en statistieken

**Hoe zet ik Break & Run aan?**

Ga naar Instellingen → Toernooi en vink Break & Run bijhouden aan.

**Hoe registreer ik een Break & Run?**

Open de speeldag en klap 🎱 Break & Run registreren uit. Selecteer de wedstrijd en gebruik + of − bij de juiste deelnemer. De ranking wordt toernooibreed bijgehouden.

**Hoe corrigeer ik een Break & Run?**

Selecteer dezelfde wedstrijd in het uitklapblok en gebruik de minknop om de registratie te verminderen of te verwijderen.

**Waar zien toeschouwers de Break & Runs?**

Als de optie is ingeschakeld, verschijnt een samenvatting als voetnoot bij de speeldag. In het beheerdersblok staat de individuele ranking.

### Toeschouwers en online

**Hoe maak ik het toernooi openbaar?**

Ga naar ☰ → Instellingen → Opslag en back-up → Online versie. Meld je aan en kies bij Toegang van dit toernooi Openbaar – iedereen mag bekijken.

**Hoe deel ik de toeschouwerslink?**

Bij Online versie verschijnt voor een openbaar toernooi de publieke URL. Gebruik Korte link kopiëren en deel die via WhatsApp of een QR-code.

**Moeten toeschouwers inloggen?**

Nee. Een openbaar toernooi is via de publieke kijklink zonder beheerdersaccount te bekijken.

**Hoe ververs ik de stand voor toeschouwers?**

De publieke versie synchroniseert online en heeft daarnaast een knop ↻ Vernieuwen. Controleer bij problemen of het juiste toernooi openbaar staat en online is opgeslagen.

**Kunnen twee beheerders tegelijk werken?**

Met online synchronisatie kunnen bevoegde beheerders hetzelfde toernooi openen. Voorkom dat twee beheerders tegelijkertijd dezelfde uitslag aanpassen.

### Opslag, herstel en problemen

**Waar wordt de voortgang bewaard?**

De app bewaart automatisch in de huidige browser en kan online synchroniseren. Maak daarnaast geregeld een back-up via Bewaar als bestand.

**Hoe maak ik een back-up?**

Ga naar Overzicht → Voortgang veilig stellen → Bewaar als bestand, of naar Instellingen → Opslag en back-up.

**Hoe herstel ik een eerdere versie?**

Ga naar Instellingen → Opslag en back-up → Herstelpunten. Kies het gewenste herstelpunt en klik Terugzetten. Controleer vooraf wat je daarmee overschrijft.

**Kan ik automatisch in een lokaal bestand bewaren?**

Ja, op ondersteunde versies van Chrome en Edge via Instellingen → Opslag en back-up → Koppel een bestand. Na heropenen kan opnieuw toestemming nodig zijn.

**Hoe laad ik een opgeslagen bestand?**

Gebruik Open bestand… bij Overzicht of Opslag en back-up en selecteer het eerder opgeslagen JSON-bestand.

**Wat als de verkeerde loting is uitgevoerd?**

Als er nog geen uitslagen zijn, gebruik Opnieuw loten. Zijn er al uitslagen, controleer dan eerst de beschikbare herstelpunten; voorkom verlies van gespeelde resultaten.

**Waarom verschijnt een uitslag niet online?**

Controleer de online aanmelding, Automatisch online synchroniseren en de actieve toernooinaam. Gebruik zo nodig Nu online bewaren en ververs de publieke pagina.

**Hoe test ik het toernooi zonder echte uitslagen?**

Schakel bij Instellingen → Toernooi de Testmodus in. Bij speeldagen verschijnen testhulpen voor willekeurige uitslagen en gelijke standen. Gebruik dit niet tijdens een echt toernooi.

**Waar vind ik recente wijzigingen in de app?**

Open ☰ → Changelog.

## 18. Bron en afbakening

- Primaire technische bron: de op 8 november 2026 aangeleverde `index.html` (hoofdindex, inclusief FAQ en toernooibeheer).
- Aanvullende projectcontext: in dit project besproken wensen en wijzigingen rond Vue, Karroesel, GitHub Pages en Firebase.
- Niet meegeleverd: volledige repository, afzonderlijke publieke indexen, afbeeldingen, actuele Firebase-regels en live databasegegevens. Daarom is dit een uitgebreide projectbeschrijving, geen gegarandeerde exacte inventaris van elk bestand in GitHub.
