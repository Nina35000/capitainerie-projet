const express = require("express");
const fs = require("fs");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

function lireNavires() {
    const contenu = fs.readFileSync("donnees.json", "utf-8");
    return JSON.parse(contenu);
}
function sauverNavires(navires) {
    fs.writeFileSync("donnees.json", JSON.stringify(navires, null, 2));
}
function joursAQuai(arriveLe) {
    const ms = Date.now() - new Date(arriveLe).getTime();
    return Math.floor(ms / 86400000);
}

function afficherPage(req, res, navires, filtreType) {
    const tries = [...navires].sort((a, b) =>
        b.arriveLe.localeCompare(a.arriveLe),
    );

    const nombre = navires.length;
    const metres = navires.reduce((total, n) => total + n.longueur, 0);

    const compteur = {};
    for (const n of navires) {
        compteur[n.type] = (compteur[n.type] || 0) + 1;
    }
    let majoritaire = null;
    let max = 0;
    for (const type in compteur) {
        if (compteur[type] > max) {
            max = compteur[type];
            majoritaire = type;
        }
    }

    res.render("index", {
        navires: tries,
        joursAQuai,
        stats: { nombre, metres, majoritaire },
        filtreType,
    });
}

app.get("/", (req, res) => {
    const navires = lireNavires().map((n, i) => ({ ...n, index: i }));
    afficherPage(req, res, navires, null);
});

app.get("/type/:nom", (req, res) => {
    const tousLesNavires = lireNavires().map((n, i) => ({ ...n, index: i }));
    const filtres = tousLesNavires.filter((n) => n.type === req.params.nom);
    afficherPage(req, res, filtres, req.params.nom);
});

app.post("/accoster", (req, res) => {
    const nom = req.body.nom;
    const longueur = Number(req.body.longueur);

    if (!nom || longueur <= 0) {
        return res.redirect("/");
    }

    const navires = lireNavires();
    navires.push({
        nom: nom,
        type: req.body.type,
        ponton: req.body.ponton,
        longueur: longueur,
        arriveLe: new Date().toISOString().slice(0, 10),
    });
    sauverNavires(navires);
    res.redirect("/");
});

app.post("/depart", (req, res) => {
    const index = Number(req.body.index);

    if (!Number.isInteger(index)) {
        return res.redirect("/");
    }

    const navires = lireNavires();
    navires.splice(index, 1);
    sauverNavires(navires);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Capitainerie ouverte sur http://localhost:3000");
});
