# Titre

## Sous titre

**gras**

_italique_

    quote

<u>souligné</u>

<span style="color:red">texte en couleur</span>

# REACT

## Bonnes pratiques

### **<u>const et let:</u>**

Pour plus de simplicité l'utilisation de const et let pour déterminer des variables sera priviligié à var pour éviter tout conflits.

Mis à part les fonctions, "var" a une portée globale ce qui rend le risque d'écrasement accidentel d'une donnée beaucoup plus important qu'avec const et let qui ont des portée limités aux accolades {} qui les contiennent.

De plus l'usage de const permet de "sécuriser" certaines données du fait de son caractère non modifiable. C'est à dire qu'à moins d'utiliser "une méthode" (ex: .push) sur une constante, on ne peux pas modifier sa valeur.

### **<u>notion d'héritage</u>**

Faire attention lorsqu'on manipule des tableaux et des objets en Javascript, la notion d'héritage est très importante car on peut modifier/effacer tout ou partie d'une tableau/objet définitivement si l'on ne prend pas garde.

Si l'on souhaite intéragir sur un tableau ou un objet sans modifier l'original il faut penser à ne pas y faire référence directement

    exemple:
    const initialUsers = ["pierre", "paul", "jacques"];
    const currentUsers = initialUsers;

    currentUsers.push("Eric", "Jean");
    console.log(currentUsers);
    console.log(initialUsers);

    Résultat des console.log:
    ["pierre", "paul", "jacques", "Eric", "Jean"]
    ["pierre", "paul", "jacques", "Eric", "Jean"]

Mais y faire référence par étalement des données d'une variable en utilisant [...]

    exemple:
    const initialUsers = ["pierre", "paul", "jacques"];
    const currentUsers = [...initialUsers];

    currentUsers.push("Eric", "Jean");
    console.log(currentUsers);
    console.log(initialUsers);

    Résultat des console.log:
    ["pierre", "paul", "jacques", "Eric", "Jean"]
    ["pierre", "paul", "jacques"]

De sorte à ne pas modifier la valeur du tableau/objet d'origine et ainsi éviter de créer des erreurs/bugs.

### **<u>concaténation</u>**
Encore une fois pour plus de facilité lorsque nous allons vouloir concaténer du texte avec des variables
    
    exemple:
    let name = "paul";

    console.log("hey " + name + ", how are you?");

nous utiliserons la notation <span style="color:red">``</span> cad Alt Gr + 7

    exemple:
    let name = "paul";

    console.log(`hey ${name}, how are you?`);

### **<u>arrow functions</u>**
la version javascript classique(oldschool) pour écrire une fonction est la suivante:

    function sayHello(){
        console.log("hello");
    }

nous priviligierons l'utilisation de la version ES6 Javascript pour l'écriture des fonctions qui consiste en l'utilisation de constantes auxquelles nous attribuerons nos fonctions.

    exemple:
    const sayHello = () => {
        console.log("hello");
    }

Cas particulier: Si notre fonction à pour but de renvoyer(return) une information et qu'elle ne comprend qu'une seule ligne de code...

    example:
    const sayHello = (name) => {
        return `hello ${name}`;
    }

    const greetings = sayHello("paul");
    console.log(greetings);

on peut alors simplifier l'écriture de la fonction en retirant le "return" ainsi que les accolades...

    example:
    const sayHello = (name) => `hello ${name}`;
    
    const greetings = sayHello("paul");
    console.log(greetings);

cela aura exactement le même résultat, car de manière implicite si une seule ligne de code est présente dans une fonction de renvoi de données cela implique par défaut que son résultat soit renvoyé(return), il n'est donc pas nécéssaire d'écrire la version longue de la fonction.

### **<u>Deconstruct</u>**
Le "Désassemblage" de données est un moyen efficace de simplifier son code lorsque l'on cherche à récupérer les informations contenues dans une tableau/objet.

Soit un objet contenant les informations d'un utilisateur:

    exemple version normale:
    const user = {
        name: "Emmanuel",
        lastName: "Dev",
        age: 44,
    };

si l'on souhaite afficher l'une des données contenues dans l'objet en console:

    console.log(user.name);
    console.log(user.lastName);
    console.log(user.age);

Maintenant passons à la version Deconstructed (Désassemblée):

    exemple version deconstruct:
    const user = {
        name: "Emmanuel",
        lastName: "Dev",
        age: 44,
    };

    const {name, lastName, age} = user;

Le principe > on crée une nouvelle constante en lui attribuant entre accolade les "keys" de l'objet/tableau qui nous intéresse avant d'indiquer le nom de la constante qui sera en fait une référence sur l'objet/tableau où aller chercher les infos!

si l'on souhaite afficher l'une des données contenues dans l'objet en console:

    console.log(name);
    console.log(lastName);
    console.log(age);

Prenons maintenant l'exemple d'un tableau:

    const numbers = [1, 2, 3, 4, 5];
    
    const [one, two, three, four, five] = numbers;
    ou
    const [toto, tata, tutu, titi, tete] = numbers;

    console.log(one);
    console.log(toto);

on peut donner n'importe quel nom au keys contenu entre crochets car la constante fait référence au contenu du tableau qui lui ne change pas et est ordonné comme indiqué lors de sa création.     