# Football

Suis ton équipe et les grands championnats : prochain match, forme du moment, résultats, calendrier, matchs du jour en direct, classements et feuilles de match détaillées, à l'heure de Paris.

*English version: [README.en.md](README.en.md)*

## Les buts en direct (nouveau en 1.2.0)

Une notification à chaque but des matchs de tes équipes, même Football fermé (buteur, minute, buts adverses et buts annulés compris) ; au choix, le coup d'envoi et le résultat. Aucune requête en dehors de leurs matchs.

## Les onglets

- **Mon équipe** : le prochain match de ton équipe (en direct s'il est en cours), sa forme sur les derniers matchs, ses **derniers résultats** et son **calendrier**, coupes d'Europe comprises.
- **Matchs** : tous les matchs d'un jour dans le championnat choisi, avec le score et le statut (à venir, en direct avec la minute, mi-temps, terminé, après prolongation, tirs au but, reporté, annulé). **Aujourd'hui** et les flèches changent de jour.
- **Classement** : le tableau du championnat avec les points, la différence de buts et les zones (Ligue des champions, Ligue Europa, Ligue Conférence, montée, barrages, relégation).

Pendant un match en direct, la page se met à jour toute seule toutes les 30 secondes.

## La feuille de match

Clique un match pour l'ouvrir : le **fil du match** (buts avec le passeur, buts sur penalty ou contre son camp, cartons jaunes et rouges, remplacements, avec la minute) et les **statistiques** des deux équipes (tirs, tirs cadrés, corners, fautes, hors-jeu, cartons, arrêts, passes et passes réussies, tacles, interceptions). Avant le coup d'envoi, la feuille l'indique.

## Championnats

Ligue 1, Premier League, LaLiga, Serie A, Bundesliga, Ligue 2, Liga Portugal, Eredivisie, Ligue des champions et Ligue Europa, à choisir dans la liste.

## Ton équipe

Clique l'**étoile ☆** à côté d'une équipe, dans Matchs ou Classement, pour en faire ton équipe : elle a son onglet, ses matchs passent en premier, et sa ligne est mise en avant. Un nouveau clic la retire.

## Emploi du temps

Coche **Ajouter les matchs de mon équipe à mon emploi du temps** : ses matchs à venir sont ajoutés à l'agenda de NeoDex et remis à jour toutes les 3 heures (changements d'horaire compris). Décocher la case les retire.

## Les données

Les matchs, classements et feuilles de match viennent d'**ESPN**. Sans connexion, un message l'indique.

## Données et synchronisation

Ton équipe, le championnat choisi et le choix de l'emploi du temps sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée. Le plugin ne contacte que les serveurs d'ESPN.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Football → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).

## Plusieurs équipes

L'étoile ☆ d'une équipe l'ajoute à **Mes équipes** (huit au plus). Leurs matchs passent en premier, vont tous dans ton emploi du temps si tu l'as coché, et des boutons en haut de l'onglet passent de l'une à l'autre.

## Compositions

Dans la feuille de match, les onze de départ des deux équipes sont dessinés en pixel art sur un terrain, à leur poste et selon leur système (4-3-3, 3-5-2…) : maillot aux couleurs du club, gardien en jaune, numéro et nom ; ↓ marque un joueur remplacé, et les entrants sont listés dessous.

## Les buts en direct (1.2.0)

Coche **Me prévenir de chaque but des matchs de mes équipes** (coché d’office) : pendant un match d’une de tes équipes, Football regarde le score chaque minute, même fermé, et envoie une notification à chaque but (« ⚽ BUT ! Rennes · Rennes 1 - 0 Lille · 23' · le buteur »), y compris les buts adverses et les buts annulés.

- **et du coup d’envoi et du résultat** ajoute une notification au début et à la fin du match (victoire, défaite ou match nul).
- **ESSAYER** envoie une notification d’exemple.
- Aucune requête en dehors des matchs de tes équipes : Football sait quand ils se jouent grâce à leur calendrier (relu toutes les 3 h).
- Les matchs de tes équipes vont toujours dans ton emploi du temps si la première case est cochée.
