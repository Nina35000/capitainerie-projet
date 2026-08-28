// ============================================================
// MODULE 1 — EXERCICE 1 : premiers pas avec Node
// ============================================================
// Pour tester : ouvre un terminal dans ce dossier, puis
//   node exercice-1.js
// (et pour les étapes 3+ :  node exercice-1.js 120  par exemple)
// ============================================================

// --- Étape 1 : le grand saut ---
// Affiche "Le journal de bord démarre !" dans le terminal.
// Lance le fichier avec `node exercice-1.js` pour vérifier.

// ... ton code ici ...
console.log("le journal de bord demarre !");

// --- Étape 2 : le navigateur n'est plus là ---
// Affiche typeof document et typeof window.
// Les deux doivent répondre "undefined" : tu es bien chez Node.

console.log(typeof document);
console.log(typeof window);

// --- Étape 3 : un argument ---
// Récupère le premier argument dans une variable `minutes`
// (souviens-toi : process.argv[2], et pense à Number(...)).
// Affiche : "Session de X minutes enregistrée."
// Teste avec :  node exercice-1.js 90

const minutes = Number(process.argv[2]);
console.log(`Session de ${minutes} minutes enregistrée.`);

// --- Étape 4 : un peu de logique (révision module 2 du parcours 02) ---
// Écris une fonction `formaterDuree(minutes)` qui renvoie :
//   - "45 min"        si moins de 60 minutes
//   - "2 h 15"        sinon (heures et minutes restantes)
// Astuces : Math.floor(minutes / 60) et minutes % 60.
// Affiche formaterDuree(45), formaterDuree(90), formaterDuree(135).
// Attendu : "45 min", "1 h 30", "2 h 15"

function formaterDuree(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const heures = Math.floor(minutes / 60);
    const minutesRestantes = minutes % 60;
    return `${heures} h ${minutesRestantes}`;
}

console.log(formaterDuree(45));
console.log(formaterDuree(90));
console.log(formaterDuree(135));

// --- Étape 5 : les deux ensemble ---
// Utilise formaterDuree sur ta variable `minutes` de l'étape 3 :
//   node exercice-1.js 200
//   → "Session de 3 h 20 enregistrée."

if (Number.isNaN(minutes)) {
    console.log("Usage : node exercice-1.js <minutes>");
} else {
    console.log(`Session de ${formaterDuree(minutes)} enregistrée.`);
}
// --- Étape 6 (bonus) : garde-fou ---
// Si aucun argument n'est fourni (minutes vaut NaN), affiche
//   "Usage : node exercice-1.js <minutes>"
// au lieu de planter un affichage bizarre.
// Astuce : Number.isNaN(minutes)
