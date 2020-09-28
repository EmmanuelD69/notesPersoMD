/* Import du module Path inclus dans Node.JS */
const path = require("path");

/* Enregistre le chemin complet vers le ficher app.js */
const fileLocation = path.join(__dirname, "app.js");
console.log(fileLocation);
/* Enregistre uniquement le nom du fichier contenu dans fileLocation */
const fileName = path.basename(fileLocation);
console.log(fileName);
/* Enregistre uniquement l'extension du fichier contenu dans fileName */
const fileExtension = path.extname(fileName);
console.log(fileExtension);
