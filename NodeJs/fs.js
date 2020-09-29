const fs = require("fs");

fs.writeFile("message.txt", "Hello there!", (err) => {
  if (err) throw err;

  console.log("un fichier a été écrit");
});

# Fonctionnement d'un serveur

<span style="color:red">Une fois démarré, le serveur est en écoute tant qu'il n'a pas été éteint</span> et attend qu'un évènement(une requête) se produise pour répondre. Le type de requête varie, cela peut être la lecture d'un fichier, ou l'écriture d'un fichier, une connexion au serveur, un accès à une url spécifique, etc...

En fonction de la requête nous pourrons décider de la réponse adéquate via le code que nous mettrons à l'intérieur de notre variable **server**.

Lorsque le serveur reçoit une requête, il affiche son contenu dans la fenêtre de Terminal. Ainsi on peut récupérer tout un tas d'informations comme l'adresse url de la personne qui vient de se connecter, le type de navigateur qu'elle utilise, etc...

Exemple concret:

    const server = http.createServer((req, res) => {
        if (req.url === "/") {
        res.write("Welcome to the Homepage!");
        res.end();
        }
        if (req.url === "/user") {
        res.write("Welcome user Emmanuel!");
        res.end();
        }
    });

Lorsque l'on se connectera au server sur l'adresse d'accueil(localhost:3000), le message "Welcome to the Homepage!" va s'afficher.

Lorsque l'on se connectera au server sur une adresse du serveur correspondant à l'espace dédié à un utilisateur(localhost:3000/user), un message d'accueil plus personnel s'affichera "Welcome user Emmanuel!".

Maintenant au lieu d'écrire un message tout simple, on peut introduire du code html dans notre réponse.

    res.write("<h1>Welcome to the Homepage!</h1>");
    res.write("<h2>Bienvenue sur la page d'accueil!</h2>");
    res.write("<h3>Nous allons parler de Node.JS</h3>");
    res.write("<h4>Nous allons parler de Node.JS</h4>");
    res.write("<p>Node.js est un environnement logiciel libre en JavaScript </p>");

Mais cela risque de vite devenir très compliqué si l'on doit afficher des pages de codes html.... C'est pourquoi nous allons plutôt utiliser ce que nous avons déjà vu: **fs** / **path**

On peut créer des fichiers html et les envoyer à l'utilisateur quand il se connecte au serveur en fonction de l"adresse du serveur qu'il cherche à joindre.

<u>page d'accueil:</u> localhost:3000

    index.html

<u>page user:</u> localhost:3000/user

    user.html

<u>page portfolio:</u> localhost:3000/portfolio

    portfolio.html

Etc...Etc...Etc...

## Mise en place de la logique de serveur: