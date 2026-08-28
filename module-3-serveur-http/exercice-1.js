// ============================================================
// MODULE 3 — EXERCICE 1 : ton premier serveur
// ============================================================
// Pour tester :  node exercice-1.js
// puis ouvre http://localhost:3000 dans ton navigateur.
// ⚠️ Après CHAQUE modification : Ctrl+C puis relance node.
// ============================================================
const http = require("http");
let visites = 0;
const sessions = [
    { sujet: "JavaScript", minutes: 90 },
    { sujet: "CSS", minutes: 45 },
    { sujet: "Node", minutes: 60 },
];
// --- Étape 1 : le serveur s'allume ---
// Crée un serveur (http.createServer) qui répond à toute requête :
//   <h1>Le port est ouvert !</h1>
// N'oublie pas :
//   - le setHeader("Content-Type", "text/html; charset=utf-8")
//   - serveur.listen(3000) et un console.log avec l'adresse.
// Teste dans le navigateur avant de passer à la suite.

// --- Étape 2 : deux pages ---
// Avec requete.url, sers deux pages différentes :
//   "/"        → <h1>Journal de bord</h1>
//   "/apropos" → <h1>À propos</h1><p>(présente-toi en une phrase !)</p>
// Teste les deux adresses dans le navigateur.

const serveur = http.createServer((requete, reponse) => {
    reponse.setHeader("Content-Type", "text/html; charset=utf-8");

    if (requete.url === "/") {
        visites++;
        const items = sessions
            .map(
                (session) =>
                    `<li>${session.sujet} — ${session.minutes} min</li>`,
            )
            .join("");
        const heure = new Date().toLocaleTimeString("fr-FR");
        reponse.end(
            `<h1>Journal de bord</h1><ul>${items}</ul><p>Page générée à ${heure}</p><p>Visites : ${visites}</p>`,
        );
    } else if (requete.url === "/apropos") {
        reponse.end(
            "<h1>À propos</h1><p>Je suis Nina, web designer freelance spécialisée en WordPress et Divi !</p>",
        );
    } else {
        reponse.statusCode = 404;
        reponse.end("<h1>404 — Page introuvable</h1>");
    }
});

serveur.listen(3000);
console.log("Serveur lancé sur http://localhost:3000");

// --- Étape 3 : la page 404 ---
// Pour toute autre adresse (essaie /tresor), réponds avec
// statusCode = 404 et un message de ton cru.

// (modifie ton code)

// --- Étape 4 : des données dans la page ---
// En haut du fichier, déclare :
//   const sessions = [
//     { sujet: "JavaScript", minutes: 90 },
//     { sujet: "CSS",        minutes: 45 },
//     { sujet: "Node",       minutes: 60 },
//   ];
// Sur la page "/", affiche une liste <ul> avec un <li> par session :
//   "JavaScript — 90 min"
// Astuce : sessions.map(...).join("") dans une template string.

// (modifie ton code)

// --- Étape 5 : une donnée qui bouge ---
// Toujours sur "/", ajoute sous la liste :
//   <p>Page générée à 14:32:05</p>
// avec new Date().toLocaleTimeString("fr-FR").
// Recharge plusieurs fois : l'heure change à chaque requête.
// 👉 C'est la preuve que le HTML est fabriqué par TON serveur,
//    à la demande. Le rendu côté serveur, c'est ça !

// --- Étape 6 (bonus) : le compteur de visites ---
// Déclare let visites = 0; en haut du fichier, incrémente-le à
// chaque requête sur "/" et affiche-le dans la page.
// Question à méditer : que devient le compteur quand tu
// redémarres le serveur ? (Réponse au module 5. 😉)
