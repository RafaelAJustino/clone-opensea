// Click menu burguer
const burguerMenu = document.querySelector('.hamburguer');
const navMenu = document.querySelector('.nav-menu-mobile');


const menuIsActive = () => {
	burguerMenu.classList.toggle('active');
	navMenu.classList.toggle('hidden')
	console.log(navMenu)
};
burguerMenu.addEventListener('click', menuIsActive);