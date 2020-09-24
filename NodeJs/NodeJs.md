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
