// ============================================================
// MODULE 2 — EXERCICE 1 : fichiers, JSON, méthodes de tableaux
// ============================================================
// Pour tester :  node exercice-1.js
// Le fichier journal.json (dans ce dossier) est ton jeu de données.
// ============================================================

const fs = require("fs");

// --- Étape 1 : lire le journal ---
// Lis journal.json avec fs.readFileSync (n'oublie pas "utf8"),
// convertis-le en tableau avec JSON.parse dans une variable `sessions`,
// puis affiche le nombre de sessions :
//   "5 sessions dans le journal."

const contenu = fs.readFileSync("journal.json", "utf8");
const sessions = JSON.parse(contenu);
console.log(`${sessions.length} sessions dans le journal.`);

// --- Étape 2 : la liste des sujets ---
// Avec .map, fabrique le tableau des sujets, puis affiche-le
// en une seule ligne avec .join :
//   "Sujets : JavaScript, CSS, JavaScript, SVG, JavaScript"

const sujets = sessions.map((session) => session.sujet);
console.log(`Sujets : ${sujets.join(", ")}`);

// --- Étape 3 : les grosses sessions ---
// Avec .filter, récupère les sessions d'au moins 60 minutes.
// Affiche leur nombre, puis chacune sous la forme :
//   "2026-07-28 — JavaScript (90 min)"
// (un .map + .join, ou une boucle for...of, au choix)

const grossesSessions = sessions.filter((session) => session.minutes >= 60);
console.log(`${grossesSessions.length} grosses sessions :`);

const lignes = grossesSessions.map(
    (session) => `${session.date} — ${session.sujet} (${session.minutes} min)`,
);
console.log(lignes.join("\n"));

// --- Étape 4 : le temps total ---
// Avec .reduce, calcule le total de minutes de TOUTES les sessions.
// Affiche : "Temps total : 360 minutes"
// (Vérifie le compte à la main la première fois !)

const totalMinutes = sessions.reduce(
    (total, session) => total + session.minutes,
    0,
);
console.log(`Temps total : ${totalMinutes} minutes`);

// --- Étape 5 : ajouter une session ---
// Ajoute (push) une nouvelle session d'aujourd'hui :
//   { date: "2026-08-02", sujet: "Node", minutes: 60, note: "Premier script !" }
// puis réécris le fichier avec JSON.stringify(sessions, null, 2).
// Relance le script : le compte de l'étape 1 doit avoir augmenté !
// ⚠️ Chaque exécution ajoute une ligne de plus — c'est normal.
//    (Tu peux nettoyer journal.json à la main si ça déborde.)

sessions.push({
    date: "2026-08-02",
    sujet: "Node",
    minutes: 60,
    note: "Premier script !",
});

fs.writeFileSync("journal.json", JSON.stringify(sessions, null, 2));

// --- Étape 6 (bonus) : le sujet favori ---
// Trouve le sujet qui cumule le plus de minutes.
// Piste : construis un objet { JavaScript: 285, CSS: 45, ... }
// avec une boucle, puis cherche la plus grande valeur.
// Affiche : "Sujet favori : JavaScript (285 min)"

const minutesParSujet = {};

for (const session of sessions) {
    if (minutesParSujet[session.sujet] === undefined) {
        minutesParSujet[session.sujet] = 0;
    }
    minutesParSujet[session.sujet] += session.minutes;
}

let sujetFavori = null;
let maxMinutes = 0;

for (const sujet in minutesParSujet) {
    if (minutesParSujet[sujet] > maxMinutes) {
        sujetFavori = sujet;
        maxMinutes = minutesParSujet[sujet];
    }
}

console.log(`Sujet favori : ${sujetFavori} (${maxMinutes} min)`);
