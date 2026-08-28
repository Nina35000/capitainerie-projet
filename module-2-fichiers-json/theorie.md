# Module 2 — Fichiers, JSON et méthodes de tableaux

Un serveur, ça sert des **données**. Dans ce module, tu apprends à les stocker
dans un fichier, à les relire, et à les manipuler élégamment.

## Lire et écrire des fichiers

Node fournit un module intégré, `fs` (*file system*), qu'on importe avec `require` :

```js
const fs = require("fs");

// Lire un fichier texte :
const contenu = fs.readFileSync("notes.txt", "utf8");
console.log(contenu);

// Écrire (crée ou ÉCRASE le fichier) :
fs.writeFileSync("notes.txt", "Première ligne\n");
```

⚠️ Le `"utf8"` est important à la lecture : sans lui, tu reçois des octets bruts.

💡 `require(...)` est la façon dont Node importe des modules — les modules intégrés
comme `fs`, et bientôt ceux que tu installeras avec npm (module 4).

## JSON : stocker des objets dans un fichier

Un fichier ne contient que du texte. Comment y ranger un tableau d'objets ?
Avec **JSON** (*JavaScript Object Notation*), un format texte qui ressemble
énormément à tes objets JS :

```json
[
  { "date": "2026-08-01", "sujet": "JavaScript", "minutes": 90 },
  { "date": "2026-08-02", "sujet": "CSS", "minutes": 45 }
]
```

Deux fonctions font la conversion dans les deux sens :

```js
const texte = fs.readFileSync("journal.json", "utf8");
const sessions = JSON.parse(texte);        // texte  →  tableau/objet JS
console.log(sessions[0].sujet);            // "JavaScript"

sessions.push({ date: "2026-08-03", sujet: "Node", minutes: 60 });
fs.writeFileSync("journal.json", JSON.stringify(sessions, null, 2));
                                           // JS  →  texte (indenté de 2 espaces)
```

Lire → parser → modifier → stringifier → écrire : c'est LE cycle de vie des
données de ton projet final.

## Les méthodes de tableaux : tes nouveaux super-pouvoirs

Au parcours 02, tu parcourais les tableaux avec `for`. Ça marche toujours, mais
JavaScript offre des méthodes plus expressives — omniprésentes dans le code
professionnel :

```js
const sessions = [
  { sujet: "JavaScript", minutes: 90 },
  { sujet: "CSS",        minutes: 45 },
  { sujet: "JavaScript", minutes: 60 },
];

// map : transformer chaque élément → nouveau tableau
const sujets = sessions.map(s => s.sujet);
// ["JavaScript", "CSS", "JavaScript"]

// filter : ne garder que certains éléments
const longues = sessions.filter(s => s.minutes >= 60);
// [{JavaScript, 90}, {JavaScript, 60}]

// find : le PREMIER élément qui correspond (ou undefined)
const uneCss = sessions.find(s => s.sujet === "CSS");

// reduce : accumuler en une seule valeur (ici : la somme)
const total = sessions.reduce((somme, s) => somme + s.minutes, 0);
// 195
```

La notation `s => s.sujet` est une **fonction fléchée** : une mini-fonction
anonyme. `s => s.minutes >= 60` équivaut à
`function (s) { return s.minutes >= 60; }` — en plus court.

Et pour fabriquer du texte à partir d'un tableau, `join` :

```js
console.log(sujets.join(", "));   // "JavaScript, CSS, JavaScript"
```

Garde `map` et `join` en tête : au module 4, c'est exactement comme ça qu'on
fabriquera du HTML à partir des données. 👀

---

➡️ Passe à `exercice-1.js` (le fichier `journal.json` fourni est ton jeu de données).
