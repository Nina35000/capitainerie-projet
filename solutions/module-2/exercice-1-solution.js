// ============================================================
// SOLUTION — Module 2, Exercice 1 : fichiers, JSON, tableaux
// ============================================================
// Test :  node exercice-1-solution.js
// (une copie de journal.json est fournie dans ce dossier)

const fs = require("fs");

// --- Étape 1 : lire le journal ---
const texte = fs.readFileSync("journal.json", "utf8");
const sessions = JSON.parse(texte);
console.log(`${sessions.length} sessions dans le journal.`);

// --- Étape 2 : la liste des sujets ---
const sujets = sessions.map(s => s.sujet);
console.log("Sujets :", sujets.join(", "));

// --- Étape 3 : les grosses sessions ---
const longues = sessions.filter(s => s.minutes >= 60);
console.log(`${longues.length} sessions d'au moins 1 h :`);
console.log(longues.map(s => `  ${s.date} — ${s.sujet} (${s.minutes} min)`).join("\n"));

// --- Étape 4 : le temps total ---
const total = sessions.reduce((somme, s) => somme + s.minutes, 0);
console.log(`Temps total : ${total} minutes`);

// --- Étape 5 : ajouter une session ---
sessions.push({
  date: "2026-08-02",
  sujet: "Node",
  minutes: 60,
  note: "Premier script !",
});
fs.writeFileSync("journal.json", JSON.stringify(sessions, null, 2));
console.log("Session ajoutée — relance le script et observe l'étape 1 !");

// --- Étape 6 (bonus) : le sujet favori ---
// On cumule les minutes par sujet dans un objet { JavaScript: 285, ... } :
const parSujet = {};
for (const s of sessions) {
  // (parSujet[s.sujet] || 0) → 0 si le sujet n'existe pas encore
  parSujet[s.sujet] = (parSujet[s.sujet] || 0) + s.minutes;
}
// Puis on cherche la plus grande valeur :
let favori = null;
for (const sujet in parSujet) {
  if (favori === null || parSujet[sujet] > parSujet[favori]) {
    favori = sujet;
  }
}
console.log(`Sujet favori : ${favori} (${parSujet[favori]} min)`);
