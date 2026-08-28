// ============================================================
// MODULE 4 — EXERCICE 1 : Express et EJS
// ============================================================
// AVANT TOUT, dans ce dossier :   npm install
// Pour lancer :                   node serveur.js
// Pour arrêter / relancer :       Ctrl+C puis relance
// ============================================================

const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Les données du jour (en dur pour l'instant — fichier JSON au module 5) :
const sessions = [
    { date: "2026-07-30", sujet: "JavaScript", minutes: 120 },
    { date: "2026-07-31", sujet: "SVG", minutes: 30 },
    { date: "2026-08-01", sujet: "JavaScript", minutes: 75 },
    { date: "2026-08-02", sujet: "Node", minutes: 60 },
];

// --- Étape 1 : Express répond ---
// Déclare une route GET "/" qui fait pour l'instant :
//   res.send("<h1>Express est à la barre !</h1>")
// puis app.listen(3000) avec un console.log de l'adresse.
// Teste dans le navigateur.

app.get("/", (req, res) => {
    const total = sessions.reduce((acc, s) => acc + s.minutes, 0);
    res.render("journal", {
        titre: "Journal de bord",
        sessions: sessions,
        total: total,
    });
});

app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});

// --- Étape 2 : brancher EJS ---
// Active le moteur de templates :  app.set("view engine", "ejs");
// Remplace le res.send de la route "/" par :
//   res.render("journal", { titre: "Journal de bord", sessions: sessions });
// Puis ouvre views/journal.ejs et suis les consignes qui s'y trouvent.
// (Relance le serveur… mais les modifications d'un .ejs, elles,
//  sont prises en compte au simple rechargement de la page. 🎁)

// ... ton code ici ...

// --- Étape 3 : dans le template ---
// → tout se passe dans views/journal.ejs (étapes 3a, 3b, 3c là-bas)

// --- Étape 4 : une route à paramètre ---
// Déclare la route GET "/sujet/:nom" qui :
//   - filtre les sessions dont s.sujet === req.params.nom  (.filter !)
//   - rend le MÊME template "journal" avec :
//       titre: "Sessions de <nom>"  et  sessions: (le tableau filtré)
// Teste : /sujet/JavaScript (2 sessions), /sujet/Node (1),
//         /sujet/Piratage (0 — ta page doit rester correcte, voir 3c).

app.get("/sujet/:nom", (req, res) => {
    const sessionsFiltrees = sessions.filter((s) => s.sujet === req.params.nom);
    const total = sessionsFiltrees.reduce((acc, s) => acc + s.minutes, 0);
    res.render("journal", {
        titre: `Sessions de ${req.params.nom}`,
        sessions: sessionsFiltrees,
        total: total,
    });
});
// --- Étape 5 (bonus) : le total au passage ---
// Passe aussi au template le total des minutes (reduce du module 2)
// et affiche-le dans journal.ejs : "Total : 285 minutes".
// Attention : le total doit être celui des sessions AFFICHÉES
// (donc filtré aussi sur /sujet/:nom).
