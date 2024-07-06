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
const secondOfferCardBtn = document.querySelector('[data-offer-nr="2"]')
	.childNodes[9];
const offerCards = document.querySelectorAll('.card');
const offerBox = document.querySelector('.offer__box');

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
offerCards.forEach((card) => {
	card.addEventListener('mouseenter', (e) => {
		if(e.target.dataset.offerNr !== "2"){
		secondOfferCardBtn.classList.remove('offersection-activebtn');}
	});

	card.addEventListener('mouseleave', (e) => {
		if(e.target.dataset.offerNr !== "2"){
		secondOfferCardBtn.classList.add('offersection-activebtn');}
	});
});

// MAIN FUNCTIONS AT START
// =============================================
showYear();
showCookie();

const scrollSpySections = document.querySelectorAll('.scroll-section');
const menuItems = document.querySelectorAll('.nav__list-link');

const handleScrollSpy = () => {
	{
		const sections = [];
		scrollSpySections.forEach((section) => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 103) {
				if (section.id === 'services') {
					if (window.scrollY > 600) {
						document
							.querySelectorAll('.service-box')
							.forEach((box) => box.classList.add('showing-icons'));
					}
					return;
				}
				sections.push(section.id);

				const activeSection = document.querySelector(
					`[href*="${sections[0]}"]`
				);

				menuItems.forEach((item) => item.classList.remove('active'));

				activeSection.classList.add('active');
			}
		});
	}
};

window.addEventListener('scroll', handleScrollSpy);

// TESTIMONIALS HANDLE
// ==============================================
const testSlides = document.querySelectorAll('.opinions__test-item');
const dots = document.querySelectorAll('.dot');
const indicatorsBox = document.querySelector('.opinions__indicators');

let counter = 0;
let deleteInterval;

function removeAnimationsClasses() {
	testSlides.forEach((testimonial) =>
		testimonial.classList.remove(
			'active-test',
			'next1',
			'next2',
			'prev1',
			'prev2'
		)
	);
}

function switchTest(currentDot) {
	removeAnimationsClasses();
	let testId = currentDot.getAttribute('attr');

	testSlides[testId].classList.add('active-test');

	if (testId > counter) {
		testSlides[counter].classList.add('next1');
		counter = testId;
		testSlides[counter].classList.add('next2');
	} else if (testId === counter) {
		return;
	} else {
		testSlides[counter].classList.add('prev1');
		counter = testId;
		testSlides[counter].classList.add('prev2');
	}
	indicators();
}

dots.forEach((dot) => {
	dot.addEventListener('click', (e) => {
		switchTest(e.target);
	});
});

function indicators() {
	for (const dot of dots) {
		dot.classList.remove('active-dot');
	}
	dots[counter].classList.add('active-dot');
}

function slideNext() {
	removeAnimationsClasses();
	testSlides[counter].classList.add('next1');
	if (counter >= testSlides.length - 1) {
		counter = 0;
	} else {
		counter++;
	}
	testSlides[counter].classList.add('next2');
	indicators();
}

function autoSliding() {
	deleteInterval = setInterval(timer, 2000);
	function timer() {
		slideNext();
		indicators();
	}
}
autoSliding();

// Stop auto sliding when mouse is over the indicators
indicatorsBox.addEventListener('mouseover', pause);
function pause() {
	clearInterval(deleteInterval);
}
// Resume sliding when mouse is out of the indicators
indicatorsBox.addEventListener('mouseout', autoSliding);
