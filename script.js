// ============================================================
//  WARSI TOUR & TRAVELS — script.js
// ============================================================

/* ---- Loading Overlay (first-visit only via sessionStorage) ---- */
(function () {
  var overlay = document.getElementById('loadingOverlay');
  if (!overlay) return;
  if (sessionStorage.getItem('wtt_visited')) {
    // Not a first visit — hide immediately
    overlay.style.display = 'none';
  } else {
    sessionStorage.setItem('wtt_visited', '1');
    window.addEventListener('load', function () {
      setTimeout(function () {
        overlay.classList.add('hidden');
      }, 2500);
    });
  }
})();

/* ---- Sticky nav ---- */
var nb = document.getElementById('nav');
window.addEventListener('scroll', function () {
  nb.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ---- Hamburger menu ---- */
(function () {
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', function () {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // Close when any nav link is clicked
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
})();

/* ---- Scroll reveal with stagger ---- */
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (!e.isIntersecting) return;
    var cards = e.target.querySelectorAll('.pkg-card,.dest-card,.svc-card,.testi-card');
    if (cards.length) {
      cards.forEach(function (c, i) {
        setTimeout(function () { c.classList.add('show'); }, i * 95);
      });
    }
    io.unobserve(e.target);
  });
}, { threshold: 0.07 });

document.querySelectorAll('.pkg-grid,.dest-grid,.svc-grid,.testi-grid').forEach(function (el) {
  io.observe(el);
});

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var el = document.getElementById(a.getAttribute('href').slice(1));
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-q').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var item   = btn.closest('.faq-item');
    var ans    = item.querySelector('.faq-a');
    var isOpen = item.classList.contains('active');
    // close all
    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('active');
      i.querySelector('.faq-a').classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('active');
      ans.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
