// ============================================================
// SOLUTION — Module 1, Exercice 1 : premiers pas avec Node
// ============================================================
// Test :  node exercice-1-solution.js 200

// --- Étape 1 : le grand saut ---
console.log("Le journal de bord démarre !");

// --- Étape 2 : le navigateur n'est plus là ---
console.log(typeof document);   // "undefined"
console.log(typeof window);     // "undefined"

// --- Étape 3 : un argument ---
const minutes = Number(process.argv[2]);

// --- Étape 4 : formater une durée ---
function formaterDuree(minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const heures = Math.floor(minutes / 60);
  const reste = minutes % 60;
  return `${heures} h ${reste}`;
}

console.log(formaterDuree(45));    // "45 min"
console.log(formaterDuree(90));    // "1 h 30"
console.log(formaterDuree(135));   // "2 h 15"

// --- Étapes 5 et 6 : les deux ensemble, avec garde-fou ---
if (Number.isNaN(minutes)) {
  console.log("Usage : node exercice-1-solution.js <minutes>");
} else {
  console.log(`Session de ${formaterDuree(minutes)} enregistrée.`);
}
