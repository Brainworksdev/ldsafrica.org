/* LDSTAR Africa Language Centre — progressive enhancements (site works without JS). */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile navigation */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  function setNav(open) {
    root.classList.toggle('nav-open', open);
    if (toggle) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setNav(!root.classList.contains('nav-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) { setNav(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) { if (mq.matches) setNav(false); });
  }

  /* Header shadow once the page scrolls */
  var header = document.querySelector('[data-header]');
  var waFloat = document.querySelector('.wa-float');
  if (waFloat) root.classList.add('js-float');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
      if (waFloat) waFloat.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Highlight the nav item for the section in view (homepage only) */
  if ('IntersectionObserver' in window) {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="/#"], .nav__link[href="#contact"]'));
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').split('#')[1];
      var el = document.getElementById(id);
      if (el && (location.pathname === '/' || id === 'contact')) map[id] = a;
    });
    var ids = Object.keys(map);
    if (ids.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('is-active'); });
            map[en.target.id].classList.add('is-active');
          } else {
            map[en.target.id].classList.remove('is-active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      ids.forEach(function (id) { spy.observe(document.getElementById(id)); });
    }
  }

  /* Gentle reveal on scroll */
  var items = document.querySelectorAll('[data-reveal]');
  if (!reduceMotion && 'IntersectionObserver' in window && items.length) {
    root.classList.add('js');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el, i) {
      // stagger siblings in grids slightly
      el.style.transitionDelay = (el.parentElement && el.parentElement.children.length > 2 ? (i % 4) * 70 : 0) + 'ms';
      io.observe(el);
    });
  }

  /* Keep the copyright year current */
  var y = document.querySelectorAll('[data-year]');
  for (var i = 0; i < y.length; i++) y[i].textContent = new Date().getFullYear();
})();
