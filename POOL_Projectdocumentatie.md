# POOL – Aanvulling locatiebeheer Stijn (13 november 2026)

## Bron en afbakening
Gebaseerd op de door gebruiker aangeleverde hoofdindex `index (5).html`. De bestaande mobiele playoff-CSS en publieke layouts zijn behouden. De laatste aantoonbaar werkende GitHub-hoofdindex moet vóór vervanging als terugval bewaard worden.

## Toegang
Stijn: Firebase Authentication UID `2jVMZAebdobk6XqlTR7xcc1dnph1`, profiel `/users/<UID>` met `globalRole: locationAdmin` en `locatieId: lmvdkozjc6n8116` (Vue Grandige). Superadmin behoudt toegang tot alle toernooien. De rol wordt na login uit Firestore gelezen. De toernooilijst gebruikt voor locationAdmin een query op `locatieId` en de interface filtert lokale gegevens eveneens.

## Veilig opslaan
Bij een bestaand toernooi blijft `eigenaarUid` ongewijzigd. Nieuwe toernooien krijgen de UID van de maker als eigenaar. Een locatiebeheerder mag alleen opslaan onder zijn eigen `locatieId`; de wizard gebruikt deze vaste locatie-ID. De bijgeleverde `firestore.rules` beperkt dit ook server-side, verbiedt locatie- en eigenaarwijzigingen en laat alleen superadmin locaties en gebruikersrechten wijzigen.

## Uitrol – nog niet live getest
1. Maak een back-up van de werkende hoofdindex en de huidige Firebase Rules.
2. Controleer Stijns Firestore-profiel en dat het Vue-toernooi de juiste `locatieId` heeft.
3. Test de regels eerst in Firebase Rules Playground/Emulator: superadmin kan alle toernooien beheren; Stijn kan Vue lezen/schrijven en Karroesel niet; publiek kan uitsluitend openbare toernooien lezen.
4. Publiceer pas daarna de Rules en de nieuwe hoofdindex. Test login, toernooilijst, bestaande uitslag en nieuw Vue-toernooi met Stijns account.
5. Test ook de hoofdbeheerder, publieke weergaven, mobiel en desktop. Geen live Firebase-test of echte browserregressietest uitgevoerd; alleen JavaScript-syntax lokaal gecontroleerd.

## Open aandachtspunten
De beheerapp bevat oudere lokale import- en resetfuncties. De Firestore-regels blijven de definitieve beveiligingslaag. Synchronisatie gebruikt bestaande last-write-wins-logica; gelijktijdig bewerken van hetzelfde toernooi kan conflicten geven. De volledige eerdere projectdocumentatie blijft van kracht; dit is een aanvulling en geen vervanging van de historische beschrijving.
