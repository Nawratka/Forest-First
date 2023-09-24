const scrollSpySections = document.querySelectorAll('.scroll-section');
const menuItems = document.querySelectorAll('.nav__list-link');

const handleScrollSpy = () => {
	{
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

window.addEventListener('scroll', handleScrollSpy);
