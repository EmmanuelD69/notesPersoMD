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

Ce fichier représente maintenant un **"module"** que l'on peut exporter puis importer dans notre fichier "Maître" **app.js**. 

Au final, nous aurons tout une liste de fichiers modules et un seul fichier Maître pour les commander tous. Il nous suffit d'appeler le fichier Maître pour faire fonctionner toutes nos fonctions qui auront été exportés/importés dans app.js.

appel du fichier Maître en console:

    node app.js

## Export d'un module

pour rappel, tout notre code s'exécutera au sein de la fonction wrapper vu plus haut, qui contient plusieurs paramètres dont le paramètre __"module"__.

Pour exporter le code contenu dans notre fichier _"HelloWorld.js"_ il nous suffit d'indiquer ce que nous souhaitons exporter de son contenu de la manière suivante:

    module.exports = hello;