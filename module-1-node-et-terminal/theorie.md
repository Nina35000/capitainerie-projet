# Module 1 — Node.js et le terminal

## C'est quoi, Node.js ?

Jusqu'ici, ton JavaScript tournait dans le navigateur, déclenché par une page HTML.
**Node.js**, c'est le même langage JavaScript, mais qui s'exécute **directement sur
ta machine**, sans navigateur ni HTML. C'est avec ça qu'on écrit des serveurs web,
des outils en ligne de commande, des scripts…

Concrètement : un fichier `.js`, un terminal, et c'est parti.

## Exécuter un fichier

Crée un fichier `test.js` contenant :

```js
console.log("Bonjour depuis Node !");
```

Puis, dans un terminal ouvert dans le même dossier :

```
node test.js
```

Le texte s'affiche **dans le terminal**. C'est ta nouvelle console F12.

💡 Dans VS Code : *Terminal → Nouveau terminal* ouvre un terminal déjà placé
dans le dossier de ton projet. C'est le réflexe à prendre.

## Ce qui existe… et ce qui n'existe plus

Tout le langage que tu connais fonctionne à l'identique : variables, `const`/`let`,
fonctions, conditions, boucles, tableaux, objets, template strings…

En revanche, tout ce qui appartenait **au navigateur** n'existe pas dans Node :

```js
console.log(typeof document);   // "undefined" — pas de page !
console.log(typeof window);     // "undefined"
// document.querySelector(...)  // ❌ ReferenceError
```

Pas de DOM, pas d'événements souris, pas de `requestAnimationFrame`. Logique :
il n'y a pas d'écran de page web. À la place, Node sait faire des choses que le
navigateur t'interdisait : lire des fichiers sur le disque (module 2), ouvrir un
serveur web (module 3)…

## Le terminal te parle, tu lui réponds

Un programme Node peut recevoir des **arguments** tapés à la suite de la commande :

```
node salut.js Nina
```

Dans le code, ils arrivent dans le tableau `process.argv` :

```js
// process.argv[0] = chemin de node        (on s'en fiche)
// process.argv[1] = chemin du fichier .js (on s'en fiche)
// process.argv[2] = premier VRAI argument
const prenom = process.argv[2];
console.log(`Salut, ${prenom} !`);
```

Les arguments arrivent toujours en **chaînes de caractères**. Pour un nombre :
`Number(process.argv[2])`.

## Arrêter un programme qui tourne

La plupart des scripts se terminent tout seuls. Mais certains programmes tournent
en continu (les serveurs, à partir du module 3). Pour les arrêter : **`Ctrl + C`**
dans le terminal. Retiens-le, tu vas t'en servir cent fois.

---

➡️ Passe à `exercice-1.js`.
