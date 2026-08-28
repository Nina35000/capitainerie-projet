# Module 4 — Express et les templates EJS

Au module 3, tu as tout fait à la main : les routes au `if/else`, le HTML dans
des chaînes de caractères… Ça marche, mais ça devient vite illisible. Les
développeurs utilisent des bibliothèques qui font le sale boulot. La plus
classique côté Node s'appelle **Express**.

## npm : installer des bibliothèques

C'est ta première installation de dépendances — moment historique. 🎓
Dans le terminal, **dans le dossier de l'exercice** :

```
npm install express ejs
```

Ce que ça fait :

- télécharge Express et EJS dans un dossier `node_modules/` (ne l'ouvre pas,
  n'y touche pas, ne le lis pas — c'est la soute) ;
- note ces dépendances dans `package.json`, la fiche d'identité du projet.

💡 `package.json` se crée avec `npm init -y` — dans les exercices il est déjà
fourni, donc un simple `npm install` (sans rien derrière) suffit pour installer
ce qui est listé dedans. C'est comme ça qu'on récupère n'importe quel projet
Node : cloner, `npm install`, lancer.

npm install doit être lancé dans le même dossier que package.json
Il faut donc se positionner a coup de cd. Très souven quand le npm install échoue c'est que tu n'est pas au bon endroit.

## Express : les routes deviennent lisibles

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Accueil</h1>");
});

app.get("/apropos", (req, res) => {
  res.send("<h1>À propos</h1>");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
```

Une route = un appel à `app.get(chemin, fonction)`. Fini le grand `if/else`,
et le 404 est même géré tout seul. `res.send` remplace le duo
`setHeader` + `end` (charset compris).

### Les routes à paramètre

```js
app.get("/sujet/:nom", (req, res) => {
  res.send(`<h1>Sessions de ${req.params.nom}</h1>`);
});
```

Visite `/sujet/JavaScript` : `req.params.nom` vaut `"JavaScript"`. Une seule
route sert une infinité de pages — c'est comme ça que les vrais sites font
leurs pages produit, profil, article…

## EJS : le HTML sort du JavaScript

Deuxième problème du module 3 : le HTML entassé dans des template strings.
Un **moteur de templates** permet d'écrire le HTML dans son propre fichier,
avec des trous pour les données. EJS (*Embedded JavaScript*) :

```js
app.set("view engine", "ejs");   // une fois, au démarrage

app.get("/", (req, res) => {
  const sessions = [
    { sujet: "JavaScript", minutes: 90 },
    { sujet: "CSS", minutes: 45 },
  ];
  res.render("journal", { titre: "Journal de bord", sessions: sessions });
});
```

`res.render("journal", {...})` va chercher le fichier **`views/journal.ejs`**
(le dossier s'appelle obligatoirement `views/`) et lui transmet les données.
Le template :

```html
<h1><%= titre %></h1>

<ul>
  <% for (const s of sessions) { %>
    <li><%= s.sujet %> — <%= s.minutes %> min</li>
  <% } %>
</ul>

<% if (sessions.length === 0) { %>
  <p>Aucune session pour l'instant. Au boulot !</p>
<% } %>
```

Deux balises à connaître, et c'est tout :

- `<%= expression %>` → **affiche** la valeur (en neutralisant les caractères
  spéciaux — sécurité gratuite) ;
- `<% code %>` → **exécute** du JS sans rien afficher : tes `for`, tes `if`…
  avec la syntaxe que tu connais déjà.

Le `.ejs` n'est donc qu'un fichier HTML saupoudré de JavaScript. Tu sais déjà
écrire les deux. 💪

---

➡️ Passe au dossier `exercice-1/` : lis son `consignes` en tête de `serveur.js`,
et n'oublie pas le `npm install` avant de démarrer !
