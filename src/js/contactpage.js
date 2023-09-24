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

const name = document.querySelector('#name');
const email = document.querySelector('#email');
const emailLabel = email.nextElementSibling;
const msg = document.querySelector('#msg');
const formTextInputs = document.querySelectorAll('[data-textinput]');
const clearBtn = document.querySelector('.clear-btn');
const sendBtn = document.querySelector('.send-btn');
const sendingMsg = document.querySelector('.sending-msg');
const checkbox = document.querySelector('.agreement-box__checkbox');
const allErrors = document.querySelectorAll('.form-box__error-text');
let correctFieldsArray = [];
checkbox.checked = false;

// FUNCTION CHECKS ALL TEXT INPUTS USING DATASETS VALUES - MIN.LENGTH, DEDICATED ERROR TEXT (SEE IN HTML). WHEN ERRORS DISAPPEARS FUNCTION PUSHES [1] TO correctFieldsArray. 3 ITEMS = SUCCESS
// ==============================================
const handleFormInputs = (item) => {
	const innerValue = item.value;
	let errorText = item.nextElementSibling.nextElementSibling;
	if (innerValue.trim() === '' || innerValue.trim().length < item.dataset.minlength) {
		errorText.innerText = item.dataset.errortext;
		errorText.style.opacity = '1';
		return;
	}
	if (item === email) {
		checkEmail(item);
		return;
	}
	errorText.style.opacity = '0';
	correctFieldsArray.push(1);
};

// REGEX FOR EMAIL
// ==============================================
const checkEmail = (item) => {
	let errorText = item.nextElementSibling.nextElementSibling;
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(item.value)) {
		errorText.style.opacity = '0';
		correctFieldsArray.push(1);
	} else {
		errorText.textContent = 'Email nie jest poprawny';
		errorText.style.opacity = '1';
	}
};

const clearStuff = () => {
	formTextInputs.forEach((item) => {
		item.value = '';
		allErrors.forEach((el) => {
			el.style.opacity = '0';
		});
	});
	checkbox.classList.remove('checkbox-error');
	checkbox.checked = false;
};

const checkboxControl = () => {
	if (checkbox.checked === true) {
		checkbox.classList.remove('checkbox-error');
	} else {
		checkbox.classList.add('checkbox-error');
	}
};

// CONTACT-PAGE LISTENERS
// ==============================================
body.onload = clearStuff();
clearBtn.addEventListener('click', (e) => {
	e.preventDefault();
	clearStuff();
});
sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	correctFieldsArray = [];
	sendingMsg.classList.remove('afterSendingMsg');
	formTextInputs.forEach(item => {
		handleFormInputs(item)
	})
	checkboxControl();
	if ((correctFieldsArray.length === 3) & (checkbox.checked === true)) {
		clearStuff();
		sendingMsg.classList.add('afterSendingMsg');
	}
});
// LABEL FLOATING HANDLE FOR INPUT TYPE = 'EMAIL'
// ==============================================
document.addEventListener('click', (e) => {
	if (e.target === email) {
		emailLabel.style.top = '-2px';
	} else if (e.target !== email && email.value === '') {
		emailLabel.style.top = '21px';
	}
});
document.addEventListener('keyup', (e) => {
	if (e.target === email) {
		emailLabel.style.top = '-2px';
	} else if (e.target !== email && email.value === '') {
		emailLabel.style.top = '21px';
	}
});