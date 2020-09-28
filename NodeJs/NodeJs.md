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

pour rappel, tout notre code s'exécutera au sein de la fonction wrapper vu plus haut, qui contient plusieurs paramètres dont le paramètre __"module"__.

Pour exporter le code contenu dans notre fichier __"helloWorld.js"__ il nous suffit d'indiquer ce que nous souhaitons exporter de son contenu de la manière suivante:

    module.exports = hello;

## Import d'un module

Pour importer le module *helloWorld* que nous avons créé, il nous suffit de l'indiquer dans le code de notre fichier Maître **app.js** de la manière suivante:

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

Partons du principe que nous avons une deuxième fonction que l'on nomme *"howAreYou"*

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

## Qu'est ce que c'est __dirname??

Nous avons vu au début de ce chapitre que dans node.js, le code global est contenu dans une fonction wrapper ayant plusieurs paramètres. 

**__dirname** est l'un de ses paramètres et nous permet d'obtenir l'adresse du dossier contenant notre fichier app.js.

Si l'on effectue un **console.log(__dirname)** dans notre fichier app.js, on obtient:

    D:\CODING\GitHub\notesPersoMD\NodeJs

## Qu'est ce que c'est __filename??

**__filename** nous permet d'obtenir l'adresse complète du fichier dans lequel l'appel à été lancé.

Si l'on effectue un **console.log(__filename)** dans notre fichier app.js, on obtient:

    D:\CODING\GitHub\notesPersoMD\NodeJs\app.js

# Modules déjà existant et inclus dans Node.JS

<span style="color:red">L'utilisation des modules livrés avec Node.JS ne nécéssite pas la création d'un ficher module, il faut simplement effectuer l'appel dans le fichier **app.js** et Node.JS s'occupera de faire la connexion avec le module inclus demandé.</span>

## path.js 

    const path = require ("path");

comme path est inclus dans Node.Js, il n'est pas nécéssaire d'indiquer l'adresse d'un fichier. Il suffit simplement d'indiquer le nom du module pré-inclus dans Node.Js.

Path nous permet de travailler avec l'adressage d'un fichier. Le module contient des fonctions qui nous permettent de montrer le chemin complet d'un fichier, ou juste le nom du fichier comme dans les exemples suivants:

    /* Enregistre le chemin complet vers le ficher app.js */
    const fileLocation = path.join(__dirname, app.js);
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

Prenons pour premier example l'écriture d'un fichier texte. Il nous faut pour cela utiliser la structure suivante:

    fs.writeFile("fileName", "value", callbackFn)

    fs.writeFile("message.txt", "Hello there!", (err) => {
        if(err) throw err;

        console.log("un fichier a été écrit");
    });

Lors de l'exécution du fichier contenant le module fs, un fichier texte est créé avec le message contenu dans le paramètre *"value"* de la fonction asynchrone.

En effet il s'agit d'une fonction asynchrone, ce qui signifie qu'elle ne rend pas immédiatement un résultat mais ne va pas bloquer l'exécution du code.
Pour schématiser, imaginons que l'on travaille dans la restauration en tant que serveur. Lorsqu'un serveur prend un commande, il l'emmène à la cuisine pour que le chef puisse préparer la commande. Le serveur ne va pas rester planté à attendre que le chef ait fini de préparer la commande, il va retourner en salle pour prendre les commandes suivantes ou s'occuper d'une autre tache. 

Ici, la fonction Asynchrone c'est notre commande et Javascript c'est notre serveur. Le chef quant à lui est ce qu'on appelle avec NodeJS la boucle d'évènements.