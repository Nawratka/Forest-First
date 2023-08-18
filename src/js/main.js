const body = document.querySelector('body');
const html = document.querySelector('html');
const burgerBtn = document.querySelector('.burger-btn');
const container = document.querySelector('.containerForSideMenu');
const year = document.getElementById('year');
const menuItems = document.querySelectorAll('.nav__link');
const scrollSpySections = document.querySelectorAll('.scrollSection');
// const media = window.matchMedia('(min-width: 463px)');
const cookieBox = document.querySelector('.cookie-box')
const cookieBtn = document.querySelector('.cookie-btn')

// COOKIES HANDLE
// ==============================================
const showCookie = () => {
	const cookieAcceptation = localStorage.getItem('cookie')
	if (cookieAcceptation) {
		cookieBox.classList.add('cookiehide')
	}
}
const handleCookieBox = () => {
	localStorage.setItem('cookie', 'true')
	cookieBox.classList.add('cookiehide')
}

// SHOW AND HIDE SIDE MENU FOR MOBILE DEVICES & DISABLE SCROLLING
// ==============================================
const classCheck = () => {
	
		if (container.classList.contains('show')) {
			body.classList.remove('bodyHidden')
			body.classList.add('bodyShow')
			container.classList.remove('show');
			container.classList.add('close');
		} else {
			body.classList.remove('bodyShow')
			body.classList.add('bodyHidden')
			container.classList.remove('close');
			container.classList.add('show');
		}
	
};

// CHECKS IF MEDIA MATHCES AND DELETES FALSE VISIBILITY OF NAVBAR-UL LIST BY PAGE RESIZING
//==============================================
// function testMedia(media) {
// 	if (media.matches) {
// 		container.classList.add('show2');
// 		container.classList.remove('close');
// 	} else {
// 		container.classList.remove('show');
// 		container.classList.remove('show2');
// 	}
// }

//REFRESH YEAR IN FOOTER
// ==============================================
const showYear = () => {
	const today = new Date();
	year.textContent = today.getFullYear();
};

// SCROLLSPY
// ==============================================
const handleScrollSpy = () => {
	if (document.body.classList.contains('main-page')) {
		const sections = [];
		scrollSpySections.forEach((section) => {
			if (window.scrollY <= section.offsetTop + section.offsetHeight - 103) {
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

// IF CONTACT PAGE -> FORM VALIDATION
// ==============================================
const whatsPage = () => {
	if (body.id === 'contact-page') {
		const name = document.querySelector('#name');
		const email = document.querySelector('#email');
		const msg = document.querySelector('#msg');
		const clearBtn = document.querySelector('.clear');
		const sendBtn = document.querySelector('.send');
		let errorText = document.getElementsByClassName('error-text');
		const sendingMsg = document.querySelector('.sendingMsg');
		const checkbox = document.querySelector('.agreement-checkbox');
		let correctFieldsArray = [];
		checkbox.checked = false;

		// FUNCTION CHECKS ALL INPUTS LENGTH AND MATCHES ID WITH SERIAL NR TO CONNECT WITH RIGHT errorText UNDER INPUT. FOR EACH INPUT ARE DEDICATED ERROR MESSAGES. WHEN ERROR DISAPPEARS FUNCTION PUSHES [1] TO correctFieldsArray. 3 ELEMENTS = SUCCESS
		// ==============================================
		const engine = (id, serial, valueMinLength, msgerror) => {
			const innerValue = id.value;
			if (innerValue.trim() === '' || innerValue.trim().length < valueMinLength) {
				errorText[serial].textContent = msgerror;
				errorText[serial].style.opacity = '1';
			} else {
				if (id === email) {
					checkEmail(id, serial);
				} else {
					errorText[serial].style.opacity = '0';
					correctFieldsArray.push(1);
				}
			}
		};

		// REGEX FOR EMAIL
		// ==============================================
		const checkEmail = (id, serial) => {
			const re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(id.value)) {
				errorText[serial].style.opacity = '0';
				correctFieldsArray.push(1);
			} else {
				errorText[serial].textContent = 'Email nie jest poprawny';
				errorText[serial].style.opacity = '1';
			}
		};

		const clearStuff = () => {
			[name, email, msg].forEach((item) => {
				item.value = '';
				const allErrors = document.querySelectorAll('.error-text');
				allErrors.forEach((el) => {
					el.style.opacity = '0';
				});
			});
			checkbox.classList.remove('checkboxError');
			checkbox.checked = false;
		};

		const checkboxControl = () => {
			if (checkbox.checked === true) {
				checkbox.classList.remove('checkboxError');
			} else {
				checkbox.classList.add('checkboxError');
			}
		};

		// CONTACT-PAGE LISTENERS
		// ==============================================

		checkbox.addEventListener('change', () => {
			checkboxControl();
		});
		clearBtn.addEventListener('click', (e) => {
			e.preventDefault();
			clearStuff();
		});
		sendBtn.addEventListener('click', (e) => {
			e.preventDefault();
			correctFieldsArray = [];
			sendingMsg.classList.remove('afterSendingMsg');
			engine(name, 0, 3, 'Wprowadź swoje imię, min. 3 znaki');
			engine(email, 1, 7, 'Wprowadź adres mailowy');
			engine(msg, 2, 30, 'Wprowadź treść wiadomości, min. 30 znaków');
			checkboxControl();
			if ((correctFieldsArray.length === 3) & (checkbox.checked === true)) {
				clearStuff();
				sendingMsg.classList.add('afterSendingMsg');
			}
		});
	}
};

// MAIN LISTENERS
// ==============================================
burgerBtn.addEventListener('click', classCheck);
window.addEventListener('click', (e) =>
	e.target === container ? classCheck() : false
);
// media.addEventListener('change', testMedia);
window.addEventListener('scroll', handleScrollSpy);
cookieBtn.addEventListener('click', handleCookieBox);

// MAIN FUNCTIONS AT START
// =============================================
// testMedia(media);
whatsPage();
showYear();
showCookie();
