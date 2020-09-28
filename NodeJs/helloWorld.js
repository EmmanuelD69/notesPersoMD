/* Fonctions de notre module helloWorld */
const hello = () => {
  console.log("Hello World JS!");
};

const howAreYou = () => {
  console.log("How are you??");
};

/* Exports des fonctions du module helloWorld */
module.exports.hello = hello;
module.exports.howAreYou = howAreYou;
