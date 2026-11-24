POOL – Compleet projectoverzicht
Projectstatus: 24 november 2026 · Gebaseerd op de beschikbare HTML-bronbestanden en onze projectafspraken
1. Wat is POOL?
POOL is inmiddels uitgegroeid van één HTML-tool voor het organiseren van een pooltoernooi tot een platform waarop meerdere cafés hun eigen toernooi kunnen organiseren en bezoekers alle openbare toernooien kunnen volgen.

Het project bestaat uit drie hoofdonderdelen:

POOL Beheer

De centrale organisatieomgeving voor toernooien, deelnemers, lotingen, uitslagen, play-offs, planning, flyers, instellingen en opslag.




POOL LIVE – Toeschouwers

Eén gezamenlijke mobiele app voor alle openbare toernooien, met livewedstrijden, standen, statistieken, automatische toernooikeuze en een eigen thema per locatie.




POOL LIVE – TV

Een grootbeeldweergave binnen dezelfde toeschouwersapp voor televisies, tweede schermen en Chromecast, met een wedstrijdschema, livepoulestand, aftelklokken, pauzes en play-offpresentaties.



De kern van het systeem is dat een toernooi maar één gegevensbron heeft. Beheerders voeren uitslagen in; mobiele bezoekers en tv-schermen lezen dezelfde gegevens. De presentatie past zich aan het gekozen toernooi en de locatie aan.
2. Technische architectuur
POOL Beheer

Deelnemers · Loting · Uitslagen · Instellingen

Authenticatie en synchronisatie

Firebase Firestore

Toernooien · Spelers · Resultaten · Configuratie


Mobiel

Stand · Wedstrijden · Statistieken


TV / desktop

Livepresentatie · Pauzes · Play-offs




Gebruikte techniek
Onderdeel	Techniek
Hosting	GitHub Pages
Broncode	HTML, CSS en JavaScript
Online database	Firebase Firestore
Inloggen	Firebase Authentication
Live-updates	Firestore realtime listeners
Terugval bij verbindingsproblemen	Periodieke verversing van openbare gegevens
Mobiele installatie	Progressive Web App (PWA)
Lokale gegevens en herstel	Browseropslag, JSON-back-ups en herstelpunten
Beheer van versies	GitHub-repository

Huidige mappenstructuur
GitHub-pad	Functie
/index.html	Centrale beheerdersapp
/kijken/index.html	Gecombineerde POOL LIVE-toeschouwersapp
/vue/index.html	Afzonderlijke Vue-toeschouwersapp
/karroesel/index.html	Afzonderlijke Karroesel-toeschouwersapp

De afzonderlijke Vue- en Karroesel-apps bestaan nog steeds, maar /kijken/ is het nieuwe centrale uitgangspunt. De bedoeling is dat de toeschouwersfunctionaliteit voortaan op één plek wordt onderhouden.
Belangrijkste URL's
Centrale toeschouwersapp

https://laurensijdo74-lab.github.io/Pooltoernooi/kijken/
POOL LIVE openen

Beheerdersapp

https://laurensijdo74-lab.github.io/Pooltoernooi/
Beheerdersapp openen

Bestaande Vue-toeschouwersapp

https://laurensijdo74-lab.github.io/Pooltoernooi/vue/?tournament=tmvdkmjd0h8pa1
Vue-toeschouwersapp openen

Een specifieke POOL LIVE-link kan ook ?tournament=TOERNOOI-ID bevatten. Daarmee opent de kijker rechtstreeks dat openbare toernooi.

3. Toernooien en locaties
POOL ondersteunt meerdere onafhankelijke toernooien binnen één beheersysteem. Elk toernooi heeft een eigen deelnemerslijst, speelschema, uitslagen, instellingen, locatiegegevens, thema en toernooi-ID.
Bekende toernooien
Toernooi	Kenmerken
Vue Grandige	Lopend dubbeltoernooi, met koppels als deelnemers en meerdere rondes
Karroesel Pooltoernooi 2027	Singletoernooi, eigen Karroesel-thema en planning
Toekomstige toernooien	Kunnen voor andere cafés of nieuwe edities worden aangemaakt

Bij een dubbeltoernooi wordt een koppel administratief als één deelnemer behandeld. Bij Karroesel is iedere deelnemer een individuele speler. Daardoor kan dezelfde wedstrijd- en toernooimotor voor beide wedstrijdvormen worden gebruikt.

Een toernooi kan meerdere locaties hebben. Je kiest een standaardlocatie en kunt vervolgens per speeldag een afwijkende locatie aanwijzen. Ook het uiterlijk van die speeldag kan daardoor veranderen.
Openbaar en besloten
Elk toernooi heeft een instelling voor toegang:
Instelling	Betekenis
Openbaar	Bezoekers mogen het toernooi zonder inloggen bekijken
Besloten	Alleen toegankelijk voor bevoegde beheerders, niet zichtbaar in de publieke toernooilijst

Het publiek kan geen uitslagen invoeren, lotingen aanpassen of instellingen opslaan.

4. POOL LIVE: alle toernooien in één toeschouwersapp
Dit is een van de belangrijkste uitbreidingen van 24 november 2026.

Voorheen had Vue een eigen toeschouwersapp en Karroesel een tweede. Bij iedere functionele wijziging moesten beide HTML-bestanden worden bijgewerkt.

Daarom is de nieuwe gecombineerde app gemaakt.
Automatisch het juiste toernooi openen
De bezoeker hoeft bij het openen niet eerst een toernooi te kiezen.
Situatie	Automatisch gedrag
Er loopt een openbaar toernooi	Open dat toernooi
Meerdere toernooien lopen	Open het recentst begonnen toernooi
Toernooi is afgerond	Blijf dat toernooi maximaal zeven dagen na afloop tonen
Zevendagentermijn voorbij	Open het eerstvolgende openbare toernooi
Volgend toernooi nog niet begonnen	Toon Loting in plaats van Standen
Geen toekomstig toernooi	Toon het laatst bekende openbare toernooi

De keuze wordt bepaald aan de hand van de toernooiplanning en de geregistreerde afronding. De code gebruikt de Nederlandse tijdzone.
Handmatig wisselen
Links van Standen of Loting staat de menuknop ☰.

Daarachter staan Automatisch en de beschikbare openbare toernooien. Bij een handmatige keuze onthoudt de URL welk toernooi geselecteerd is.

De app behoudt daarna de gebruikelijke schermindeling. De gebruiker hoeft dus niet telkens langs een apart overzichtsscherm.
Loting vóór de start
Als het toernooi nog niet begonnen is, verschijnt onder de menuoptie Loting de indeling van de eerste ronde, met de poules, spelers of koppels, datums en locaties. Is de loting nog niet uitgevoerd, dan wordt dat gemeld.

Belangrijk: de combinatie van automatische selectie en openbare toernooilijst is technisch ingebouwd, maar de werking met meerdere echte openbare Firebase-toernooien is nog niet volledig live geverifieerd.

5. De beheerdersapp
De beheerdersapp is de operationele kern van het project. Hier worden alle toernooien georganiseerd en bijgewerkt.
Functieoverzicht
Onderdeel	Wat kan de beheerder ermee?
Overzicht	Toernooivoortgang, actuele ronde, kwalificaties en belangrijke acties bekijken
Spelers	Namen toevoegen, wijzigen, importeren, reserves beheren
Loting	Automatisch of handmatig poules indelen, spelers wisselen en vervangen
Speeldagen	Wedstrijden afwerken en uitslagen registreren
Standen	Standen, doorgaande deelnemers en play-offs controleren
Statistieken	Wedstrijdprestaties en toernooiranglijsten bekijken
Planning	Speeldatums en locaties per speeldag aanpassen
Instellingen	Toernooiopzet, thema, flyers, synchronisatie en back-ups regelen
Regels / FAQ	Uitleg over toernooiregels en bediening
Menu	Wisselen tussen toernooien, nieuwe toernooien maken, hulp en changelog

Nieuwe toernooien aanmaken
De beheerapp bevat een wizard met zes stappen: basisgegevens, deelnemers, speelopzet, planning, uiterlijk en een eindcontrole.

Er is ook een toernooioverzicht waarin je tussen bestaande toernooien kunt wisselen en een toernooi kunt dupliceren. Een kopie krijgt een eigen toernooi-ID en begint als besloten toernooi.

Een bestaande locatie kan dus ieder jaar een nieuwe editie organiseren zonder dat vorige toernooiresultaten verloren hoeven te gaan.
Spelersbeheer
Deelnemers kunnen afzonderlijk worden toegevoegd of via een geplakte lijst. Dagvoorkeuren en verhinderdatums kunnen bij de indeling worden meegenomen.

Reserves kunnen vóór de loting worden aangewezen. Na een uitgevoerde loting zijn ook spelerswissels en vervangingen mogelijk, zolang de betreffende poule nog geen uitslagen heeft.

Naamcorrecties veranderen de bestaande deelnemer-ID niet. Daardoor blijven reeds vastgelegde wedstrijden aan dezelfde persoon of hetzelfde koppel gekoppeld.

6. Toernooiopzet en planning
De huidige POOL-toernooimotor is bedoeld voor poules en opeenvolgende knock-outachtige kwalificatierondes, met play-offs om gelijke standen te beslissen.
Reguliere poulewedstrijden
In de bestaande opzet speelt iedere deelnemer twee keer tegen elke andere deelnemer in dezelfde poule. De tweede ontmoeting wordt met omgekeerde breakvolgorde gespeeld.

Een gewonnen wedstrijd levert één punt op. Een gelijkspel is niet mogelijk.

Bij vijf deelnemers betekent dat:
5
Deelnemers

8
Wedstrijden p.p.

20
Wedstrijden totaal


Rondes en doorstroming
De app berekent de volgende ronde op basis van het aantal deelnemers. De voorkeur gaat uit naar poules van vier of vijf deelnemers, met een automatische afweging van de beste nummers drie wanneer dat tot een betere vervolgindeling leidt.

De gebruikte benamingen zijn onder meer 1e ronde, kwartfinale, halve finale en finale. De beheerder kan per relevante ronde bepalen of de beste derde per weekend mee mag naar de volgende ronde.
Planning
De planning bevat de startdatum, speeldagen, overgeslagen weekenden en extra weken tussen rondes.

Je kunt een speeldag verplaatsen zolang de wedstrijden van die poule nog niet zijn begonnen. Ook de locatie kan per speeldag worden gewijzigd.

De instelling Speeldagen op volgorde afwerken blokkeert standaard het invoeren van uitslagen in latere speeldagen zolang eerdere dagen niet zijn afgerond. Die blokkering kan worden uitgezet wanneer de wedstrijdplanning dat vereist.

7. Loting en speelindeling
De lotingsmodule ondersteunt verschillende werkwijzen.
Methode	Gedrag
Automatisch	App deelt deelnemers in, rekening houdend met voorkeuren
Handmatig	Beheerder kiest zelf de deelnemers per poule
Lijstvolgorde	Deelnemers worden in hun bestaande lijstvolgorde verdeeld
Aanvullen	Nog open plekken kunnen willekeurig worden gevuld
Wisselen/vervangen	Correcties in de poule-indeling vóór het spelen

Bij het loten worden posities over de poules verdeeld, bijvoorbeeld eerst de eerste positie in alle poules en daarna de tweede. Het systeem houdt waar mogelijk rekening met dagvoorkeuren en verhinderingen.

Er is een lotingsanimatie met instelbaar tempo: direct, snel, normaal, langzaam of extra spannend langzaam.

Een foutieve loting kan worden teruggezet zolang er nog geen uitslagen zijn. Bij een nieuwe loting kunnen ook reeds gelote latere rondes worden teruggezet.
Printen
De loting kan worden afgedrukt of als PDF opgeslagen. Voor de poule-indelingen is een staande A4-opmaak ingericht, waarbij de kaarten zoveel mogelijk over de beschikbare pagina worden verdeeld.

Technische beheerinstructies hoeven niet op de spelersloting te verschijnen.

8. Wedstrijdregistratie en correcties
Tijdens een speeldag ziet de beheerder de wedstrijden in speelvolgorde en welke deelnemer begint met de break.

De winnaar wordt door het aanklikken van de naam geregistreerd. De stand en de resterende kwalificatiekansen worden direct opnieuw berekend.

Er zijn mogelijkheden om een uitslag te wissen, de vorige wedstrijd te herstellen en een afgeronde speeldag tijdelijk te ontgrendelen.

Ook zijn er sneltoetsen voor wedstrijdinvoer. Voor het testen bestaat een testmodus die willekeurige resultaten en specifieke gelijke-standscenario's kan simuleren.

Na de wedstrijden kan een automatisch samengesteld speeldagverslag worden gemaakt. De tekst kan worden aangepast of gekopieerd.

9. Standen en kwalificatiestatussen
Dit onderdeel is de afgelopen dagen uitgebreid aangepast.
Rangschikking
De reguliere ranglijst sorteert op punten, daarna bij gelijke punten op het minste aantal gespeelde wedstrijden en vervolgens op de oorspronkelijke poulevolgorde.

Dit laatste is alleen een stabiele sorteervolgorde, geen sportieve beslissing bij een definitief gelijke stand. Wanneer een gelijke eindstand gevolgen heeft voor plaatsing, wordt zo nodig een play-off gebruikt.
Statusregels tijdens de poule
Status	Betekenis
Zeker door	Kwalificatie staat mathematisch vast
Op koers	Deelnemer behoort tot de groep met het hoogste aantal punten
In de race	Plaatsing is nog mogelijk, maar niet zeker
Geen kans	Plaatsing is tijdens de lopende poule onmogelijk geworden
Play-off	Er is een beslissingswedstrijd nodig
Door	Deelnemer is definitief geplaatst
Uit	Deelnemer is na afronding definitief uitgeschakeld

Zeker door en Geen kans hebben voorrang op de voorlopige aanduidingen.

Bij een stand van 2–1–1–0–0 heeft uitsluitend de koploper met twee punten Op koers. Bij 2–2–2–1–0 krijgen alle drie de koplopers Op koers, tenzij een definitievere status van toepassing is.
Beste derde
De app houdt rekening met kwalificatie via de derde plaats wanneer die route in de toernooiopzet is opgenomen.

Een belangrijke eerdere testcase was Marcel & Oscar: met vijf punten waren zij zeker geplaatst, omdat zij bij een derde plaats boven de beste derde van het andere weekend zouden eindigen. De berekening moet dus zowel directe top-twee-plaatsen als alternatieve kwalificatieroutes meenemen.
Gedeelde posities
Er is ook afgesproken dat bij definitief gedeelde plaatsen de plaatsnummering dit moet respecteren, bijvoorbeeld twee deelnemers gedeeld eerste en daarna plaats drie. Dit blijft een aandachtspunt om visueel in alle standen te controleren.

10. Play-offs: een belangrijk onderdeel
De play-offmodule is uitgebreider dan een gewone beslissingswedstrijd.
Ondersteunde vormen
Bij twee deelnemers ondersteunt de rekenkern Best of 1, 3, 5 en 7. Bij drie deelnemers zijn competitievarianten mogelijk, waaronder een minicompetitie met uit- en thuiswedstrijden.

De beheerder kan onder meer het formaat kiezen, de breakvolgorde wisselen, de eerste break loten, de laatste wedstrijd herstellen en een play-off opnieuw opzetten.

Bij een beslissing wegens verhindering kan een walk-over worden geregistreerd. Er zijn afzonderlijke herstel- en vergrendelregels om te voorkomen dat een reeds besliste play-off onbedoeld wordt gewijzigd.
Play-offs om de beste nummer drie
De nummer drie uit twee poules die in hetzelfde weekend spelen, wordt vergeleken op winstpercentage. Bij gelijkheid kan een onderlinge play-off bepalen wie doorgaat.

Daarbij is een onderscheid nodig tussen:
- De play-off binnen een poule, bijvoorbeeld om te bepalen wie derde wordt.
- De play-off tussen twee nummers drie, om de extra kwalificatieplaats te bepalen.
Uitgestelde play-offs
Een specifieke uitbreiding maakt het mogelijk om een play-off later te spelen. De volgende ronde kan dan al worden geloot, met een tijdelijke plaats voor de nog onbekende winnaar.

Een concreet scenario uit Vue is dat Marco & Peter als kandidaat uit zaterdag wachten op de winnaar van de zondagse play-off tussen Nemo & Sandi en Storm & Kylian.

De loting moet zichtbaar maken wie nog in aanmerking komt. Zodra de play-off beslist is, neemt de winnaar de gereserveerde plaats over.

Een reguliere speeldag waarvan alle wedstrijden zijn ingevoerd, moet voor toeschouwers als Gespeeld worden weergegeven, ook als de play-off later volgt.

Deze logica is in de beschikbare broncode aanwezig; de volledige keten van uitgestelde play-offs blijft een belangrijk onderwerp voor praktijktesten.

11. De mobiele toeschouwersapp
De mobiele weergave is bedoeld om tijdens een speelavond snel te kunnen zien hoe het toernooi verloopt, zonder onnodig veel te scrollen.
Speeldag
Bovenaan staan de actuele stand en wedstrijdinformatie. Daaronder volgt het wedstrijdschema, met de gespeelde uitslagen en de eerstvolgende wedstrijd.

De stand toont de deelnemer, punten, gespeelde wedstrijden, eventueel het maximaal haalbare aantal punten en de kwalificatiestatus.

De aanduiding Max is vooral bedoeld voor lopende speeldagen. Bij een definitieve eindstand is die kolom niet meer nodig.
Vastgezette stand
Een recente wijziging zorgt ervoor dat de stand op mobiel bovenaan blijft verschijnen wanneer de bezoeker langs de oorspronkelijke stand naar beneden scrolt.

De afgesproken werking is:
Moment	Mobiele weergave
Vóór de eerste uitslag	Stand scrollt normaal mee
Vanaf de eerste uitslag	Stand kan bovenaan blijven staan tijdens het scrollen
Nieuwe uitslag	Vastgezette stand wordt bijgewerkt
Reguliere speeldag afgelopen	Vastgezette stand verdwijnt

Deze functie is hersteld in de afzonderlijke Vue- en Karroesel-apps en overgenomen als onderdeel van de centrale kijkapp.
Overige mobiele functies
De toeschouwer kan wedstrijden, standen per ronde en toernooistatistieken bekijken. Bij een lopende wedstrijd wordt de actuele partij benadrukt.

Play-offs worden herkenbaar getoond, met hun eigen stand en wedstrijdverloop. Onbekende deelnemers blijven zichtbaar als kandidaat of tijdelijke plaats totdat hun kwalificatie is beslist.

De gebruiker hoeft niet in te loggen voor een openbaar toernooi.

12. TV- en desktopweergave
De tv-modus is bedoeld om op een groot scherm automatisch een speelavond te presenteren.
Standaardindeling
POOL LIVE – TV-weergave

Wedstrijden

1 · Speler A – Speler B

2 · Speler C – Speler D
3 · Nu aan tafel

4 · Volgende wedstrijd


Live stand

1 · Team A

2 · Team B

3 · Team C

4 · Team D



Schematisch voorbeeld van de indeling; de daadwerkelijke kleuren volgen het geselecteerde toernooi.
Op breedbeeld staat het wedstrijdschema links en de stand rechts. Het systeem beschikt daarnaast over een compacte desktopweergave.
Bediening en wedstrijdpresentatie
De knop TV-weergave aan schakelt naar de speciale grootbeeldmodus en moet ook fullscreen activeren. De navigatie wordt in tv-modus zo min mogelijk getoond.

De huidige code bevat verwerking van de eerste en tweede helft, een pauzeweergave, afteltijden en speciale play-offpanelen. De afgesproken pauze is tien minuten.

Bij een play-off kan de tv automatisch overschakelen naar de play-offstand. Er is ook een presentatie ingebouwd die de winnaar van een play-off twee minuten groot toont.
Wedstrijdwinnaars en aankondigingen
De gewenste presentatieflow is eerder vastgesteld als:
Fase	Gewenste weergave
Wedstrijd afgerond	10 seconden uitslag/winnaar groot
Daarna	10 seconden volgende wedstrijd
Vervolgens	Terug naar wedstrijdschema en stand
Play-off beslist	Winnaar van de play-off groot in beeld
Poule/fase definitief beslist	Eindstand groot in beeld

De volledige 10 seconden winnaar → 10 seconden volgende wedstrijd-flow en het automatisch groot tonen van een definitieve pouleeindstand zijn nog niet betrouwbaar bevestigd in de laatst beschikbare code. Deze functies beschouw ik daarom als openstaande herstel- of testpunten.

Ook het naast elkaar blijven staan van wedstrijdschema en stand op een tweede tv-scherm moet in de praktijk worden gecontroleerd.

13. Thema's, branding en flyers
Een belangrijke ontwerpkeuze is dat de functionaliteit gelijk is, maar de uitstraling per toernooi kan verschillen.

De locatie-instellingen bepalen onder meer de naam, slogan, logo, kleuren en het lettertype.
Instelbare onderdelen
Instelling	Toepassing
Locatienaam	Koptekst en locatievermelding
Slogan	Ondertitel
Thema	Basisvormgeving
Hoofdkleur	Knoppen en belangrijke accenten
Accentkleur	Markeringen en details
Achtergrondkleur	Pagina-achtergrond
Kleur van kaarten	Wedstrijd- en standpanelen
Lettertype	Koppen en titels
Logo	Branding bij de toernooipresentatie

Er zijn diverse themadefinities opgenomen, waaronder een groen biljartthema, een donker/neonthema en een Karroesel-thema.

Bij een speeldag op een andere locatie kan ook de passende locatiebranding worden getoond.
Flyers
Sinds de laatste wijziging is de grote flyertitel per toernooi instelbaar in Instellingen → Toernooi → Tekst op flyers (grote titel).

Voorbeelden:
Toernooi	Flyertekst
Vue Grandige	DOUBLE TOERNOOI
Karroesel	SINGLE TOERNOOI
Vrij gekozen titel	Eigen tekst

Bij een leeg veld gebruikt de app een standaardtekst op basis van de deelnemersvorm. De flyerindeling blijft behouden en de tekst wordt over maximaal twee regels verdeeld.

Dit onderdeel is recent aangepast en door jou werkend bevestigd.

14. Statistieken en Break & Run
De statistieken zijn bedoeld om zowel tijdens als na een toernooi inzicht te geven in prestaties.

De toeschouwersapp bevat een toernooibrede statistiekenpagina met onder andere de volgende kolommen:
Kolom	Betekenis
Ges	Gespeelde wedstrijden
Gew	Gewonnen wedstrijden
Ver	Verloren wedstrijden
EB	Gewonnen wedstrijden met eigen break
In/Uit	Huidige positie binnen het toernooi

Ook gespeelde play-offwedstrijden worden in deze statistieken meegenomen. Walk-overs zonder daadwerkelijk gespeelde partij tellen niet als gespeelde wedstrijd.
Break & Run
De huidige beheerapp bevat al een instelling Break & Run bijhouden.

Een beheerder kan per wedstrijd het aantal Break & Runs bij een deelnemer verhogen of corrigeren. De registratie wordt toernooibreed opgeteld en kan als individuele ranglijst worden getoond.
Break & Run Jackpot
Naast de registratie is een vrijwillig jackpotsysteem besproken. Dat is nog niet als volledig prijzensysteem ingebouwd.

Er zijn twee afgesproken varianten:
Variant	Inleg en uitbetaling
Per speeldag	Iedere speeldag opnieuw vrijwillig inleggen; hoogste Break & Run-resultaat wint; bij geen resultaat schuift de pot door
Per toernooi	Eenmalig vrijwillig inleggen; hoogste totaal wint; bij geen Break & Run wordt de pot verloot onder betalende deelnemers

Ook moet de beheerder op basis van de totale inleg kunnen kiezen voor één, twee of drie prijzen, met een instelbare verdeling.

De administratie van inleg, potverdeling, uitbetaling en verloting moet dus nog als afzonderlijke functie worden ontwikkeld.

15. Animaties en poolballen
POOL gebruikt poolballen als visueel element in standen en animaties.

De recentste aanpassing betreft de poolballen in de gecombineerde POOL LIVE-app.








formulasports.com.au


Visuele referentie voor de gewenste officiële 8-ball-opstelling; niet een screenshot van de werkelijke app.
De afgesproken samenstelling is zeven effen ballen, zeven gestreepte ballen en de zwarte 8-ball in het midden. De twee achterste hoekballen moeten verschillend zijn: één effen en één gestreept.

In de laatste POOL LIVE-versie zijn de balnummers en de weergave aangepast, terwijl de oorspronkelijke afmetingen, beweging, posities en timing van de animatie behouden zijn.

De animatie moet op mobiel en tv gelijk blijven functioneren.

16. Online opslag, synchronisatie en herstel
De beheerdersapp kan zowel lokaal als online werken.
Firebase
In Firestore worden toernooien als afzonderlijke documenten bewaard. Het toernooi bevat onder meer de instellingen, deelnemers, kalender, lotingen, wedstrijdresultaten, kwalificaties, play-offs en locatiegegevens.

Het systeem gebruikt onder meer de collecties tournaments, locations en users.

De beheerder kan online aanmelden, beschikbare toernooien openen, handmatig online bewaren en automatische synchronisatie inschakelen.

De toeschouwersapp leest de gegevens zonder beheerderslogin. Realtime luisteren houdt het scherm bij wanneer uitslagen veranderen. Daarnaast is een periodieke verversing aanwezig als vangnet.
Back-ups en herstel
De beheerdersapp biedt meerdere mogelijkheden om gegevens veilig te stellen:
Mogelijkheid	Functie
Automatische browseropslag	Wijzigingen worden lokaal bijgehouden
JSON-export	Een volledig toernooi als bestand bewaren
JSON-import	Een opgeslagen toernooi opnieuw openen
Automatisch gekoppeld bestand	Op ondersteunde Chrome- en Edge-versies
Herstelpunten	Een eerdere toernooistand terugzetten
Online versie	Centrale opslag en uitwisseling tussen beheerders

Een belangrijke aandachtspunt blijft dat een lokale browserstand en de online Firebase-versie uit elkaar kunnen lopen. We hebben dit eerder gezien bij het vergelijken van een toeschouwerslink met de online beheerdersapp.

Daarom moet voor een live toernooi steeds duidelijk zijn welke toernooi-ID actief is, welke versie online staat en wanneer voor het laatst is gesynchroniseerd.

17. Gebruikers, rollen en beveiliging
Het uitgangspunt is een platform zonder openbare zelfregistratie voor beheerders.

Jij bent hoofdbeheerder en bepaalt welke cafés en beheerders toegang krijgen.
Rollen
Rol	Bevoegdheden
Hoofdbeheerder	Toernooien en locaties beheren binnen het hele platform
Locatiebeheerder	De eigen locatie en bijbehorende toernooien beheren
Toeschouwer	Openbare gegevens bekijken zonder account

Stijn is de bekende locatiebeheerder voor Vue Grandige.

In de huidige Firebase-adapter worden beheerrechten gecontroleerd via gebruikersprofielen met rollen zoals superadmin en locationAdmin. De toernooilijst voor een locatiebeheerder wordt op locatie gefilterd.

Belangrijk beveiligingspunt: de clientcode bevat toegangscontroles, maar de daadwerkelijke bescherming moet ook door de Firestore-beveiligingsregels worden afgedwongen. Die regels zijn bij deze inventarisatie niet opnieuw uit het live Firebase-project gecontroleerd.

Voor de gecombineerde POOL LIVE-app is specifiek een openbare query ingebouwd die alleen toernooien met toegang = openbaar opvraagt.

18. Installatie als app (PWA)
POOL LIVE heeft inmiddels een eigen installatiepakket.










POOL LIVE – Toeschouwers

Rode poolbal met de tekst POOL, een eigen PWA-manifest en afzonderlijke installatie-identiteit.


Het huidige installatiepakket bevat een HTML-bestand, een manifest en vijf iconen voor onder meer Android, maskable weergave en Apple.

De ingestelde appnaam is POOL LIVE – Toeschouwers, met als korte naam POOL LIVE. De PWA start rechtstreeks op /Pooltoernooi/kijken/.

Hiermee hoort de gecombineerde app los van de afzonderlijke Vue-, Karroesel- en beheerdersapps geïnstalleerd te kunnen worden.

De rode poolbal is dus voor de gezamenlijke toeschouwersapp, niet voor de beheerdersapp.

Voor Android wordt de app vanuit de echte GitHub Pages-URL in Chrome geïnstalleerd. Op iPhone gebeurt dit via Safari met Zet op beginscherm.

19. Projectstatus: wat is klaar en wat staat nog open?
Onderstaande status is gebaseerd op de laatst beschikbare HTML-versies en onze afspraken. Ingebouwd betekent dat de functie in de code aanwezig is; het betekent niet automatisch dat ieder scenario op een echte speelavond is getest.
Onderdeel	Status	Opmerking
Centrale beheerdersapp	Ingebouwd	Werkt voor de bestaande toernooien
Meerdere toernooien	Ingebouwd	Eigen gegevens en instellingen
Firebase Auth / Firestore	Ingebouwd	Live beveiligingsregels apart controleren
Openbaar/besloten	Ingebouwd	Publieke query filtert op openbaar
POOL LIVE /kijken/	Ingebouwd	Gecombineerde HTML beschikbaar
Automatische toernooikeuze	Testen	Met meerdere echte openbare toernooien
Menu voor toernooikeuze	Ingebouwd	Links van Standen/Loting
Loting vóór toernooistart	Ingebouwd	Publieke alleen-lezen weergave
Thema per locatie	Ingebouwd	Ook Karroesel-thema beschikbaar
Mobiele vastgezette stand	Ingebouwd	Bij actuele gespeelde wedstrijden
Statistieken	Ingebouwd	Inclusief play-offresultaten
Play-off later spelen	Testen	Vooral de volledige keten met placeholders
Kwalificatiestatussen	Ingebouwd	Mathematische controle en koploperregel
TV-pauze / helften	Testen	Werkelijke tijdsturing controleren
TV-winnaar 10 sec / volgende 10 sec	Openstaand	Herstel en verificatie
Definitieve eindstand beeldvullend	Openstaand	Gewenste automatische presentatie
Realistische 8-ball-animatie	Ingebouwd	Laatste POOL LIVE-wijziging
Flyertekst per toernooi	Ingebouwd	Door jou werkend bevestigd
Break & Run-registratie	Ingebouwd	Wedstrijdregistratie en ranking
Break & Run Jackpot	Gepland	Inleg, potverdeling en verloting
Centrale PWA met rood icoon	Ingebouwd	Installatiepakket beschikbaar
Volledige Safari/iPhone-controle	Testen	Installatie en schermgedrag

20. Aanbevolen ontwikkelvolgorde
Nu de gecombineerde POOL LIVE-app bestaat, zou ik de verdere ontwikkeling in deze volgorde aanpakken.
1. Eén centrale toeschouwersapp definitief maken. Alle nieuwe functies alleen nog ontwikkelen in /kijken/. De oude routes blijven beschikbaar, maar moeten niet langer onafhankelijk doorontwikkelen.
2. De complete tv-presentatie afronden. Winnaar, volgende wedstrijd, pauzes, play-offs en definitieve eindstand betrouwbaar achter elkaar laten werken.
3. Play-offs en kwalificatie volledig testen. Inclusief uitgestelde wedstrijden, placeholders, beste nummers drie en correcties op eerder ingevoerde uitslagen.
4. Online beheer en synchronisatie verder beveiligen. Rechten per locatie, herstel bij conflicten, duidelijke versiecontrole en betrouwbare back-ups.
5. Break & Run Jackpot ontwikkelen. Met deelnemersadministratie, inleg, uitbetaling, doorschuiven en verloting.
6. POOL LIVE als definitief platform uitbouwen. Nieuwe locaties uitnodigen, toekomstige edities beheren, een toernooiarchief toevoegen en op termijn eventueel een eigen domein gebruiken.

21. Gerelateerd project: Vedettencup
Naast het reguliere POOL-platform loopt ook een afzonderlijk project voor een eendaags Scottish Doubles-toernooi, waaronder de Kerst Vedetten Cup.

Dit heeft een andere wedstrijdopzet en een eigen HTML-tool. Het moet daarom niet zonder meer worden samengevoegd met de reguliere POOL-toernooimotor.

De uitgangspunten daarvan zijn maximaal 64 spelers, maximaal 32 teams en maximaal acht tafels. Er wordt gewerkt met poules van drie of vier teams, een bank-shotbonus en aansluitend een knock-outfase.

Er is een aparte bediening voor wedstrijdleiding en tablets aan tafel, inclusief QR/PIN-toegang, tafelgebonden schermen en kerst- of neonthema's. De goedgekeurde tabletvormgeving toont altijd de actuele poulestand naast of onder de wedstrijdinvoer.

Dit is dus een verwante ontwikkeling binnen het bredere POOL-werk, maar technisch en sportief een aparte toepassing.

22. Eindbeeld: waar werken we naartoe?
Het beoogde resultaat is één centraal platform waarop je een café kunt toevoegen, een beheerder kunt uitnodigen, een nieuw toernooi kunt aanmaken, de deelnemers kunt loten en gedurende meerdere speelavonden alle resultaten kunt laten verwerken.

Bezoekers openen één POOL LIVE-app. Die kiest automatisch het actuele openbare toernooi. De bezoeker kan een ander toernooi selecteren en ziet telkens de juiste kleuren, het juiste logo, de actuele wedstrijden, standen, statistieken en tv-presentatie.

Na het toernooi blijven resultaten beschikbaar en kan de volgende editie worden voorbereid.

Het belangrijkste verschil met de oorspronkelijke versie is dat POOL niet langer één toernooi per HTML-app hoeft te zijn. Het is nu opgezet als een platform met gedeelde functionaliteit, afzonderlijke toernooigegevens en een eigen identiteit per locatie.

De kernfunctionaliteit is grotendeels aanwezig. De grootste resterende werkzaamheden zitten in de betrouwbaarheid van complexe play-offscenario's, de automatische tv-presentatie en de live controle van het gecombineerde platform. Dat zijn de onderdelen die ik prioriteit zou geven voordat meerdere cafés het gelijktijdig gaan gebruiken.
