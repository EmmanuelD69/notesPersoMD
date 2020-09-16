# JSON - <span style="color:red">J</span>ava<span style="color:red">S</span>crit <span style="color:red">O</span>bjet <span style="color:red">N</span>otation

## Qu'est ce que c'est?

C'est un format d'écriture standard pour échanger des données entre le navigateur et un serveur. Il est très polyvalent et peut s'utiliser sur des serveurs aux langages multiples: Javascript / Python / C# / etc...

La syntaxe de Json n'est pas très compliqué et se base sur des d'objets contenant des informations.

Javascript va simplement récupérer l'objet Json et le convertir en objet Javascript pour rendre les données accessible au script en cours d'utilisation.

**Example Json:**

    {
        "student": [

            {
            "id":"01",
            "name": "Tom",
            "lastname": "Price"
            },

            {
            "id":"02",
            "name": "Nick",
            "lastname": "Thameson"
            }
        ]
    }

Cela ressemble à un objet Javascript à la différence que <span style="color:red">les clés sont entourées de guillemets "key".</span>

## Fonctionnement de Json avec une API:

Nous allons créer un script très simple qui va nous servir d'interface graphique avec une API. Grâce à un simple bouton html et à une clé API,

clé API: https://api.adviceslip.com/advice

si on s'amuse à copier/coller l'adresse dans la barre d'adresses de notre navigateur nous allons obtenir ce résultat:

    {
        "slip": {
            "id": 52,
            "advice": "Don't promise what you can't deliver."
        }
    }

Nous allons récupérer des objets Json pour les convertir en objets Javascript et ainsi interpréter leurs contenus et les afficher à l'écran.

pour récupérer l'objet Json on utilise l'instruction <span style="color:red">**fetch**</span>

    fetch("https://api.adviceslip.com/advice");

Cela nous retourne une promesse qu'il nous faut alors consommer:

    fetch("https://api.adviceslip.com/advice")
    .then(resultat => console.log(resultat));

on peut voir en console que Javascript à bien récupérer des information de la part du site web:

    Response {
        type: "cors",
        url: "https://api.adviceslip.com/advice",
        redirected: false,
        status: 200,
        ok: true, 
        …}

status 200 indique que la réponse à notre requête fetch a été un succès.
Cependant c'est une promesse au format Json qui nous a été renvoyé et pour pouvoir utiliser son contenue il nous faut la convertir en promesse Javascript. Pour cela il existe l'instruction <span style="color:red">**. json**</span>

    fetch("https://api.adviceslip.com/advice")
    .then(resultat => resultat.json());

à partir de là, nous avons maintenant une promesse javascript que nous pouvons consommer.

    fetch("https://api.adviceslip.com/advice")
    .then(resultat => resultat.json())
    .then(data => console.log(data));

il ne nous reste plus qu'à remplacer le texte situé dans la balise html h1 par le résultat contenu dans la promesse obtenu à chaque clic sur le bouton html.
