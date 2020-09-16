// clé API: https://api.adviceslip.com/advice

const bouton = document.querySelector('button');
const texte = document.querySelector('h1');
bouton.addEventListener('click', () => {
	fetch('https://api.adviceslip.com/advice')
		.then((resultat) => resultat.json())
		.then((data) => (texte.innerText = data.slip.advice));
});
