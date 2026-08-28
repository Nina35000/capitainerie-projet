// ============================================================
// MODULE 5 — EXERCICE 1 : formulaire + persistance
// ============================================================
// AVANT TOUT :   npm install
// Pour lancer :  node serveur.js   →  http://localhost:3000
// ============================================================

const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");

const FICHIER = "journal.json";

// --- Étape 1 : les fonctions de persistance ---
// Écris lireSessions() et sauverSessions(sessions) comme dans la
// théorie (readFileSync + JSON.parse / JSON.stringify + writeFileSync).

function lireSessions() {
    return JSON.parse(fs.readFileSync(FICHIER, "utf8"));
}

function sauverSessions(sessions) {
    fs.writeFileSync(FICHIER, JSON.stringify(sessions, null, 2));
}
// --- Étape 2 : la page d'accueil ---
// Route GET "/" : lis les sessions et rends le template "journal"
// avec { sessions: ... }. Complète views/journal.ejs (liste <ul>,
// comme au module 4 — tu sais faire).
// Teste : les 2 sessions du fichier journal.json s'affichent.

app.get("/", (req, res) => {
    const sessions = lireSessions();
    res.render("journal", { sessions: sessions });
});
app.listen(3000, () => {
    console.log("Serveur lancé sur http://localhost:3000");
});
// --- Étape 3 : le formulaire (côté template) ---
// Dans views/journal.ejs, sous la liste, ajoute le formulaire :
//   method="POST", action="/ajouter"
//   champs : sujet (required), minutes (type number, required), note
// ⚠️ Chaque champ doit avoir un attribut name !
// Teste : clique "Ajouter"… et admire l'erreur "Cannot POST /ajouter".
// C'est normal : la route n'existe pas encore. 😄

// --- Étape 4 : recevoir le POST ---
// a) Active la lecture des formulaires :
//      app.use(express.urlencoded({ extended: true }));
// b) Route app.post("/ajouter", ...) qui :
//      - construit l'objet session { date, sujet, minutes, note }
//        (date du jour : new Date().toISOString().slice(0, 10),
//         minutes : pense à Number(...) !)
//      - lireSessions(), push, sauverSessions(...)
//      - termine par res.redirect("/")
// Teste : ajoute une session → elle apparaît dans la liste.
// Ouvre journal.json dans VS Code : elle y est aussi !

// ... ton code ici ...

// --- Étape 5 : l'épreuve du feu ---
// Ajoute une session, arrête le serveur (Ctrl+C), relance-le,
// recharge la page. La session est toujours là ?
// 🏆 Félicitations : tes données sont persistantes.
// (Compare avec le compteur de visites du module 3…)

// --- Étape 6 (bonus) : validation ---
// Dans la route POST, si req.body.sujet est vide ou si les minutes
// ne sont pas un nombre > 0, redirige vers "/" SANS enregistrer.
// (Le `required` du HTML protège déjà, mais côté serveur on ne
//  fait JAMAIS confiance à ce qui arrive du navigateur.)

// N'oublie pas le listen !
// ... ton code ici ...
