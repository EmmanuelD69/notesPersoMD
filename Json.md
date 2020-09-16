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
