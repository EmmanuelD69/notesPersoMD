# Node JS - Javascript coté serveur

## Qu'est ce que c'est?

Node.js est un "Javascript runtime". Quoi?? Quezaqo?

Tout ce que cela signifie c'est que l'on peut utiliser Javascript en dehors d'un navigateur. Jusqu'à présent avec javascript nous avons agi sur le navigateur (DOM) ce qui nous permettait d'avoir un visuel et une intéraction direct avec celui ci.

Ce qui change avec node.js c'est qu'avec son utilisation on va communiquer directement avec la machine (PC) via une interface de commande connue sous le nom de shell (LDC).

On va ainsi pouvoir:

-Lire le contenu d'un fichier,

-Créer un serveur,

-Se connecter à une base de données

and more...

**Tout ce qu'il faut se rappeler c'est que l'on travaille avec javascript directement sur notre machine.**

# D'accord et on commence par où?

Tout simplement par télécharger node.js depuis le lien suivant:

https://nodejs.org/en/download/

il suffit ensuite de l'installer soit en LDC si on se trouve sous Linux, soit avec l'executable si on est sous windows.

une fois installé, pour être certain que l'installation s'est bien déroulée, toujours en LDC dans un terminal on va taper la commande suivante:

    node --version

ce qui devrait en toute logique faire apparaître dans le terminal la version de node.js que vous venez d'installer.

    D:\CODING\GitHub\notesPersoMD> node --version
    v12.18.4

Si un message d'erreur s'affiche cela signifie que l'installation n'a pas fonctionné.

## autre chose?

Avec l'installation de Node.js on récupère aussi NPM, ce qui signifie littéralement Node Package Manager. Il s'agit d'un gestionnaire de paquets pour Node.js qui va nous aider à installer des dépendances (librairies, applis, etc...) complémentaires pour faire de Node.js un puissant outils de communication avec la machine.

# Comment cela fonctionne?

## lecture/exécution d'un fichier?

Comme indiqué précédemment, Node.js va nous permettre de lire des fichiers et notamment nos scripts écrient en Javascript. Pour cela il suffit de lui indiquer en LDC dans un terminal.

on commence avec le terme **node** suivi du nom du fichier que l'on veut lire/exécuter

    D:\CODING\GitHub\notesPersoMD\NodeJs> node app.js

## Structure de Node.Js:

Node dans son fonctionnement ressemble un peu à Sass en Css dans le sens où chaque fichiers que l'on crée peut être importé dans un fichier "Maître". On se retrouve avec une liste de fichiers importés que l'on appelle des <span style="color:red">_modules_</span> pour faire fonctionner notre principale fichier Js que l'on nomme généralement **app.js** ou bien **server.js**

Chaque fois que l'on crée un fichier node, celui ci est inclut dans cette fonction "wrapper":

    (function (exports, require, module, __filename, __dirname) {
        // Le code contenu dans les modules s'exécute à l'intérieur de cette fonction et n'est disponible que dans celle ci.



    })

au sein de cette fonction nous avons accès à différentes options:

    -exports,
    -require,
    -module,
    -filename,
    -dirname

Cette fonction est actuellement invisible, elle travaille en arrière plan, comme l'objet "Window" dans Javascript.

## Création d'un module (fichier node.js):

Nous allons créer un fichier Javascript qui contiendra une fonction de base pour dire "Hello World Js!". On lui attribut le nom de _"helloWorld.js"_.

    const hello = () => {
        console.log("Hello World JS!");
    }

Ce fichier _"helloWorld.js"_ représente maintenant un **"module"** que l'on peut exporter puis importer dans notre fichier "Maître" **app.js**.

Au final, nous aurons tout une liste de fichiers modules et un seul fichier Maître pour les commander tous. Il nous suffit d'appeler le fichier Maître pour faire fonctionner toutes nos fonctions qui auront été exportés/importés dans app.js.

appel du fichier Maître en console:

    node app.js

## Export d'un module

pour rappel, tout notre code s'exécutera au sein de la fonction wrapper vu plus haut, qui contient plusieurs paramètres dont le paramètre **"module"**.

Pour exporter le code contenu dans notre fichier **"helloWorld.js"** il nous suffit d'indiquer ce que nous souhaitons exporter de son contenu de la manière suivante:

    module.exports = hello;

## Import d'un module

Pour importer le module _helloWorld_ que nous avons créé, il nous suffit de l'indiquer dans le code de notre fichier Maître **app.js** de la manière suivante:

    const nom_du_module = require("emplacement_du_module_à_importer");
    const hello = require("./helloWorld");

## A quoi ressemble app.js?

Au final, notre fichier Maître ressemblera à une succéssion d'import et des appels vers les modules pour exécuter leurs code.

    const hello = require("./helloWorld");

    hello();

il suffit alors d'exécuter en console notre fichier **app.js** pour que le code global s'exécute.

    D:\CODING\GitHub\notesPersoMD\NodeJs> node app.js
    Hello World JS!

## Export multiple à partir d'un module

On imagine bien qu'un module ne sera pas toujours aussi simple que celui que nous venons de créer et qu'on va souvent se retrouver avec de multiples fonctions à l'intérieur d'un module unique.

Mais alors, comment faire pour exporter toutes ces fonctions depuis notre module?

Partons du principe que nous avons une deuxième fonction que l'on nomme _"howAreYou"_

<u>fichier helloWorld.js:</u>

    const hello = () => {
        console.log("Hello World JS!");
    }

    const howAreYou = () => {
        console.log("How are you??");
    }

on exporte les deux fonctions de la manière suivante:

    module.exports.hello = hello;
    module.exports.howAreYou = howAreYou;

## Qu'est ce qui change avec l'appel de app.js?

Avant, nous avions un module contenant une seule fonction, maintenant nous avons un module contenant deux fonctions. si l'on effectue un console.log de notre module, on obtient un objet contenant deux fonctions.

    /* Import du module helloWorld */
    const intro = require("./helloWorld");

    /* affichage en console du contenu du module helloWorld */
    console.log(intro);

    /* appel des fonctions contenues dans le module helloWorld */
    intro.hello();
    intro.howAreYou();

Execution du fichier app.js:

D:\CODING\GitHub\notesPersoMD\NodeJs> node app.js

    { hello: [Function: hello], howAreYou: [Function: howAreYou] }

1 objet, 2 fonctions > hello et howAreYou.

Pour exécuter ces fonctions, il faut précéder le nom de la fonction par le nom du module auxquel elle est rataché.

    moduleName.fonctionName();
    intro.hello();
    intro.howAreYou();

Le résultat en console nous affichera:

    Hello World JS!
    How are you??

## Qu'est ce que c'est \_\_dirname??

Nous avons vu au début de ce chapitre que dans node.js, le code global est contenu dans une fonction wrapper ayant plusieurs paramètres.

**\_\_dirname** est l'un de ses paramètres et nous permet d'obtenir l'adresse du dossier contenant notre fichier app.js.

Si l'on effectue un **console.log(\_\_dirname)** dans notre fichier app.js, on obtient:

    D:\CODING\GitHub\notesPersoMD\NodeJs

## Qu'est ce que c'est \_\_filename??

**\_\_filename** nous permet d'obtenir l'adresse complète du fichier dans lequel l'appel à été lancé.

Si l'on effectue un **console.log(\_\_filename)** dans notre fichier app.js, on obtient:

    D:\CODING\GitHub\notesPersoMD\NodeJs\app.js

# Modules déjà existant et inclus dans Node.JS

<span style="color:red">L'utilisation des modules livrés avec Node.JS ne nécéssite pas la création d'un ficher module, il faut simplement effectuer l'appel dans le fichier **app.js** et Node.JS s'occupera de faire la connexion avec le module inclus demandé.</span>

## path.js

    const path = require ("path");

comme path est inclus dans Node.Js, il n'est pas nécéssaire d'indiquer l'adresse d'un fichier. Il suffit simplement d'indiquer le nom du module pré-inclus dans Node.Js.

Path nous permet de travailler avec l'adressage d'un fichier. Le module contient des fonctions qui nous permettent de montrer le chemin complet d'un fichier, ou juste le nom du fichier comme dans les exemples suivants:

    /* Enregistre le chemin complet vers le ficher app.js */
    const fileLocation = path.join(__dirname, "app.js");
    console.log(fileLocation);

    /* Enregistre uniquement le nom du fichier contenu dans fileLocation */
    const fileName = path.basename(fileLocation);
    console.log(fileName);

    /* Enregistre uniquement l'extension du fichier contenu dans fileName */
    const fileExtension = path.extname(fileName);
    console.log(fileExtension);

affichage dans le terminal en cas d'exécution:

    D:\CODING\GitHub\notesPersoMD\NodeJs\app.js
    app.js
    .js

## url.js

    const url = require ("url");

url nous permet de travailler avec une adresse web. Le module contient des fonctions qui nous permettent de manipuler tout ou partie d'une adresse web.

Pour cela il nous faut créer une variable qui contiendra l'adresse web et une variable qui va nous permettre de travailler sur cette adresse web en utilisant la fonction **parse**.

    /* Enregistre l'adresse web sur laquelle nous allons travailler */
    const adress = "http://localhost:8000/default.html?year=2020&month=september";

    /* Enregistre l'analyse syntaxique de l'adresse web pour pouvoir travailler dessus */
    const parsedUrl = url.parse(adress, true);

Il faut ensuite simplement choisir ce que l'on souhaite afficher de notre adresse:

    /* affiche la partie host de l'adresse web */
    console.log(parsedUrl.host);

    /* affiche le chemin vers le fichier contenu dans l'adresse web */
    console.log(parsedUrl.pathname);

    /* affiche sous la forme d'un objet les requêtes affichées dans l'adresse web  */
    console.log(parsedUrl.query);

    /* affiche le mois indiqué dans l'adresse web  */
    console.log(parsedUrl.query.month);

Le terminal nous affichera alors le résultat suivant:

    localhost:8000
    /default.html
    [Object: null prototype] { year: '2020', month: 'september' }
    september

## fs.js (File System)

    const fs = require ("fs");

Avec ce module inclus dans Node.js on peut créer des fichiers, lire le contenu d'un fichier et plus.... on intéragit directement avec le contenu d'un fichier.

**<u>fs.writeFile:</u>**

Prenons pour premier example l'écriture d'un fichier texte. Il nous faut pour cela utiliser la structure suivante:

    fs.writeFile("fileName", "value", callbackFn)

    fs.writeFile("message.txt", "Hello there!", (err) => {
        if(err) throw err;

        console.log("un fichier a été écrit");
    });

Lors de l'exécution du fichier contenant le module fs, un fichier texte est créé avec le message contenu dans le paramètre _"value"_ de la fonction asynchrone.

En effet il s'agit d'une fonction asynchrone, ce qui signifie qu'elle ne rend pas immédiatement un résultat mais ne va pas bloquer l'exécution du code.
Pour schématiser, imaginons que l'on travaille dans la restauration en tant que serveur. Lorsqu'un serveur prend un commande, il l'emmène à la cuisine pour que le chef puisse préparer la commande. Le serveur ne va pas rester planté à attendre que le chef ait fini de préparer la commande, il va retourner en salle pour prendre les commandes suivantes ou s'occuper d'une autre tache.

Ici, la fonction Asynchrone c'est notre commande et Javascript c'est notre serveur. Le chef quant à lui est ce qu'on appelle avec NodeJS <span style="color:red">la boucle d'évènements</span>.

**<u>fs.readFile:</u>**

Maintenant nous allons voir comment faire pour lire un fichier à l'aide de Node.JS. Il nous faut pour cela utiliser la structure suivante:

    fs.readFile("chemin_du_fichier_à_lire", "format_d'écriture_du_texte", (err, data) => {
        if(err) throw err;

        console.log(data);
    });

exemple:

    fs.readFile("./message.txt", "utf8", (err, data) => {
        if(err) throw err;

        console.log(data);
    });

## http.js (pour créer un serveur)

    const http = require("http");

Ce module va nous permettre de créer un serveur, pour le mettre en place il nous faut suivre la structure suivante:

    const server = http.createServer((request, response) => {

    });

une fois que le serveur est créé, il nous faut indiquer sur quel port il va écouter les requêtes qui lui sont adréssé:

    server.listen(port, callbackFn);

A partir de ce moment, losrqu'on va avec notre navigateur sur l'adresse localhost dont le port correspond à celui indiqué dans le paramètre de _"listen"_, on effectue une requête auprès du serveur si celui çi a été démarré.

**<u>request</u>**: c'est ce que le serveur obtient de l'utilisateur.

**<u>response</u>**: c'est ce que le serveur renvoi à l'utilisateur.

Exemple de serveur:

    const http = require("http");

    const server = http.createServer((req, res) => {
        res.write("Hello there user!");
        res.end();
    });

    server.listen(3000, () => console.log("Server is up and Running!"));

Quand un utilisateur va envoyer une requête vers le serveur, se connecter au serveur par exemple, celui ci va lui renvoyer un message "Hello there user!".
Il est important de ponctuer ce message par une fermeture du message via l'utilisation de **res.end()**.

<span style="color:red">il faut toujours fermer un message de réponse du serveur à l'aide de **res.end()**</span>.

Notre serveur est prêt à être démarré, pour cela il suffit d'exécuter le fichier qui contient notre module http, cela peut être **app.js** ou **server.js** ou encore **http.js**, à chacun le choix du nom de fichier qui lui sera le plus parlant. On démarre le serveur par la commande suivante dans le terminal:

    node nom_du_fichier_module_http
    node http.js

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

Il est aussi de bonne pratique d'introduire dans notre réponse un message de type "metadata" pour informer que la connexion à bien été établie avec le server et que tout est "Ok".

Pour cela on utilise cette notation:

    res.writeHead(statusCode, {Response_Header_informations})
    res.writeHead(200, {"content-Type": "text/html"});

Le code 200 étant celui pour indiquer que tout va bien et les informations contenues dans le header permettant d'indiquer quel type de données sont passés.

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

## Configuration de http.js pour renvoyer le contenu d'un fichier html

1-Déclaration des modules dont on aura besoin

    const http = require("http");
    const path = require("path");
    const fs = require("fs");

2-Création du serveur et paramétrage des conditions en fonction des requêtes reçues

    const server = http.createServer((req, res) => {
        if (req.url === "/") {
            fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
        }

        if (req.url === "/user") {
            res.write("Welcome user Emmanuel!");
            res.end();
        }
    });

3- Déclaration du port sur lequel le serveur va écouter

    server.listen(3000, () => console.log("Server is up and Running!"));

<u>Debriefing:</u>

fs.readFile prend 2 arguments(paramètres) et va nous permettre d'aller chercher l'adressage du ficher à lire et de renvoyer son contenu vers l'utilisateur. Pour cela on utilise **path.join**, en premier argument, en indiquant en premier paramètre l'endroit ou se trouve le fichier et en deuxième argument le nom du fichier à lire.

    fs.readFile(path.join(__dirname, "index.html"),

puis en 2ème argument, on va passer une fonction qui va exécuter son contenu uniquement lorsque le fichier aura été lu avec succès. sinon un message d'erreur viendra s'afficher.

    (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });

**res.write(data)** va nous permettre d'envoyer à l'utilisateur les données lues dans le fichier html.

# Usage de Node.JS

Il n'est pas nécéssaire d'être un professionnel de Node.JS car la plupart du temps nous allons utiliser des framework qui vont nous faciliter la vie.

En effet, pas de logique de "If" à rallonge comme nous avons commencé à explorer dans ce chapitre. Il nous a permis d'explorer les modules intégrés par défaut à Node.JS, son coeur.

Il nous est possible de rajouter des framework, librairies, modules très facilement, soit du fait maison, soit de l'existant et pour le faire nous avons un outil formidable qui s'appelle **NPM**.

## **NPM** Node Package Manager.

1 - <u>Comment ça fonctionne?</u>

Lorsque l'on crée un projet il nous suffit d'initialiser NPM. Pour cela il suffit de taper la commande suivante dans le terminal:

    npm init

Bien évidemment il faut le faire en étant dans le dossier du projet que vous souhaitez mettre en place. Si on prend notre exemple précédent cela donnerait cela:

    D:\CODING\GitHub\notesPersoMD\NodeJs>npm init

A la suite de quoi, dans le terminal, une série de questions vont apparaitre:

    package name: (nodejs)
    version: (1.0.0)
    description: C'est juste un petit cours sur node js
    entry point: (app.js)
    test command:
    git repository:
    keywords:
    author: EmmanuelDev
    license: (ISC)

2 - <u>package.json</u>

De sorte à paramétrer un fichier "**package.json**" qui va contenir toutes les informations que nous venons d'entrer en réponses:

    {
    "name": "nodejs",
    "version": "1.0.0",
    "description": "C'est juste un petit cours sur node js",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "EmmanuelDev",
    "license": "ISC"
    }

ainsi que la liste des "**dépendances**" que nous allons utiliser pour notre projet.

Il y'a aussi une partie "**scripts**" qui va nous permettre d'indiquer le fonctionnement de ces dépendances, par exemple qu'est ce qui va permettre de lancer tel ou tel dépendances, à quel moment, avec quel mot clé, etc...

3 - <u>usage de "scripts" dans package.json</u>

**"scripts"** nous donne la possibilitée de créer des mots clés qui vont nous permettre d'exécuter des actions.

    "scripts": {
        "mot_clé" : "action"
    }

exemple:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
        "start": "node app.js"
        "startsurvey": "nodemon app.js"
    }

Dans notre exemple nous avons créé 3 mots clés qui nous permettent d'éffectuer différentes actions.

- test va nous permettre d'afficher un message d'erreur.

- start va nous permettre d'exécuter le fichier app.js en utilisant node.

- startsurvey va nous permettre d'exécuter le fichier app.js en utilisant nodenom

comment utiliser le mot clé d'un script?

c'est très simple, il suffit d'entrer dans le terminal la commande suivante:

    npm run mot_clé
    npm run test
    npm run start
    npm run startsurvey

4 - <u>nodemon package</u>

Nodemon est un utilitaire qui surveillera tout changement dans votre code source et redémarrera automatiquement votre serveur. Plus besoin d'arrêter le serveur avec CTRL+C et de le relancer via le terminal, nodemon s'occupe de tout!!!

installation via terminal:

    npm install -g nodemon

5 - <u>.gitignore</u> - <span style="color:red">**important!!!**</span>

Comme l'on utilise très souvent Git, il est important de créer un fichier **.gitignore** car celui ci va nous permettre d'éviter de _"push"_ le dossier contenant nos dépendances, mais aussi des fichiers contenant des données de config que l'on ne souhaite pas rendre public.

Lors de l'installation de nodemon ou de tout autres dépendances avec NPM, un dossier **node_modules** est créé dans l'architecture de notre projet.

Ce dossier contient toutes les dépendances que nous aurons choisi d'installer et d'utiliser pour notre projet, ce qui signifie que ce sont des données pouvant atteindre des tailles importantes (Megaoctets) et on ne souhaite pas _"push"_ ces fichiers volumineux sur Github.

Il est donc de bonne pratique de créer un fichier .gitignore et d'y indiquer le nom des fichiers/dossiers que l'on ne souhaite pas transférer lors de nos _"push"_ vers github ou autres gestionnaires git.
