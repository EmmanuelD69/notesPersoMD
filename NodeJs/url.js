/* Import du module url inclus dans Node.JS */
const url = require("url");

/* Enregistre l'adresse web sur laquelle nous allons travailler */
const adress = "http://localhost:8000/default.html?year=2020&month=september";

/* Enregistre l'analyse syntaxique de l'adresse web pour pouvoir travailler dessus */
const parsedUrl = url.parse(adress, true);

/* affiche la partie host de l'adresse web */
console.log(parsedUrl.host);

/* affiche le chemin vers le fichier contenu dans l'adresse web */
console.log(parsedUrl.pathname);

/* affiche sous la forme d'un objet les requêtes affichées dans l'adresse web  */
console.log(parsedUrl.query);

/* affiche le mois indiqué dans l'adresse web  */
console.log(parsedUrl.query.month);
