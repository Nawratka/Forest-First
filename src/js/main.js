const body = document.querySelector('body');
const html = document.querySelector('html');
const nav = document.querySelector('.main-wrapper');
const burgerBtn = document.querySelector('.nav__btn');
const sideMenu = document.querySelector('.side-menu');
const sideMenuNavList = sideMenu.querySelector('.nav__list');
const sideMenuListLink = sideMenuNavList.querySelectorAll('a.nav__list-link');
const logo = document.querySelector('.logo__link');
const year = document.getElementById('year');
const cookieBox = document.querySelector('.cookie');
const cookieBtn = document.querySelector('.cookie__btn');

let menuOpen = false;
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

// OFFER SUBPAGE, ADD ANIMATION TO CHOSEN OFFER FROM HOMEPAGE
const setChosenOffer = () => {
	if (body.dataset.subpage !== 'offer') return;

	const offer = localStorage.getItem('offer');
	if (offer) {
		const chosenOffer = document.querySelector(`[data-offer-nr="${offer}"]`);
		chosenOffer.children[2].classList.add('offer-vertically-anim');
		chosenOffer.children[3].classList.add('offer-vertically-anim');
		chosenOffer.children[0].classList.add('offer-horizontally-anim');
		chosenOffer.children[1].classList.add('offer-horizontally-anim');

		const gap = chosenOffer.getBoundingClientRect(top);
		// elem hight - nav height - margin
		window.scrollTo(0, gap.y - 67 - 50);
	}
};

const modalHandle = () => {
	if (body.dataset.subpage !== 'guides') return;

	const modal = document.querySelector('.dialog');
	modal.showModal();

	const modalBtn = document.querySelector('.dialog-container__btn');
	modalBtn.addEventListener('click', () => {
		modal.close();
	});
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

const addTextAnimation = () => {
	if (body.dataset.subpage !== 'guides') return;

	window.addEventListener('scroll', () => {
		if (window.innerWidth < 463) {
			const guidesSection = document.querySelector('.guides__people');
			if (window.scrollY >= guidesSection.offsetTop - 200) {
				const guidesCards = document.querySelectorAll('.guides__card');
				guidesCards.forEach((card) => {
					card.classList.add('moveCard');
				});
			}
		}
	});
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
window.addEventListener('resize', () => {
	if (window.innerWidth < mobileViewWidth) {
		closingSideMenu();
	}
});
window.addEventListener('pageshow', setChosenOffer);
cookieBtn.addEventListener('click', handleCookieBox);
sideMenuListLink.forEach((link) =>
	link.addEventListener('click', closingSideMenu)
);

// MAIN FUNCTIONS AT START
// =============================================
showYear();
showCookie();
addTextAnimation();
modalHandle();
