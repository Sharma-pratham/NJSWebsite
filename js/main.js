/* ==========================================================================
   Not Just Smoo'V — interactions
   1. Nav background/blur state after 40px of scroll
   2. One-time scroll reveals (IntersectionObserver)
   3. Pointer-driven tilt on the circular hero photo (desktop only)
   ========================================================================== */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Nav scroll state ---------- */

  var nav = document.getElementById('nav');

  if (nav) {
    var scrolled = false;

    var onScroll = function () {
      var isScrolled = (window.scrollY || window.pageYOffset || 0) > 40;
      if (isScrolled === scrolled) return;
      scrolled = isScrolled;
      nav.classList.toggle('is-scrolled', scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Publish the bar's real height so anchored sections can offset by it.
    // It wraps to two rows on narrow screens, so this can't be a constant --
    // css falls back to 96px (the desktop height) when JS is unavailable.
    var setNavHeight = function () {
      document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    };
    setNavHeight();

    if ('ResizeObserver' in window) {
      new ResizeObserver(setNavHeight).observe(nav);
    } else {
      window.addEventListener('resize', setNavHeight);
    }
  }

  /* ---------- 2. Scroll reveals ---------- */

  var revealEls = document.querySelectorAll('[data-reveal]');

  if (!revealEls.length) {
    // nothing to do
  } else if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    // No observer support (or motion turned down): show everything immediately.
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 3. Hero photo tilt ---------- */

  // Opt-in via data-tilt. The effect was designed for a photo; it 3D-rotates
  // whatever sits in the frame, and the brand guidelines forbid rotating the
  // logo lockup. Add data-tilt back to the frame to re-enable it.
  var heroPhoto = document.querySelector('#heroPhoto[data-tilt]');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (heroPhoto && finePointer && !prefersReducedMotion) {
    heroPhoto.addEventListener('mousemove', function (ev) {
      var rect = heroPhoto.getBoundingClientRect();
      var px = (ev.clientX - rect.left) / rect.width - 0.5;
      var py = (ev.clientY - rect.top) / rect.height - 0.5;
      heroPhoto.style.transform = 'rotateY(' + (px * 16) + 'deg) rotateX(' + (py * -16) + 'deg)';
    });

    heroPhoto.addEventListener('mouseleave', function () {
      heroPhoto.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
})();
