// ============================================================
// SOLUTION — Module 4, Exercice 1 : Express et EJS
// ============================================================
// npm install   puis   node serveur.js   →  http://localhost:3000

const express = require("express");
const app = express();

// Étape 2 : brancher EJS
app.set("view engine", "ejs");

const sessions = [
  { date: "2026-07-30", sujet: "JavaScript", minutes: 120 },
  { date: "2026-07-31", sujet: "SVG",        minutes: 30 },
  { date: "2026-08-01", sujet: "JavaScript", minutes: 75 },
  { date: "2026-08-02", sujet: "Node",       minutes: 60 },
];

// Étape 5 (bonus) : le total — une petite fonction, car on en a
// besoin sur les deux routes.
function totalMinutes(liste) {
  return liste.reduce((somme, s) => somme + s.minutes, 0);
}

// Étapes 1-2 : la page d'accueil
app.get("/", (req, res) => {
  res.render("journal", {
    titre: "Journal de bord",
    sessions: sessions,
    total: totalMinutes(sessions),
  });
});

// Étape 4 : la route à paramètre — même template, données filtrées
app.get("/sujet/:nom", (req, res) => {
  const filtrees = sessions.filter(s => s.sujet === req.params.nom);
  res.render("journal", {
    titre: `Sessions de ${req.params.nom}`,
    sessions: filtrees,
    total: totalMinutes(filtrees),   // le total des sessions AFFICHÉES
  });
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000 (Ctrl+C pour arrêter)");
});
