// Click menu burguer
const burguerMenu = document.querySelector('.hamburguer');
const navMenu = document.querySelector('.nav-menu-mobile');
const erLogin = document.getElementById('er-login');
const erCadastro = document.getElementById('er-cadastro');
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
	const message = document.getElementById('searchIp').value;
	const data = {message};

	fetch(`http://localhost:3000/user-post/get`, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then((response) =>
			response.json())
		.then(async (data) => {
			console.log(data)
			const result = data;
			secItems.innerText = '';
			result.forEach((item, i) => {
				const p = document.createElement('p');
				p.innerText = `${i + 1}: ${item.message}`;
				secItems.appendChild(p);
			});
		});
}

async function cadastrar() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const data = { email, password }

	if (!email.includes('@')) {
		erCadastro.classList.remove('hidden');
	} else {

		await fetch('http://localhost:3000/user/create', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then((response) => response.json())
			.then((data) => {
				console.log('aaaa', data.token);
				if (!!data.message) {
					alert(data.message);
				} else {
					alert(data.error)
				}
			})
	}
}

async function publicar() {
	const message = document.getElementById('post').value;
	console.log(message);
	const data = { message }

	if (message.length < 10) {
		alert('ERRO!\nPublicação deve conter no mínimo 10 caracteres!');
	} else {

		await fetch('http://localhost:3000/user-post/create', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then((response) => response.json())
			.then((data) => {
				console.log('aaaa', data.message);
				if (!!data.message) {
					alert(data.message);
					document.location.reload(true);
				} else {
					alert(data.error)
				}
			})
	}
}

async function login() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const data = { email, password }

	if (email.length < 3 || password.length < 3) {
		erLogin.classList.remove('hidden');
	} else {

		await fetch('http://localhost:3000/user/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
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
			})
	}
}

window.onload = async () => {
	const hasToken = localStorage.getItem('reqres');

	if (!!hasToken) {

		fetch(`http://localhost:3000/user-post/get-all`)
			.then((response) =>
				response.json())
			.then(async (data) => {
				console.log(data)
				const result = data;
				secItems.innerText = '';
				result.forEach((item, i) => {
					const p = document.createElement('p');
					p.innerText = `${i + 1}: ${item.message}`;
					secItems.appendChild(p);
				});
			});

		srcInput.classList.remove('hidden');
		div1.classList.remove('hidden');
		div2.classList.remove('hidden');
		div3.classList.add('hidden');
	}

	// await login('eve.holt@reqres.in', 'cityslicka');
}