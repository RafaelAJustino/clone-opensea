// Click menu burguer
const burguerMenu = document.querySelector('.hamburguer');
const navMenu = document.querySelector('.nav-menu-mobile');
const erLogin = document.getElementById('er-login');
const srcInput = document.getElementById('src-input');
const div1 = document.querySelector('.div-1');
const div2 = document.querySelector('.div-2');
const div3 = document.querySelector('.login');
const secItems = document.getElementById('character');

const pages = 42;
const src = document.getElementById('searchIp');



const menuIsActive = () => {
	burguerMenu.classList.toggle('active');
	navMenu.classList.toggle('hidden')
	console.log(navMenu)
};
burguerMenu.addEventListener('click', menuIsActive);

async function search() {
	const src = document.getElementById('searchIp').value;
	console.log(src);
	fetch(`https://rickandmortyapi.com/api/character/?name=${src}`)
		.then((response) =>
			response.json())
		.then(async (data) => {
			const result = data.results;
			secItems.innerText = '';
			result.forEach((product) => {
				const img = document.createElement('img');
				img.src = product.image;
				secItems.appendChild(img);
			});
		});
}

async function login() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;

	if (email.length < 3 || password.length < 3) {
		erLogin.classList.remove('hidden');
	} else {
		const data = `email=${email}&password=${password}`
		await fetch("https://reqres.in/api/login", {
			method: 'post',
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: data
		}).then((response) => response.json())
			.then((data) => {
				console.log('aaaa', data.token);
				if (!!data.token) {
					localStorage.setItem('reqres', data.token);
					erLogin.className = 'hidden';
					srcInput.classList.remove('hidden');
					div1.classList.remove('hidden');
					div2.classList.remove('hidden');
					div3.classList.add('hidden');
				} else {
					erLogin.classList.remove('hidden');
				}
			});

			for (let i = 1; i < pages; i++) {
				fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
					.then((response) =>
						response.json())
					.then(async (data) => {
						const result = data.results;
						result.forEach((product) => {
							const opt = document.createElement('option');
							opt.value = product.name;
							opt.innerText = product.name;
							src.appendChild(opt);
						});
					});
			}
	}
}

window.onload = async () => {
	const hasToken = localStorage.getItem('reqres');

	if (!!hasToken) {
		for (let i = 1; i < pages; i++) {
			fetch(`https://rickandmortyapi.com/api/character/?page=${i}`)
				.then((response) =>
					response.json())
				.then(async (data) => {
					const result = data.results;
					result.forEach((product) => {
						const opt = document.createElement('option');
						opt.value = product.name;
						opt.innerText = product.name;
						src.appendChild(opt);
					});
				});
		}

		srcInput.classList.remove('hidden');
		div1.classList.remove('hidden');
		div2.classList.remove('hidden');
		div3.classList.add('hidden');
	}

	// await login('eve.holt@reqres.in', 'cityslicka');
}