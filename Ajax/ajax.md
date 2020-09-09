# Asynchrone Javascript And Xml - AJAX

## Rappel wiki:

> Les applications Web classiques permettent aux utilisateurs d'effectuer des choix (suivre un lien, remplir et valider un formulaire) à la suite de quoi une requête est envoyée au serveur Web. Le serveur répondra à la requête en envoyant une page Web. Une page web est envoyée en réponse à chaque manipulation, et la transmission de la page web entre le serveur et le navigateur provoque un temps de latence d'autant plus grand que la page est riche en contenu et en présentation (tableaux, couleurs, polices de caractères…).

> Dans les applications Web en Ajax, une page Web est envoyée une seule fois. La page envoyée contiendra un programme écrit en langage JavaScript. L'utilisation de JavaScript permet de provoquer des requêtes lors de manipulation qui autrement n'en provoqueraient pas (du fait des mécanismes utilisés).

> En utilisant Ajax, le dialogue entre le navigateur et le serveur se déroule la plupart du temps de la manière suivante : un programme écrit en langage de programmation JavaScript, incorporé dans une page web, est exécuté par le navigateur. Celui-ci envoie en arrière-plan des demandes au serveur Web, puis modifie le contenu de la page actuellement affichée par le navigateur Web en fonction du résultat reçu du serveur, évitant ainsi la transmission et l'affichage d'une nouvelle page complète.

## Qu'est ce que le Javascript Asynchrone?

**Synchrone** = une action se déroulant _en direct_, quelque chose qui se passe en même temps, une action synchrone.

**Asynchrone** = une action qui se déroule _en différé_, quelque chose qui se passe après une période de temps, un action asynchrone.

> En ajax, comme le nom l'indique, les demandes sont effectuées de manière asynchrone:

> Le navigateur Web continue d'exécuter le programme JavaScript alors que la demande est partie, il n'attend pas la réponse envoyée par le serveur Web et l'utilisateur peut continuer à effectuer des manipulations pendant ce temps.

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

_EVENTLISTENERS_

Lorsqu'on place un event listener sur un élément, javascript confie la gestion de celui ci au navigateur. il ne va pas attendre qu'une action se produise pour continuer de lire le code, il va transférer la charge de cette action au browser qui va patientez qu'un clic s'effectue avant d'en informer javascript pour executer le code de la fonction contenant l'event.

---

### Example pratique:

Prenons l'example simple d'affichage de l'email d'un utilisateur avec un fonction login.

Dans une logique synchrone on rédigerai notre code ainsi:

    console.log("Start");

    function loginUser(email, password){
        setTimeout(() => {
        console.log("now we get the data");
        return {userEmail: email};
        },2000);
    }

    const user = loginUser("emmanueldevfr@gmail.com", 123456789);
    console.log(user);
    console.log("End");

Mais dans la pratique on obtient ces logs:

    Start
    undefined
    End
    now we get the data

setTimeout est une fonction asynchone, elle est envoyé au navigateur pour la durée de la temporisation (2000ms) avant d'être renvoyé à Javascript. Pendant ce temps, Javascript enchaine la lecture du code.

---

**<u>Décomposition de la lecture du code par Javascript:</u>**

1- Javascript execute le console.log

    console.log('Start');

2- Javascript lit de manière passive la fonction _setTimeout_ et l'envoi vers le navigateur pour la durée de la tempo pour pouvoir poursuivre sa lecture du code.

    function loginUser(email, password){
        setTimeout(() => {
        console.log("now we get the data");
        return {userEmail: email};
        },2000);
    }

3- Javascript lit la variable user qui fait appel à la fonction _loginUser_

    const user = loginUser("emmanueldevfr@gmail.com", 123456789);

4- Javascript execute le console.log qui demande d'afficher le contenu de la variable _user_.

L'Execution est lancée, elle ne prend qu'une fraction de temps à démarrer.
A cet instant précis, la variable ne peux pas avoir connaissance du résultat de la fonction car celle çi a été transférée au navigateur pour 2 secondes, alors que la lecture du code de notre script par javascript ne prend peut être qu'une ou deux millisecondes. On a donc à cet instant T une variable avec un contenu **undefined**.

    console.log('user');

5- Javascript execute le console.log

    console.log('End');

6- Le navigateur, après 2 secondes, exécute le code contenu dans la fonction asynchrone _setTimeout_.

On est donc face à un problème... comment faire pour avoir accès aux Données après que la tempo s'est achevée?

---

Pour pallier au problème de l'abscence de valeur définie au moment de la lecture de la variable, on va introduire une fonction callback qui sera exécutée lorsque la temporisation s'achèvera. On aura donc à faire à un comportement Asynchrone (en différé) de l'exécution d'une partie du code.

**Rappel fonction callback:**

> C'est une fonction qui est utilisée à un moment précis,
> déterminé par une autre fonction (high order function)
> ou par une action précise (addEventListener / setTimeout / setInterval / etc...).
> Pour résumer c'est une fonction que l'on passe en paramètre d'une autre fonction.

Dans notre cas actuel, le code ressemblera à:

    console.log('Start');

    function loginUser(email, password, fonctionCallback){
        setTimeout(() => {
        console.log("now we get the data");
        fonctionCallback ({userEmail: email});
        },2000);
    }

    const user = loginUser("emmanueldevfr@gmail.com", 123456789, (parametresDeLaFonctionCallback) => {
        console.log(parametresDeLaFonctionCallback);
    });

    console.log('End');

Ici notre fonction callback est définie sous la forme d'une fonction anonyme dans la variable **user** qui va déclencher l'appel vers la fonction _loginUser_ (fonction de haut rang).

**<u>Que va faire Javascript?</u>**

1- Javascript execute le console.log

    console.log('Start');

2- Javascript lit de manière passive la fonction _loginUser_ et la mémorise dans le DOM.

    function loginUser(email, password, fonctionCallback){
        setTimeout(() => {
        console.log("now we get the data");
        fonctionCallback ({userEmail: email});
        },2000);
    }

3- Javascript lit la variable user qui déclenche la fonction loginUser. Le call stack prend en charge loginUser et s'aperçoit qu'il y'a une méthode setTimeout à l'intérieur, ce qui défini une temporisation que javascript ne va pas gérer, il a besoin de poursuivre la lecture du code et décide donc d'envoyer loginUser vers le navigateur qui va la stocker temporairement avec son API Web pour la durée définie dans la fonction setTimeout (2000ms).

    const user = loginUser("emmanueldevfr@gmail.com", 123456789,(parametresDeLaFonctionCallback) => {
        console.log(parametresDeLaFonctionCallback);
    });

<span style="color:red"> **Ici notre fonction callback a pour but de demander l'affichage en console de son contenu situé entre paranthèse, ce qui se trouve en paramètre de la fonction callback.**</span>

j'aurais tout aussi bien pu indiquer user, toto, tata, etc... en paramètre de la fonction anonyme mais pour plus de précision et de clarté j'ai utilisé "parametresDeLaFonctionCallback" pour bien indiquer que le console log va afficher ce qui se trouve entre paranthèse de la fonction callback se trouvant dans la fonction setTimeout.

4- Javascript execute le console.log

    console.log('End');

5- La temporisation arrive a son terme au bout des 2 secondes et l'API Web renvoi l'exécution de la fonction loginUser à Javascript. S'enchaine alors la lecture des instructions contenues dans la fonction setTimeout:

    console.log("now we get the data");
    fonctionCallback ({userEmail: email});

Résultat en console:

    Start
    End
    now we get the data
    {userEmail: "emmanueldevfr@gmail.com"}

Ps: c'est un objet qui se trouve en paramètre de la fonction callstack.

---

Dans la continuité de notre example, partons du principe que nous avons le profil d'un youtuber qui publie du contenu vidéo et l'on souhaite associer à son profil la liste des vidéos qu'il a déjà publiées.

pour cela nous allons créer une fonction: **getUserVideos**

    function getUserVideos(email, fonctionCallback) {
        setTimeout(() => {
    	fonctionCallback(['video1', 'video2', 'video3']);
        }, 2000);
    }

Puis nous allons associer cette nouvelle fonction au profil de l'utilisateur lorsqu'il se log:

    const user1 = loginUser('emmanueldevfr@gmail.com', 123456789, (userInfos) => {
        console.log(userInfos);
        getUserVideos(userInfos.userEmail, (videos) => {
    	    console.log(videos);
        });
    });

**<u>Décomposition de la variable:</u>**

Lorsque Javascript va lire la variable user1, elle va exécuter la fonction loginUser en lui passant en paramètres l'adresse email de l'utilisateur, son mot de passe ainsi qu'une fonction callback qui aura pour instruction d'afficher les informations de l'utilisateur (email, password) ainsi que les vidéos associés à son compte email.

Tout cela va se faire de manière asynchrone en passant par des fonctions utilisant la fonction asynchrone **setTimeout**
