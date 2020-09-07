# Asynchrone Javascript And Xml - AJAX

## Qu'est ce que le Javascript Asynchrone?

**Synchrone** = une action se déroulant _en direct_, quelque chose qui se passe en même temps, une action synchrone.

**Asynchrone** = une action qui se déroule _en différé_, quelque chose qui se passe après une période de temps, un action asynchrone.

### Sync code example:

1- Javascript read the function and memorize it

    function synchrone() {
        console.log('we are in another function');
        onsole.log('do some stuff');
    }

2- Javascript execute the console.log

    console.log('start');

3- Javascript execute the function and show its content in console

    synchrone();

4- Javascript execute the console.log

    console.log('end');

_console log:_

     start
     we are in another function
     do some stuff
     end
