# ⚓ Node.js et le rendu côté serveur — Le registre de la capitainerie

Bienvenue dans le parcours 03 ! Jusqu'ici, ton JavaScript vivait **dans le navigateur**.
Ici, il va tourner **sur un serveur** : ton ordinateur va fabriquer des pages HTML
et les servir lui-même, comme le font les vrais sites web.

## Le projet final

Te voilà capitaine de port. 🧢 Le **registre de la capitainerie** est une vraie
application web qui permet de :

- consulter les navires actuellement à quai (nom, type, ponton, longueur,
  durée du séjour), dernier arrivé en tête ;
- enregistrer une **arrivée** via un formulaire d'accostage ;
- faire **lever l'ancre** à un navire qui repart ;
- voir les chiffres du port : navires à quai, mètres de quai occupés, type
  de navire majoritaire ;
- filtrer le registre par type de navire ;
- tout est **rendu côté serveur** : le HTML arrive déjà construit dans le
  navigateur, et le registre survit au redémarrage (fichier JSON).

Et le bateau que tu as animé au parcours 02 ? Il pourra venir s'amarrer
dedans — c'est l'un des bonus. ⛵

Un corrigé complet et commenté se trouve dans `projet-final-corrige/`.
**Ne le regarde qu'en dernier recours** — ou après avoir terminé ta propre version.

## Ce qui change par rapport au parcours 02

| Avant (navigateur) | Maintenant (Node.js) |
|---|---|
| Le code s'exécute quand on ouvre une page | Le code s'exécute avec `node fichier.js` dans le terminal |
| `console.log` s'affiche dans la console F12 | `console.log` s'affiche dans le terminal |
| `document`, `window`, les événements souris | N'existent pas ! À la place : fichiers, réseau, serveur |
| Le HTML est écrit à la main | Le HTML est **généré** par ton code, avec des données dedans |

Ce qui ne change PAS : les variables, fonctions, boucles, objets, tableaux…
Tout ce que tu as appris reste valable à 100 %.

## Comment travailler

1. Chaque module contient une fiche `theorie.md` et un ou plusieurs exercices.
2. Lis la théorie, puis fais les exercices **dans l'ordre** — les consignes sont
   dans les commentaires des fichiers.
3. Pour tester : ouvre un terminal dans le dossier du module
   (dans VS Code : menu *Terminal → Nouveau terminal*), puis `node exercice-1.js`.
   À partir du module 3, tu testeras aussi dans le navigateur via `http://localhost:3000`.
4. Bloqué plus de 20-30 minutes ? Regarde le corrigé dans `solutions/`,
   comprends-le, puis **referme-le et refais l'exercice sans le regarder**.
5. Modifie, casse, expérimente. Un serveur qui plante, ça se relance. 😉

## Le parcours

| Module | Sujet | Ce que ça apporte au projet |
|---|---|---|
| 1 | Node.js et le terminal | Exécuter du JS hors navigateur |
| 2 | Fichiers, JSON et méthodes de tableaux | Lire/écrire les données du journal |
| 3 | Ton premier serveur HTTP | Comprendre requête → réponse |
| 4 | Express et les templates EJS | Générer du HTML avec des données |
| 5 | Formulaires et persistance | Ajouter une entrée et la sauvegarder |
| 6 | Le projet final, étape par étape | Tout assembler |

## Prérequis techniques

- **Node.js** (version LTS) : télécharge-le sur [nodejs.org](https://nodejs.org/fr)
  et installe-le. Vérifie ensuite dans un terminal :

  ```
  node --version
  npm --version
  ```

  Les deux doivent répondre un numéro de version. (`npm` est installé avec Node —
  c'est le « magasin » de bibliothèques, tu t'en serviras au module 4.)
- VS Code, comme d'habitude.
- Un navigateur pour admirer le résultat.

## Astuce de survie

Un serveur lancé avec `node serveur.js` **ne rend pas la main** : c'est normal,
il attend des visiteurs ! Pour l'arrêter : `Ctrl + C` dans le terminal.

Et après CHAQUE modification du code, il faut l'arrêter puis le relancer
(le serveur ne recharge pas tout seul). 
Astuce: tu peux regarder en ligne ce qu'est nodemon pour automatiser ça.

Bon vent, capitaine ! 🧭
