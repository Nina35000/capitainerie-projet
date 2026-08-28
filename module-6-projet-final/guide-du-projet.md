# Module 6 — Le projet final : le registre de la capitainerie

C'est le moment d'assembler. **Tu as déjà écrit 90 % du code** dans les modules
4 et 5 — il s'agit de le combiner proprement, et d'ajouter la touche qui
transforme un exercice en vraie application.

## Le cahier des charges

Te voilà capitaine de port. Ton application gère le registre des navires
à quai :

1. **liste** les navires présents (nom, type, ponton, longueur, « à quai
   depuis N jours »), dernier arrivé en premier ;
2. enregistre une **arrivée** via un formulaire d'accostage (avec
   redirection propre) ;
3. fait **lever l'ancre** à un navire qui repart (il disparaît du registre) ;
4. affiche les **chiffres du port** : navires à quai, mètres de quai occupés,
   type de navire majoritaire ;
5. permet de **filtrer** par type de navire (route `/type/:nom`) ;
6. **persiste** tout dans un fichier JSON : rien ne se perd au redémarrage.

## Conseils de méthode

- Crée un dossier `ma-capitainerie/` À CÔTÉ de ce dossier (pas dedans), avec
  `npm init -y` puis `npm install express ejs`. C'est TON premier projet
  monté de zéro — savoure.
- Travaille par étapes, dans l'ordre. **Ne passe à la suivante que quand la
  précédente fonctionne** — serveur relancé, page rechargée, zéro erreur
  dans le terminal.
- `console.log(req.body)`, `console.log(navires)` : sans modération.

---

## Étape 0 — Le squelette

Dans `ma-capitainerie/` :

- `donnees.json` : un tableau de navires pour démarrer. Le format d'un navire :

  ```json
  { "nom": "L'Hirondelle", "type": "Voilier", "ponton": "A",
    "longueur": 9, "arriveLe": "2026-07-25" }
  ```

  Invente 4 ou 5 navires, avec des types et pontons variés (sinon le filtre
  de l'étape 4 sera d'un ennui mortel) ;
- `serveur.js` : Express + EJS branchés (`view engine`, `urlencoded`),
  les deux fonctions `lireNavires` / `sauverNavires` (module 5),
  un `listen(3000)` ;
- `views/index.ejs` : un squelette HTML avec juste un `<h1>`.
- Route GET `/` qui rend `index` avec les navires.

✅ *Test : la page s'affiche, le terminal est muet comme une carpe.*

## Étape 1 — La liste, dernier arrivé en premier

Affiche les navires dans `index.ejs` : nom, type, ponton, longueur.
Pour l'ordre anti-chronologique, avant le render :

```js
const tries = [...navires].sort((a, b) => b.arriveLe.localeCompare(a.arriveLe));
```

(`localeCompare` compare des chaînes ; ça marche pour les dates au format
`"2026-07-25"` — c'est exactement pour ça qu'on a choisi ce format.
Le `[...navires]` copie le tableau avant tri, bonne hygiène.)

La cerise : affiche « à quai depuis N jours ». Deux dates se soustraient
en millisecondes, et un jour en fait 86 400 000 :

```js
function joursAQuai(arriveLe) {
  const ms = Date.now() - new Date(arriveLe).getTime();
  return Math.floor(ms / 86400000);   // 1000 × 60 × 60 × 24
}
```

Tu peux passer cette fonction au template comme n'importe quelle donnée :
`res.render("index", { joursAQuai, ... })`. Pense au cas `0` :
« arrivé aujourd'hui » est plus élégant que « à quai depuis 0 jours ».

✅ *Test : tes navires s'affichent, dernier arrivé en haut, avec des durées
de séjour plausibles.*

## Étape 2 — Le formulaire d'accostage

Comme au module 5 : formulaire POST → route `/accoster` → push → sauvegarde →
`res.redirect("/")`. Champs : nom, type, ponton, longueur. La date d'arrivée :
celle du jour, calculée serveur (`new Date().toISOString().slice(0, 10)`).

Petit raffinement pour le type et le ponton : un menu déroulant plutôt qu'un
champ libre, sinon ton port va se remplir de « voilier », « Voilier » et
« VOILIER » que le filtre prendra pour trois espèces différentes :

```html
<select name="type">
  <option>Voilier</option>
  <option>Yacht</option>
  <option>Chalutier</option>
  <option>Catamaran</option>
</select>
```

(Un `<select>` s'utilise exactement comme un `<input>` côté serveur :
son `name` arrive dans `req.body`.)

Validation côté serveur : nom non vide, longueur = nombre > 0, sinon on
redirige sans enregistrer.

✅ *Test : accostage OK, F5 après ajout NE duplique PAS, Ctrl+C + relance →
le navire est toujours à quai.*

## Étape 3 — Les chiffres du port

Au-dessus de la liste, un petit bloc de statistiques :

- navires à quai (`navires.length`) ;
- mètres de quai occupés (un `reduce` sur les longueurs — module 2) ;
- type majoritaire (celui qui compte le plus de navires — c'est le « sujet
  favori » du bonus du module 2, à un détail près : on compte les navires
  au lieu d'additionner des minutes).

Calcule tout ça **dans serveur.js** et passe les résultats au template :
le template affiche, le serveur réfléchit. C'est la bonne répartition des rôles.

✅ *Test : enregistre une arrivée → les chiffres bougent en conséquence.*

## Étape 4 — Filtrer par type

La route `/sujet/:nom` du module 4, version capitainerie :

- route `/type/:nom` qui filtre les navires, et réutilise le MÊME template ;
- dans la liste, chaque type devient un lien :
  `<a href="/type/<%= n.type %>">...</a>` ;
- sur la page filtrée, un lien « ← Tout le port » vers `/` ;
- les chiffres de l'étape 3 se recalculent sur les navires filtrés (gratuit
  si ton calcul part du tableau filtré).

✅ *Test : clic sur "Voilier" → seuls les voiliers, chiffres cohérents,
retour possible. Un type inconnu dans l'URL → page vide mais propre.*

## Étape 5 — Lever l'ancre

Le navire qui repart doit disparaître du registre. Suppression = toujours
en **POST**, jamais en GET (un robot qui suit les liens viderait ton port !) :
un mini-formulaire par ligne du registre, avec un champ caché qui identifie
le navire :

```html
<form method="POST" action="/depart">
  <input type="hidden" name="index" value="<%= n.index %>">
  <button>⚓ Lever l'ancre</button>
</form>
```

Le piège subtil : ta liste est **triée** (et parfois filtrée), donc « le
3e affiché » n'est PAS « le 3e du fichier ». La parade : juste après
`lireNavires()`, étiquette chaque navire avec sa position réelle dans le
fichier, AVANT de trier ou filtrer :

```js
const tous = lireNavires().map((n, i) => ({ ...n, index: i }));
```

(`{ ...n, index: i }` = une copie du navire + une propriété `index` en plus.)
Côté route `/depart` : vérifie que l'index est un entier valide, puis
`navires.splice(index, 1)`, sauvegarde, redirect.

✅ *Test : fais partir un navire depuis une page FILTRÉE → c'est bien LUI qui
disparaît, pas un innocent. Les chiffres du port suivent.*

## Étape 6 — Un coup de peinture

Sans y passer trois jours : une palette, une police lisible, la liste en
cartes plutôt qu'en `<ul>` brut, le ponton en badge. Le CSS vit dans une
balise `<style>` du template pour l'instant — parfaitement acceptable.

Thème imposé par le sujet : capitainerie. Bleu marine, blanc, une pointe
de rouge bouée. ⚓

✅ *Test : tu as envie de montrer la page à quelqu'un. (C'est un vrai critère.)*

## Étape 7 — À toi de jouer (bonus libres)

- Un champ `pavillon` (🇫🇷 🇬🇧 🇪🇸 🇮🇹 …) dans le formulaire et le registre.
- Un filtre par ponton (`/ponton/:nom`) — même mécanique que par type ;
  généraliser un mécanisme, c'est là qu'on voit qu'on l'a compris.
- Le taux d'occupation : décrète que ton port a 150 m de quai, et affiche
  « 87 m / 150 m occupés » (voire une petite barre de progression en CSS).
- Une page `/annuaire` qui liste les types avec leur nombre de navires,
  chaque ligne pointant vers sa page filtrée.
- Le grand pont entre les deux parcours : une route `/visite` qui sert ta
  page du projet 02 (`res.sendFile`) — ton bateau animé vient mouiller
  dans TON port. La boucle est bouclée. ⛵

---

## Et après ?

Prochaine escale du parcours (04) : remplacer le fichier JSON par une vraie
**base de données relationnelle** — même port, meilleure cale. Et côté
« learn in public » : ce projet est un excellent sujet de post.

## Bloqué ?

Le corrigé complet, abondamment commenté, est dans `../projet-final-corrige/`
(`npm install` puis `node serveur.js`). Usage recommandé : n'y jette qu'un œil
ciblé (« comment ont-ils fait l'étape 5 ? »), puis referme-le et réécris avec
tes mots.
