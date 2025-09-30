const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const nav = $('#navbar');
const navMenu = $('#nav-menu');
const navToggle = $('#nav-toggle');
const backToTop = $('#back-to-top');

const setActiveLink = () => {
    const scroll = window.scrollY + 120;
    $$('.nav-link').forEach(link => {
        const target = $(link.getAttribute('href'));
        if (!target) return;
        const top = target.offsetTop;
        const height = target.offsetHeight;
        const isActive = scroll >= top && scroll < top + height;
        link.classList.toggle('active', isActive);
    });
};

const toggleMenu = () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
};

const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
};

const animateHeader = () => {
    if (window.scrollY > 60) {
        nav.classList.add('navbar-scrolled');
    } else {
        nav.classList.remove('navbar-scrolled');
    }
};

const toggleBackToTop = () => {
    backToTop.classList.toggle('show', window.scrollY > 420);
};

const easeOutExpo = t => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const animateValue = (el, target) => {
    const duration = 1600;
    const start = performance.now();
    const from = Number(el.textContent.replace(/[^0-9.]/g, '')) || 0;

    const step = now => {
        const progress = Math.min((now - start) / duration, 1);
        const value = from + (target - from) * easeOutExpo(progress);
        el.textContent = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

const activateCounters = entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const number = entry.target;
        const target = Number(number.dataset.target);
        if (!target || number.dataset.animated) return;
        number.dataset.animated = 'true';
        animateValue(number, target);
    });
};

const observer = new IntersectionObserver(activateCounters, {
    threshold: 0.4
});

$$('.stat-number[data-target]').forEach(node => observer.observe(node));

navToggle?.addEventListener('click', toggleMenu);

$$('.nav-link').forEach(link =>
    link.addEventListener('click', () => {
        closeMenu();
    })
);

backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    setActiveLink();
    animateHeader();
    toggleBackToTop();
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
});

window.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    animateHeader();
    toggleBackToTop();
});
