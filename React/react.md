# Titre

## Sous titre

**gras**

_italique_

    quote

<u>souligné</u>

<span style="color:red">texte en couleur</span>

# REACT

## Bonnes pratiques

**<u>const et let:</u>**

Pour plus de simplicité l'utilisation de const et let pour déterminer des variables sera priviligié à var pour éviter tout conflits.

Mis à part les fonctions, "var" a une portée globale ce qui rend le risque d'écrasement accidentel d'une donnée beaucoup plus important qu'avec const et let qui ont des portée limités aux accolades {} qui les contiennent.

De plus l'usage de const permet de "sécuriser" certaines données du fait de son caractère non modifiable. C'est à dire qu'à moins d'utiliser "une méthode" (ex: .push) sur une constante, on ne peux pas modifier sa valeur.

