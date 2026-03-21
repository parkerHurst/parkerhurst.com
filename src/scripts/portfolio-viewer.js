const root = document.querySelector('[data-portfolio-root]');

if (root instanceof HTMLElement) {
	const navButtons = Array.from(root.querySelectorAll('[data-sport-nav]'));
	const slides = Array.from(root.querySelectorAll('[data-photo]'));
	const counters = Array.from(root.querySelectorAll('[data-counter]'));
	const prevButtons = Array.from(root.querySelectorAll('[data-prev-button]'));
	const nextButtons = Array.from(root.querySelectorAll('[data-next-button]'));
	const menuToggle = root.querySelector('[data-menu-toggle]');
	const mobilePanel = root.querySelector('[data-mobile-panel]');

	const slidesBySport = new Map();

	for (const slide of slides) {
		if (!(slide instanceof HTMLElement)) {
			continue;
		}

		const sport = slide.dataset.sport;

		if (!sport) {
			continue;
		}

		const existing = slidesBySport.get(sport) ?? [];
		existing.push(slide);
		slidesBySport.set(sport, existing);
	}

	let activeSport = root.dataset.initialSport ?? navButtons[0]?.dataset.sport ?? '';
	let activeIndex = 0;

	const formatCounter = (current, total) =>
		`${String(total ? current + 1 : 0).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

	const preloadNearby = () => {
		const visibleSlides = slidesBySport.get(activeSport) ?? [];
		const candidates = [
			visibleSlides[activeIndex],
			visibleSlides[activeIndex - 1],
			visibleSlides[activeIndex + 1],
		];

		for (const candidate of candidates) {
			if (!(candidate instanceof HTMLElement)) {
				continue;
			}

			const image = candidate.querySelector('img');

			if (!(image instanceof HTMLImageElement)) {
				continue;
			}

			image.loading = 'eager';
			image.decoding = 'async';
		}
	};

	const closeMobilePanel = () => {
		if (!(menuToggle instanceof HTMLButtonElement) || !(mobilePanel instanceof HTMLElement)) {
			return;
		}

		menuToggle.setAttribute('aria-expanded', 'false');
		mobilePanel.hidden = true;
		document.body.classList.remove('menu-open');
	};

	const render = () => {
		for (const slide of slides) {
			if (!(slide instanceof HTMLElement)) {
				continue;
			}

			const sport = slide.dataset.sport;
			const index = Number(slide.dataset.index);
			const isActive = sport === activeSport && index === activeIndex;

			slide.hidden = !isActive;
			slide.classList.toggle('is-active', isActive);
			slide.setAttribute('aria-hidden', String(!isActive));
		}

		for (const button of navButtons) {
			if (!(button instanceof HTMLButtonElement)) {
				continue;
			}

			const isActive = button.dataset.sport === activeSport;
			button.classList.toggle('is-active', isActive);
			button.setAttribute('aria-pressed', String(isActive));
		}

		const total = slidesBySport.get(activeSport)?.length ?? 0;
		const counterValue = formatCounter(activeIndex, total);

		for (const counter of counters) {
			if (counter instanceof HTMLElement) {
				counter.textContent = counterValue;
			}
		}

		for (const button of prevButtons) {
			if (button instanceof HTMLButtonElement) {
				button.disabled = activeIndex <= 0;
			}
		}

		for (const button of nextButtons) {
			if (button instanceof HTMLButtonElement) {
				button.disabled = activeIndex >= total - 1;
			}
		}

		preloadNearby();
	};

	const setSport = (sport) => {
		if (!slidesBySport.has(sport)) {
			return;
		}

		activeSport = sport;
		activeIndex = 0;
		render();
		closeMobilePanel();
	};

	const go = (direction) => {
		const total = slidesBySport.get(activeSport)?.length ?? 0;
		const nextIndex = activeIndex + direction;

		if (nextIndex < 0 || nextIndex > total - 1) {
			return;
		}

		activeIndex = nextIndex;
		render();
	};

	for (const button of navButtons) {
		if (!(button instanceof HTMLButtonElement)) {
			continue;
		}

		button.addEventListener('click', () => {
			const sport = button.dataset.sport;

			if (sport) {
				setSport(sport);
			}
		});
	}

	for (const button of prevButtons) {
		if (button instanceof HTMLButtonElement) {
			button.addEventListener('click', () => go(-1));
		}
	}

	for (const button of nextButtons) {
		if (button instanceof HTMLButtonElement) {
			button.addEventListener('click', () => go(1));
		}
	}

	if (menuToggle instanceof HTMLButtonElement) {
		menuToggle.addEventListener('click', () => {
			if (!(mobilePanel instanceof HTMLElement)) {
				return;
			}

			const willOpen = mobilePanel.hidden;
			mobilePanel.hidden = !willOpen;
			menuToggle.setAttribute('aria-expanded', String(willOpen));
			document.body.classList.toggle('menu-open', willOpen);
		});
	}

	window.addEventListener('keydown', (event) => {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
			return;
		}

		const target = event.target;

		if (
			target instanceof HTMLElement &&
			target.closest('a, button, input, select, textarea, [contenteditable="true"]')
		) {
			return;
		}

		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			go(-1);
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			go(1);
		}
	});

	render();
}
