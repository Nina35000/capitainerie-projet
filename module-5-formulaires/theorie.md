# Module 5 — Formulaires et persistance

Ton serveur sait afficher des données. Il est temps qu'il sache en **recevoir** :
c'est le rôle des formulaires. Et pour qu'elles survivent au redémarrage
(souviens-toi du compteur de visites du module 3…), on les écrira dans un
fichier JSON — retrouvailles avec le module 2.

## GET et POST : demander vs déposer

Jusqu'ici, toutes tes routes étaient des `app.get` : le navigateur **demande**
une page. Pour **envoyer** des données (un formulaire), la convention du web
est la méthode **POST**.

Côté HTML, dans ton template :

```html
<form method="POST" action="/ajouter">
  <label>Sujet : <input name="sujet" required></label>
  <label>Minutes : <input name="minutes" type="number" required></label>
  <label>Note : <input name="note"></label>
  <button type="submit">Ajouter</button>
</form>
```

Deux attributs décident de tout :

- `method="POST" action="/ajouter"` : à l'envoi, le navigateur fait une
  requête POST vers `/ajouter` ;
- le **`name`** de chaque champ : c'est la clé sous laquelle la valeur
  arrivera au serveur. Pas de `name`, pas de donnée !

## Recevoir le formulaire côté serveur

```js
// Une fois au démarrage : apprend à Express à lire les formulaires
app.use(express.urlencoded({ extended: true }));

app.post("/ajouter", (req, res) => {
  console.log(req.body);
  // → { sujet: "Node", minutes: "60", note: "..." }

  const nouvelle = {
    date: new Date().toISOString().slice(0, 10),   // "2026-08-02"
    sujet: req.body.sujet,
    minutes: Number(req.body.minutes),   // ⚠️ tout arrive en chaînes !
    note: req.body.note,
  };
  // ... l'ajouter aux données ...

  res.redirect("/");
});
```

Trois pièges classiques, autant les connaître tout de suite :

1. **`app.use(express.urlencoded(...))`** oublié → `req.body` est vide/undefined.
2. Les valeurs arrivent **toutes en chaînes** → `Number(...)` pour les nombres
   (ton réflexe `process.argv` du module 1).
3. La fin de la route : **`res.redirect("/")`** plutôt qu'un `res.render`.

## Pourquoi rediriger ? (le motif POST → redirect → GET)

Si tu affiches directement une page en réponse au POST, l'utilisateur qui
recharge la page (F5) **renvoie le formulaire** — et ta session s'ajoute en
double. En redirigeant vers `/`, le navigateur refait une requête GET toute
propre : F5 ne fait plus que recharger la liste. C'est le réflexe standard de
tout formulaire réussi : *POST, puis redirect, puis GET*.

## La persistance : le disque a de la mémoire

Les tableaux en mémoire meurent avec le serveur. Le remède, tu le connais
depuis le module 2 — deux petites fonctions et l'affaire est réglée :

```js
const fs = require("fs");
const FICHIER = "journal.json";

function lireSessions() {
  return JSON.parse(fs.readFileSync(FICHIER, "utf8"));
}

function sauverSessions(sessions) {
  fs.writeFileSync(FICHIER, JSON.stringify(sessions, null, 2));
}
```

Dans les routes : `lireSessions()` au début, `sauverSessions(...)` après une
modification. Le serveur peut planter, redémarrer, ta machine peut rebooter :
les données sont sur le disque.

---

➡️ Passe au dossier `exercice-1/` (npm install, puis suis les consignes de
`serveur.js`). À la fin de ce module, tu as TOUTES les pièces du projet final.
