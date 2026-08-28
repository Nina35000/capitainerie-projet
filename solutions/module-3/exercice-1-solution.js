// ============================================================
// SOLUTION — Module 3, Exercice 1 : ton premier serveur
// ============================================================
// Test :  node exercice-1-solution.js   →  http://localhost:3000

const http = require("http");

// Étape 4 : les données
const sessions = [
  { sujet: "JavaScript", minutes: 90 },
  { sujet: "CSS",        minutes: 45 },
  { sujet: "Node",       minutes: 60 },
];

// Étape 6 (bonus) : le compteur — remis à zéro à chaque redémarrage
// du serveur, car il ne vit qu'en mémoire. D'où le module 5 !
let visites = 0;

const serveur = http.createServer((requete, reponse) => {
  reponse.setHeader("Content-Type", "text/html; charset=utf-8");

  if (requete.url === "/") {
    visites++;

    // Étape 4 : la liste fabriquée avec map + join
    const items = sessions
      .map(s => `<li>${s.sujet} — ${s.minutes} min</li>`)
      .join("");

    // Étape 5 : l'heure, calculée à CHAQUE requête
    const heure = new Date().toLocaleTimeString("fr-FR");

    reponse.end(`
      <!DOCTYPE html>
      <html lang="fr">
        <body>
          <h1>Journal de bord</h1>
          <ul>${items}</ul>
          <p>Page générée à ${heure}</p>
          <p>Visite n° ${visites}</p>
        </body>
      </html>
    `);
  } else if (requete.url === "/apropos") {
    // Étape 2
    reponse.end("<h1>À propos</h1><p>Nina, développeuse web en construction. 🚧</p>");
  } else {
    // Étape 3
    reponse.statusCode = 404;
    reponse.end("<h1>404 — Terre inconnue</h1><p>Cette page n'est sur aucune carte.</p>");
  }
});

serveur.listen(3000);
console.log("Serveur lancé sur http://localhost:3000 (Ctrl+C pour arrêter)");
