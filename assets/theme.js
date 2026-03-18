/* ============================================
   DHMEX PRO - Theme JavaScript
   Copa Scott DHMEXRACES — Premium Downhill Theme
   Refs: Johny Salido (GSAP), Rebellion (hover), Pebble Life (video)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initRevealAnimations();
  initCountdown();
  initCountUp();
  initMobileMenu();
  initHorizontalScroll();
  initQuantitySelectors();
});

/* --- Smooth Anchor Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Reveal on Scroll --- */
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --- Countdown Timer --- */
function initCountdown() {
  const el = document.querySelector('[data-countdown]');
  if (!el) return;

  const targetDate = new Date(el.dataset.countdown).getTime();

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      el.innerHTML = '<span class="heading-md" style="color: var(--accent);">LA CARRERA HA COMENZADO</span>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    el.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
    el.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
    el.querySelector('[data-mins]').textContent = String(mins).padStart(2, '0');
    el.querySelector('[data-secs]').textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --- CountUp Stats --- */
function initCountUp() {
  const counters = document.querySelectorAll('[data-countup]');
  if (!counters.length || typeof countUp === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.countup);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';

        const counter = new countUp.CountUp(el, target, {
          duration: 2.5,
          separator: ',',
          prefix: prefix,
          suffix: suffix,
        });

        if (!counter.error) counter.start();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    toggle.classList.toggle('active');
    menu.classList.toggle('is-open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Horizontal Scroll (GSAP ScrollTrigger) --- */
function initHorizontalScroll() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const section = document.querySelector('.horizontal-stats');
  const track = document.querySelector('.horizontal-stats__track');
  if (!section || !track) return;

  const scrollWidth = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -scrollWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: 1,
      end: () => '+=' + scrollWidth,
    }
  });
}

/* --- Quantity Selectors --- */
function initQuantitySelectors() {
  document.querySelectorAll('.quantity-selector').forEach(selector => {
    const input = selector.querySelector('input');
    const minus = selector.querySelector('[data-minus]');
    const plus = selector.querySelector('[data-plus]');

    if (!input || !minus || !plus) return;

    minus.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      if (val > 1) input.value = val - 1;
    });

    plus.addEventListener('click', () => {
      const val = parseInt(input.value) || 1;
      input.value = val + 1;
    });
  });
}
