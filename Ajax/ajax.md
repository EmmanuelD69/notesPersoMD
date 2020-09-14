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

Lorsqu'on place un event listener sur un élément, javascript confie la gestion de celui ci au navigateur. il ne va pas attendre qu'une action se produise pour continuer de lire le code, il va transférer la charge de cette action au browser qui va patientez qu'un évènement arrive avant d'en informer javascript pour qu'il exécute le code contenu dans la fonction que l'event à déclenché.

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

2- Javascript lit de manière passive la fonction _loginUser_ et la mémorise dans le DOM.

    function loginUser(email, password){
        setTimeout(() => {
        console.log("now we get the data");
        return {userEmail: email};
        },2000);
    }

3- Javascript lit la variable user qui déclenche la fonction loginUser.

    const user = loginUser("emmanueldevfr@gmail.com", 123456789);

Le call stack prend en charge loginUser et s'aperçoit qu'il y'a une méthode setTimeout à l'intérieur, ce qui défini une temporisation que javascript ne va pas gérer, il a besoin de poursuivre la lecture du code et décide donc d'envoyer loginUser vers le navigateur qui va la stocker temporairement avec son API Web pour la durée définie dans la fonction setTimeout (2000ms).

4- Javascript execute le console.log qui demande d'afficher le contenu de la variable _user_.

    console.log('user');

L'Execution est lancée, elle ne prend qu'une fraction de temps à démarrer.
A cet instant précis, la variable ne peux pas avoir connaissance du résultat de la fonction car celle çi a été transférée au navigateur pour 2 secondes, alors que la lecture du code de notre script par javascript ne prend peut être qu'une ou deux millisecondes. On a donc à cet instant T une variable avec un contenu **undefined**.

5- Javascript execute le console.log

    console.log('End');

6- Le navigateur, après 2 secondes, exécute le code contenu dans la fonction asynchrone _setTimeout_.

On est donc face à un problème... comment faire pour avoir accès aux données récupérées au bout de la temporisation et les afficher?

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

Ici notre fonction callback est définie sous la forme d'une fonction anonyme dans la variable **user**. La lecture de cette variable par javascript va déclencher l'exécution de la fonction _loginUser_ (fonction de haut rang) qui prendra en paramètre, l'adresse email, le mot de passe ainsi que la fonction callback anonyme.

**<u>Que va faire Javascript?</u>**

1- Javascript exécute le console.log

    console.log('Start');

2- Javascript lit de manière passive la fonction _loginUser_ et la mémorise dans le DOM.

    function loginUser(email, password, fonctionCallback){
        setTimeout(() => {
        console.log("now we get the data");
        fonctionCallback ({userEmail: email});
        },2000);
    }

3- Javascript lit la variable user qui déclenche la fonction loginUser. Le call stack prend en charge loginUser et s'aperçoit qu'il y'a une fonction asynchrone setTimeout à l'intérieur qui défini une temporisation que javascript ne va pas gérer, il a besoin de poursuivre la lecture du code et décide donc d'envoyer loginUser vers le navigateur qui va la stocker temporairement avec son API Web pour la durée définie dans la fonction setTimeout (2000ms).

    const user = loginUser("emmanueldevfr@gmail.com", 123456789,(parametresDeLaFonctionCallback) => {
        console.log(parametresDeLaFonctionCallback);
    });

<span style="color:red"> **Ici notre fonction callback a pour but de demander l'affichage en console du contenu situé entre paranthèse, ce qui se trouve en paramètre de la fonction callback.**</span>

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

pour cela nous allons créer une fonction **getUserVideos**:

    function getUserVideos(email, fonctionCallback) {
        setTimeout(() => {
    	fonctionCallback(['video1', 'video2', 'video3']);
        }, 2000);
    }

Puis nous allons associer cette nouvelle fonction à celle permettant d'afficher le profil de l'utilisateur lorsqu'il se log:

    const user1 = loginUser('emmanueldevfr@gmail.com', 123456789, (userInfos) => {
        console.log(userInfos);
        getUserVideos(userInfos.userEmail, (videos) => {
    	    console.log(videos);
        });
    });

**<u>Décomposition de la variable:</u>**

Lorsque Javascript va lire la variable user1, il va exécuter la fonction loginUser en lui passant en paramètres l'adresse email de l'utilisateur, son mot de passe ainsi qu'une fonction callback qui aura pour instruction d'afficher les informations de l'utilisateur (email, password) ainsi que les vidéos associés à son compte email.

Tout cela va se faire de manière asynchrone en passant par des fonctions utilisant la fonction **setTimeout**

Résultat en console:

    Start
    End
    now we get the data
    {userEmail: "emmanueldevfr@gmail.com", pass: 123456789}
    (3) ["video1", "video2", "video3"]

---

Allons encore plus loins et disons que nous souhaitons aussi obtenir des informations sur les vidéos comme par example le titre de la vidéo pour commencer.

pour cela nous allons créer une fonction **getUserVideosTitle**:

    function getUserVideosTitle(videos, fonctionCallback) {
        setTimeout(() => {
    	fonctionCallback([`Titre de la video ${videos}`]);
        }, 2000);
    }

Puis nous allons associer cette nouvelle fonction au profil de l'utilisateur lorsqu'il se log:

    const user1 = loginUser('emmanueldevfr@gmail.com', 123456789, (userInfos) => {
        console.log(userInfos);
        getUserVideos(userInfos.userEmail, (videos) => {
    	    console.log(videos);
            getUserVideosTitle(videos[0], title => {
                console.log(title);
            })
        });
    });

Résultat en console:

    Start
    End
    now we get the data
    {userEmail: "emmanueldevfr@gmail.com", pass: 123456789}
    (3) ["video1", "video2", "video3"]
    ["Titre de la video video1"]

On pourrait continuer ainsi en ajoutant le sujet de la vidéo, la durée, etc...
Notre variable au final ressemblerai à un gros amas complexe de code en forme de pyramide qui enchainerai les fonctions callback à un niveau cauchemardesque (callback hell) et nous savons tous que par nature un développeur n'aime pas la complexité.

C'est pourquoi il existe une solution beaucoup plus pratique qui fait appel à ce que l'on appel des **promesses**.

---

## Les promesses en Javascript

Une promesse en JavaScript est un objet qui représente l’état d’une opération asynchrone.

Une opération asynchrone peut être dans l’un des états suivants :

> Opération en cours (non terminée)

> Opération terminée avec succès (promesse résolue)

> Opération terminée ou plus exactement stoppée après un échec (promesse rejetée)

Grâce à une variable, nous allons définir une fonction dont le rôle est d’effectuer une opération asynchrone et cette fonction va, lors de son exécution, créer et renvoyer un objet Promesse.

    const promesse = new Promise((resolve, reject) => {
        fonctionAsynchrone(() => {
            /* Appel de resolve() si la promesse est résolue (tenue)
            ou
            Appel de reject() si elle est rejetée (rompue) */
        },timer);
    });

Examples concrets:

1- Dans le cas où l'on obtient une réponse positive lors de création de l'objet promesse.

    const promesse = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({user1: "emmanueldev"});
        },2000);
    })

2- Dans le cas où l'on obtient une réponse négative lors de la création de l'objet promesse.

    const promesse = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(`il y'a une erreur`));
        },2000);
    })

**il est de bonne pratique d'introduire une object erreur via une fonction constructeur indépendante de la promesse, que nous pouvons créer dans notre code en amont. **

_PS: En pratique, la majorité des opérations asynchrones qu’on va vouloir réaliser en JavaScript vont déjà être pré-codées et fournies par des API. Ainsi, nous allons rarement créer nos propres promesses mais plutôt utiliser les promesses renvoyées par les fonctions de ces API._

Lorsque nos fonctions asynchrones s’exécutent, elles renvoient une promesse (un objet). Cette promesse va partager les informations liées à l’opération qui vient de s’exécuter et on va pouvoir l’utiliser pour définir quoi faire en fonction du résultat qu’elle contient (en cas de succès de l’opération ou en cas d’échec).

Les promesses permettent ainsi de représenter et de manipuler un résultat, un évènement futur, et nous permettent donc de définir à l’avance quoi faire lorsqu’une opération asynchrone est terminée, que celle-ci ait été terminée avec succès ou qu’on ait rencontré un cas d’échec.

Pour le dire autrement, vous pouvez considérer qu’une valeur classique est définie et disponible dans le présent tandis qu’une valeur « promise » est une valeur qui peut déjà exister ou qui existera dans le futur.

<span style="color:red">Au final, on fait une « promesse » au navigateur ou au programme exécutant notre code : on l’informe qu’on n’a pas encore le résultat de telle opération car celle-ci ne s’est pas déroulée mais que dès que l’opération sera terminée, son résultat sera disponible dans la promesse et qu’il devra alors exécuter tel ou tel code selon le résultat contenu dans cette promesse.</span>

## Consommation d'une promesse, c'est quoi?

Une fois qu'une promesse a été créer elle est utilisée, elle est consommée, en lui passant l'instruction: <span style="color:red">then</span>

cela se présente sous la forme suivante:

    promesse.then();

Ce qui se trouve entre paranthèses est le résultat resolve ou reject en fonction de ce qui a été renvoyé lors de la création de la promesse.

Par example, si l'on demande des informations à une API et que celles ci existent nous aurons alors une promesse resolve contenant ces informations.
Parcontre si les informations n'existent pas ou si un problème quelconque survient empéchant le retour d'informations, nous aurons une promesse reject contenant probablement un message d'erreur.

Donc, une fois la promesse renvoyé, le code contenu dans la promesse (resolve ou reject) va être exécuté sous la forme d'une fonction de rappel (callback function).

    promesse.then( resultat => {
        consol.log(resultat);
    });

et en cas d'erreur **il est de bonne pratique** de récupérer et afficher celle ci en ajoutant l'instruction <span style="color:red">catch</span>.

    promesse
        .then( resultat => {
            consol.log(resultat);
        })
        .catch( erreur => {
            console.log(erreur.message)
        });

nous aurons alors comme résultat en console:

1- Dans le cas d'une promesse resolve.

    {user1: "emmanueldev"}

2- Dans le cas d'une promesse reject.

    Le résultat est:
    il y'a une erreur

<u>**Pour résumer:**</u>

**Consommer une promesse nous donne le résultat de notre requête. On utilise _then_ pour afficher les informations retournées et _catch_ pour afficher les erreurs.**
