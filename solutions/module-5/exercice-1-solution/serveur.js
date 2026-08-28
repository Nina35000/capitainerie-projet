// ============================================================
// SOLUTION — Module 5, Exercice 1 : formulaire + persistance
// ============================================================
// npm install   puis   node serveur.js   →  http://localhost:3000

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

// Étape 4a : sans cette ligne, req.body reste vide !
app.use(express.urlencoded({ extended: true }));

// path.join(__dirname, ...) = "à côté de ce fichier", même si on
// lance node depuis un autre dossier.
const FICHIER = path.join(__dirname, "journal.json");

// --- Étape 1 : les fonctions de persistance ---
function lireSessions() {
  return JSON.parse(fs.readFileSync(FICHIER, "utf8"));
}

function sauverSessions(sessions) {
  fs.writeFileSync(FICHIER, JSON.stringify(sessions, null, 2));
}

// --- Étape 2 : la page d'accueil ---
app.get("/", (req, res) => {
  res.render("journal", { sessions: lireSessions() });
});

// --- Étape 4b : recevoir le POST ---
app.post("/ajouter", (req, res) => {
  const sujet = (req.body.sujet || "").trim();
  const minutes = Number(req.body.minutes);   // tout arrive en chaînes !

  // Étape 6 (bonus) : validation côté serveur — on ne fait jamais
  // confiance au navigateur. !(minutes > 0) attrape aussi NaN.
  if (sujet === "" || !(minutes > 0)) {
    return res.redirect("/");
  }

  const sessions = lireSessions();
  sessions.push({
    date: new Date().toISOString().slice(0, 10),   // "2026-08-02"
    sujet: sujet,
    minutes: minutes,
    note: req.body.note || "",
  });
  sauverSessions(sessions);

  // POST → redirect → GET : F5 ne renverra pas le formulaire.
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000 (Ctrl+C pour arrêter)");
});
