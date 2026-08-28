# Module 3 — Ton premier serveur HTTP

## Comment marche le web (en 20 secondes)

Quand tu tapes une adresse dans ton navigateur :

1. le navigateur envoie une **requête** à un serveur (« donne-moi la page `/` ») ;
2. le serveur fabrique une **réponse** (souvent du HTML) et la renvoie ;
3. le navigateur affiche ce HTML.

Jusqu'ici tu ne voyais que l'étape 3. Aujourd'hui, tu écris l'étape 2. 🎉

## Le serveur minimal

```js
const http = require("http");

const serveur = http.createServer((requete, reponse) => {
  reponse.setHeader("Content-Type", "text/html; charset=utf-8");
  reponse.end("<h1>Bienvenue à bord !</h1>");
});

serveur.listen(3000);
console.log("Serveur lancé sur http://localhost:3000");
```

Lance `node serveur.js`, puis ouvre **http://localhost:3000** dans ton navigateur.
Ton code Node vient de servir une page web. 🤝

Décortiquons :

- `http.createServer(...)` reçoit une **fonction** appelée à CHAQUE requête —
  exactement comme tes écouteurs d'événements du module 5 du parcours 02 :
  « quand un visiteur arrive, exécute ceci ». Même logique, nouveau monde.
- `requete` contient ce que demande le visiteur (notamment `requete.url`).
- `reponse.end(...)` envoie la réponse et clôt l'échange.
- `Content-Type: text/html; charset=utf-8` dit au navigateur : « c'est du HTML,
  avec des accents » — sans ça, tes é, à, ç s'affichent en hiéroglyphes.
- `localhost` = « ma propre machine », et `3000` est le **port** — la porte
  d'entrée numérotée sur laquelle ton serveur écoute.

⚠️ Rappels de survie : le serveur tourne jusqu'à `Ctrl + C`, et il faut le
**relancer après chaque modification** du code. Si tu vois
`EADDRINUSE`, c'est qu'un ancien serveur tourne encore sur le port — retrouve
son terminal et arrête-le.

## Plusieurs pages : router avec requete.url

```js
const serveur = http.createServer((requete, reponse) => {
  reponse.setHeader("Content-Type", "text/html; charset=utf-8");

  if (requete.url === "/") {
    reponse.end("<h1>Accueil</h1>");
  } else if (requete.url === "/apropos") {
    reponse.end("<h1>À propos</h1>");
  } else {
    reponse.statusCode = 404;
    reponse.end("<h1>404 — Terre inconnue</h1>");
  }
});
```

Le `404` est le fameux code « page non trouvée » — un code de statut que le
serveur choisit. (200 = OK, il est envoyé par défaut.)

## Du HTML avec des données dedans

La réponse est une simple chaîne de caractères… donc les template strings
font tout le travail, y compris sur plusieurs lignes :

```js
const capitaine = "Nina";
const page = `
  <!DOCTYPE html>
  <html lang="fr">
    <body>
      <h1>Journal de bord de ${capitaine}</h1>
      <p>Nous sommes le ${new Date().toLocaleDateString("fr-FR")}.</p>
    </body>
  </html>
`;
reponse.end(page);
```

Recharge la page : la date est calculée **à chaque requête**. C'est ça, le rendu
côté serveur : le HTML est fabriqué à la demande, avec des données fraîches.

Et pour insérer un tableau ? `map` + `join`, comme promis au module 2 :

```js
const sujets = ["JavaScript", "CSS", "Node"];
const items = sujets.map(s => `<li>${s}</li>`).join("");
reponse.end(`<ul>${items}</ul>`);
```

---

➡️ Passe à `exercice-1.js`.
