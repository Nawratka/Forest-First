const body = document.querySelector('body');
const html = document.querySelector('html');
const nav = document.querySelector('.main-wrapper');
const burgerBtn = document.querySelector('.nav__btn');
let menuOpen = false;
const sideMenu = document.querySelector('.side-menu');
const sideMenuNavList = sideMenu.querySelector('.nav__list');
const sideMenuListLink = sideMenuNavList.querySelectorAll('a.nav__list-link');
const logo = document.querySelector('.logo__link');
const year = document.getElementById('year');

const cookieBox = document.querySelector('.cookie');
const cookieBtn = document.querySelector('.cookie__btn');
const mobileViewWidth = 560;

// COOKIES HANDLE
// ==============================================
const showCookie = () => {
	const cookieAcceptation = localStorage.getItem('cookie');
	if (cookieAcceptation) {
		cookieBox.classList.add('cookiehide');
	}
};
const handleCookieBox = () => {
	localStorage.setItem('cookie', 'true');
	cookieBox.classList.add('cookiehide');
};

//REFRESH YEAR IN FOOTER
// ==============================================
const showYear = () => {
	const today = new Date();
	year.textContent = today.getFullYear();
};

const closingSideMenu = () => {
	sideMenu.classList.remove('show');
	body.classList.remove('bodyHidden');
	menuOpen = false;
	burgerBtn.classList.remove('open');
};

const deleteShowClass = () => {
	if (window.innerWidth <= mobileViewWidth) {
		console.log('mniejsze niz 560');
		closingSideMenu();
	}
};

// MAIN LISTENERS
// ==============================================
burgerBtn.addEventListener('click', () => {
	body.classList.toggle('bodyHidden');
	sideMenu.classList.toggle('show');
	menuOpen = !menuOpen;
	burgerBtn.classList.toggle('open', menuOpen);
});
window.addEventListener('click', (e) => {
	if (
		e.target === sideMenu ||
		e.target === sideMenuNavList ||
		e.target === nav ||
		e.target === logo
	) {
		closingSideMenu();
	}
});
cookieBtn.addEventListener('click', handleCookieBox);
sideMenuListLink.forEach((link) =>
	link.addEventListener('click', closingSideMenu)
);
window.addEventListener('resize', () => {
	if (window.innerWidth < mobileViewWidth) {
		closingSideMenu();
	}
});

// MAIN FUNCTIONS AT START
// =============================================
showYear();
showCookie();
