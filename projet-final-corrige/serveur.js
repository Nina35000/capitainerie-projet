// ============================================================
// PROJET FINAL — CORRIGÉ : le registre de la capitainerie
// ============================================================
// npm install   puis   node serveur.js   →  http://localhost:3000
//
// Étapes du guide couvertes : 0 à 5 + deux bonus de l'étape 7
// (pavillon, taux d'occupation). Le CSS (étape 6) est dans
// views/index.ejs.
// ============================================================

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
// Bonus : la capacité totale du port, pour le taux d'occupation.
const CAPACITE_QUAI = 150;   // en mètres

// path.join(__dirname, ...) = "à côté de ce fichier serveur.js",
// même si on lance node depuis un autre dossier. Bonne habitude.
const FICHIER = path.join(__dirname, "donnees.json");

// ------------------------------------------------------------
// Persistance (module 5) : le cycle lire → modifier → sauver
// ------------------------------------------------------------

function lireNavires() {
  return JSON.parse(fs.readFileSync(FICHIER, "utf8"));
}

function sauverNavires(navires) {
  fs.writeFileSync(FICHIER, JSON.stringify(navires, null, 2));
}

// ------------------------------------------------------------
// Petits outils
// ------------------------------------------------------------

// Étape 1 : depuis combien de jours ce navire est-il à quai ?
// Deux dates se soustraient en millisecondes ; un jour = 86 400 000 ms.
function joursAQuai(arriveLe) {
  const ms = Date.now() - new Date(arriveLe).getTime();
  return Math.max(0, Math.floor(ms / 86400000));
}

// Étape 3 : les chiffres du port, pour un tableau de navires donné.
// Tout est calculé ICI, côté serveur — le template ne fait qu'afficher.
function calculerStats(navires) {
  const metres = navires.reduce((somme, n) => somme + n.longueur, 0);

  // Le type majoritaire : on COMPTE les navires par type...
  const parType = {};
  for (const n of navires) {
    parType[n.type] = (parType[n.type] || 0) + 1;
  }
  // ... puis on cherche le plus représenté.
  let majoritaire = null;
  for (const type in parType) {
    if (majoritaire === null || parType[type] > parType[majoritaire]) {
      majoritaire = type;
    }
  }

  return { nombre: navires.length, metres, majoritaire };
}

// Le rendu commun aux routes "/" et "/type/:nom" : une seule
// fonction, un seul template — pas de copier-coller.
function rendreRegistre(res, titre, filtreType) {
  // Étape 5 : on étiquette chaque navire avec sa position réelle
  // DANS LE FICHIER (n.index) AVANT de trier ou filtrer — c'est elle
  // qui permettra au bouton "Lever l'ancre" de viser juste.
  // ({ ...n, index: i } = copie de l'objet n + une propriété en plus.)
  const tous = lireNavires().map((n, i) => ({ ...n, index: i }));

  const visibles = filtreType
    ? tous.filter(n => n.type === filtreType)
    : tous;

  // Étape 1 : dernier arrivé en premier. On COPIE ([...]) avant de
  // trier pour ne pas modifier le tableau d'origine.
  const tries = [...visibles].sort((a, b) => b.arriveLe.localeCompare(a.arriveLe));

  res.render("index", {
    titre,
    filtreType,                 // null, ou le type filtré
    navires: tries,
    stats: calculerStats(visibles),
    capacite: CAPACITE_QUAI,    // bonus : taux d'occupation
    joursAQuai,                 // une fonction se passe comme une donnée !
  });
}

// ------------------------------------------------------------
// Les routes
// ------------------------------------------------------------

// Étapes 0-1-3 : le registre complet
app.get("/", (req, res) => {
  rendreRegistre(res, "Registre de la capitainerie", null);
});

// Étape 4 : le filtre par type — même template, données filtrées
app.get("/type/:nom", (req, res) => {
  rendreRegistre(res, `Navires de type « ${req.params.nom} »`, req.params.nom);
});

// Étape 2 : l'accostage
app.post("/accoster", (req, res) => {
  const nom = (req.body.nom || "").trim();
  const longueur = Number(req.body.longueur);   // tout arrive en chaînes !

  // Validation serveur : on ne fait JAMAIS confiance au navigateur.
  if (nom === "" || !(longueur > 0)) {
    return res.redirect("/");   // le return évite d'exécuter la suite
  }

  const navires = lireNavires();
  navires.push({
    nom,
    type: req.body.type || "Voilier",
    ponton: req.body.ponton || "A",
    longueur,
    arriveLe: new Date().toISOString().slice(0, 10),   // "2026-08-02"
    pavillon: req.body.pavillon || "",                 // bonus étape 7
  });
  sauverNavires(navires);

  // POST → redirect → GET : F5 ne créera pas de doublon.
  res.redirect("/");
});

// Étape 5 : lever l'ancre.
// En POST (jamais en GET !), le navire est identifié par sa position
// dans le FICHIER (le champ caché "index" du mini-formulaire).
app.post("/depart", (req, res) => {
  const index = Number(req.body.index);
  const navires = lireNavires();

  if (Number.isInteger(index) && index >= 0 && index < navires.length) {
    navires.splice(index, 1);   // retire 1 élément à cette position
    sauverNavires(navires);
  }
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`⚓ Capitainerie ouverte sur http://localhost:${PORT}`);
});
