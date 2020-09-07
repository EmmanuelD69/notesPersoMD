# Asynchrone Javascript And Xml - AJAX

## Rappel wiki:

> Les applications Web classiques permettent aux utilisateurs d'effectuer des choix (suivre un lien, remplir et valider un formulaire) à la suite de quoi une requête est envoyée au serveur Web. Le serveur répondra à la requête en envoyant une page Web. Une page web est envoyée en réponse à chaque manipulation, et la transmission de la page web entre le serveur et le navigateur provoque un temps de latence d'autant plus grand que la page est riche en contenu et en présentation (tableaux, couleurs, polices de caractères…).

> Dans les applications Web en Ajax, une page Web est envoyée une seule fois. La page envoyée contiendra un programme écrit en langage JavaScript. L'utilisation de JavaScript permet de provoquer des requêtes lors de manipulation qui autrement n'en provoqueraient pas (du fait des mécanismes utilisés).

> En utilisant Ajax, le dialogue entre le navigateur et le serveur se déroule la plupart du temps de la manière suivante : un programme écrit en langage de programmation JavaScript, incorporé dans une page web, est exécuté par le navigateur. Celui-ci envoie en arrière-plan des demandes au serveur Web, puis modifie le contenu de la page actuellement affichée par le navigateur Web en fonction du résultat reçu du serveur, évitant ainsi la transmission et l'affichage d'une nouvelle page complète.

## Qu'est ce que le Javascript Asynchrone?

> le navigateur Web continue d'exécuter le programme JavaScript alors que la demande est partie, il n'attend pas la réponse envoyée par le serveur Web et l'utilisateur peut continuer à effectuer des manipulations pendant ce temps

**Synchrone** = une action se déroulant _en direct_, quelque chose qui se passe en même temps, une action synchrone.

**Asynchrone** = une action qui se déroule _en différé_, quelque chose qui se passe après une période de temps, un action asynchrone.

### Synchrone code example:

1- Javascript read the function and memorize it

    function synchrone() {
        console.log('we are in another function');
        console.log('do some stuff');
    }

2- Javascript execute the console.log

    console.log('start');

3- Javascript execute the function and show its content in console

    synchrone();

4- Javascript execute the console.log

    console.log('end');

_console logs:_

     start
     we are in another function
     do some stuff
     end

### Asynchrone code example:

Nous allons utiliser la fonction _"setTimeout"_ qui permet de mettre en place une temporisation au bout de laquelle les actions qu'elle contient vont s'exécuter.

Javascript est très mauvais pour faire du multitasking, il lit le code ligne par ligne et exécute une action à la fois. lorsqu'il tombe sur une action asynchrone, plutot que de patienter le temps indiqué dans la fonction "setTimeout" il va transférer celle çi au browser(navigateur), qui contient un système de gestion (Web API - zone de stockage temporaire) de ces fonctions asynchrone, et poursuivre l'exécution du code. Lorsque la temporisation s'achève, le navigateur renvoi la fonction asynchrone pour que javascript puisse l'exécuter.

1- Javascript execute the console.log

    console.log('start');

2- Javascript read the _setTimout_ function and transfer it to the web API because a timer (asynchrone action) has been found.

    setTimeout(() => {
        console.log('a timeout of 2 seconds happened');
    }, 2000);

3- Javascript execute the console.log

    console.log('end');

4- Javascript execute the _setTimout_ function

_console logs:_

    start
    end
    a timeout of 2 seconds happened

Il existe d'autres actions asynchrones comme par exemple les

**EVENTLISTENERS**

Lorsqu'on place un event listener sur un élément, javascript confie la gestion de celui ci au navigateur. il ne va pas attendre qu'une action se produise pour continuer de lire le code, il va transférer la charge de cette action au browser qui va patientez qu'un clic s'effectue avant d'en informer javascript pour executer le code de la fonction contenant l'event.
